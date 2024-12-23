import pool from '@/lib/db'
import { NextResponse } from 'next/server'
import { verifyAccessToken } from '@/lib/jwt'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET || 'SATOSHI_NAKAMOTO'

export async function POST(request: Request) {
	const cookieStore = await cookies()
	const token = cookieStore.get('authtoken')?.value

	try {
		if (!token) {
			return NextResponse.json({ error: 'Authentication token is missing.' }, { status: 401 })
		}

		const decodedToken = verifyAccessToken(token, JWT_SECRET)
		const authorId = decodedToken?.id

		if (!authorId) {
			return NextResponse.json({ error: 'Invalid or expired authentication token.' }, { status: 401 })
		}

		const { title, content, published } = await request.json()

		if (!title) return NextResponse.json({ error: 'Title is required.' }, { status: 400 })
		if (!content) return NextResponse.json({ error: 'Content is required.' }, { status: 400 })
		if (published === null || published === undefined) {
			return NextResponse.json({ error: 'Published status is required.' }, { status: 400 })
		}

		const query = `
		INSERT INTO posts (title, content, published, "authorId")
		VALUES ($1, $2, $3, $4)
		RETURNING *;
		`

		const values = [title, content, published, authorId]

		const result = await pool.query(query, values)
		const createdPost = result.rows[0]

		return NextResponse.json({ post: createdPost }, { status: 201 })
	} catch (error: unknown) {
		console.error(error)

		if (error instanceof Error) {
			return NextResponse.json({ error: error.message }, { status: 500 })
		}

		return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
	}
}
