import pool from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
	const query = `
    SELECT 
      categories.id,
      categories.name,
      COUNT(posts.id) AS posts_count,
      COALESCE(SUM(posts."viewCount"), 0) AS view_count
    FROM categories
    LEFT JOIN posts ON posts.category_id = categories.id
    GROUP BY categories.id, categories.name
    ORDER BY view_count DESC, posts_count desc
  	`

	try {
		const client = await pool.connect()
		const result = await client.query(query)

		const categories = result.rows
		return NextResponse.json(categories, { status: 200 })
	} catch (error) {
		console.error('Error fetching categories:', error)
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
	}
}
