import pool from '@/lib/db'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyAccessToken } from '@/lib/jwt'

const secret = process.env.JWT_SECRET || 'default_secret'

export async function GET(
) {
	const cookieStore = await cookies()
	const authToken = cookieStore.get('authtoken')?.value

	let myId
	if (authToken) {
		try {
			const decoded = verifyAccessToken(authToken, secret)
			myId = decoded.id
		} catch (error) {
			console.error('Error verifying auth token:', error)
		}
	}

	const query = `
    SELECT id, name, username, email, avatar, "createdAt", "updatedAt"
    FROM users
    WHERE id = $1
  	`

	try {
		const client = await pool.connect()
		const result = await client.query(query, [myId])

		if (result.rowCount === 0) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 })
		}

		const user = result.rows[0]
		return NextResponse.json({ ...user }, { status: 200 })
	} catch (error) {
		console.error('Error fetching user profile:', error)
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
	}
}

export async function PUT(request: Request) {
	const cookieStore = await cookies()
	const authToken = cookieStore.get('authtoken')

	if (!authToken) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	let userId: string

	try {
		const decoded = verifyAccessToken(authToken.value, secret)
		userId = decoded.id
	} catch (error) {
		return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 })
	}

	const body = await request.json()
	const { name, username, email, avatar } = body

	if (!name || !username || !email) {
		return NextResponse.json(
			{ error: 'Name, username, and email are required' },
			{ status: 400 }
		)
	}

	const query = `
    UPDATE users
    SET name = $1, username = $2, email = $3, avatar = $4, "updatedAt" = NOW()
    WHERE id = $5
    RETURNING id, name, username, email, avatar, "updatedAt"
  `

	const client = await pool.connect()

	try {
		const result = await client.query(query, [
			name,
			username,
			email,
			avatar,
			userId,
		])

		if (result.rowCount === 0) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 })
		}

		return NextResponse.json(result.rows[0], { status: 200 })
	} catch (error) {
		console.error('Error updating user settings:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	} finally {
		client.release()
	}
}
