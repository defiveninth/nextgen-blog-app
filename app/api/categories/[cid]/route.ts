import pool from '@/lib/db'
import { NextResponse } from 'next/server'

type Params = Promise<{ cid: string }>

export async function GET(
	request: Request,
	segmentData: { params: Params }
) {
	const params = await segmentData.params
	const categoryId = params.cid

	if (!categoryId) {
		return NextResponse.json({ error: 'Category ID is required' }, { status: 400 })
	}

	const sqlQuery = `
    SELECT 
        p.id,
        p.title,
        LEFT(p.content, 200) AS content,
        p.published,
        p."viewCount",
        p."createdAt",
        p."updatedAt",
        jsonb_build_object('id', u.id, 'name', u.name, 'username', u.username) AS author,
        jsonb_agg(DISTINCT jsonb_build_object('name', t.name)) AS tags,
        jsonb_build_object('id', c.id, 'name', c.name) AS category
    FROM 
        posts p
    LEFT JOIN users u ON p."authorId" = u.id
    LEFT JOIN post_tags pt ON p.id = pt.post_id
    LEFT JOIN tags t ON pt.tag_id = t.id
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE 
        c.id = $1
        AND p.published = true
    GROUP BY 
        p.id, u.id, c.id, c.name
    ORDER BY 
        p."viewCount" DESC;
  `

	try {
		const { rows } = await pool.query(sqlQuery, [categoryId])

		return NextResponse.json(rows, { status: 200 })
	} catch (error) {
		console.error('Error executing query:', error)

		return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
	}
}
