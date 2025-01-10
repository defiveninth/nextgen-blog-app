import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET() {
	try {
		const client = await pool.connect()

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
			WHERE p."createdAt" >= date_trunc('month', CURRENT_DATE - INTERVAL '1 month')
			AND p."createdAt" < date_trunc('month', CURRENT_DATE)
			GROUP BY p.id, u.id, c.id
			ORDER BY p."viewCount" DESC
			LIMIT 5;
		`

		const result = await client.query(query)
		client.release()

		return NextResponse.json({
			success: true,
			posts: result.rows,
		})
	} catch (error) {
		console.error('Error fetching popular posts:', error)
		return NextResponse.json(
			{ success: false, error: 'Failed to fetch posts.' },
			{ status: 500 }
		)
	}
}
