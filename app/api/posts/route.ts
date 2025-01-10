import pool from '@/lib/db'
import { verifyAccessToken } from '@/lib/jwt'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const secret = process.env.JWT_SECRET || 'DEFAULT_SECRET'

export async function GET() {
	try {
		const query = `
      	SELECT 
		p.id, 
		p.title, 
		p.content, 
		p.published, 
		p."createdAt", 
		p."updatedAt", 
		p."viewCount",
		jsonb_build_object('id', u.id, 'name', u.name, 'username', u.username) AS author,
		jsonb_agg(DISTINCT jsonb_build_object('name', t.name)) AS tags,
		jsonb_build_object('id', c.id, 'name', c.name) AS category
		FROM posts p
		LEFT JOIN users u ON p."authorId" = u.id
		LEFT JOIN post_tags pt ON p.id = pt.post_id
		LEFT JOIN tags t ON pt.tag_id = t.id
		LEFT JOIN categories c ON p.category_id = c.id
		GROUP BY p.id, u.id, c.id
		ORDER BY p."createdAt" DESC;
    `

		const client = await pool.connect()
		try {
			const result = await client.query(query)
			const posts = result.rows
			return NextResponse.json(posts, { status: 200 })
		} finally {
			client.release()
		}
	} catch (error) {
		console.error('Error fetching posts:', error)
		return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
	}
}

export async function DELETE(req: NextRequest) {
	const cookieStore = await cookies()
	const authToken = cookieStore.get('authtoken')?.value

	let userId
	if (authToken) {
		try {
			const decoded = verifyAccessToken(authToken, secret)
			userId = decoded.id
		} catch (error) {
			console.error('Error verifying auth token:', error)
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}
	} else {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	const { id } = await req.json()

	if (!id) return NextResponse.json({ error: 'Post ID is required' }, { status: 400 })

	try {
		const result = await pool.query(
			'DELETE FROM posts WHERE id = $1 AND "authorId" = $2 RETURNING id',
			[id, userId]
		)

		if (result.rowCount === 0) {
			return NextResponse.json({ error: 'Post not found or not authorized to delete' }, { status: 404 })
		}

		return NextResponse.json({ message: 'Post deleted successfully' }, { status: 200 })
	} catch (error) {
		console.error('Error deleting post:', error)
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
	}
}
