import pool from '@/lib/db'
import { NextResponse } from 'next/server'

type Params = Promise<{ id: string }>

export async function GET(
	request: Request,
	segmentData: { params: Params }
) {
	const params = await segmentData.params
	const userId = params.id

	if (!userId) {
		return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
	}

	const query = `
    SELECT 
		posts.id,
		posts.title,
		LEFT(posts.content, 200) AS content_preview,
		posts."createdAt",
		posts."updatedAt",
		posts."viewCount",
		ARRAY_AGG(tags.name) AS tags
    FROM posts
    LEFT JOIN post_tags ON posts.id = post_tags.post_id
    LEFT JOIN tags ON post_tags.tag_id = tags.id
    WHERE posts."authorId" = $1
    GROUP BY posts.id
    ORDER BY posts."createdAt" DESC
  	`

	try {
		const client = await pool.connect()
		const result = await client.query(query, [userId])

		if (result.rowCount === 0) {
			return NextResponse.json({ error: 'No posts found for this user' }, { status: 404 })
		}

		return NextResponse.json(result.rows, { status: 200 })
	} catch (error) {
		console.error('Error fetching user posts:', error)
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
	}
}
