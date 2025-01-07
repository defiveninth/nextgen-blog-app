import pool from '@/lib/db'
import { NextResponse } from 'next/server'

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
