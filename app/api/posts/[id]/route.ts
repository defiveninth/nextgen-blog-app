import { NextResponse } from 'next/server'
import pool from '@/lib/db'

type Params = Promise<{ id: string }>

export async function GET(
	segmentData: { params: Params }
) {
	const params = await segmentData.params
	const id = params.id


	if (!id) {
		return NextResponse.json({ error: 'Post ID is required' }, { status: 400 })
	}

	const query = `
    SELECT
        posts.id,
        posts.title,
        posts.content,
        posts.published,
        posts."createdAt",
        posts."updatedAt",
        posts."viewCount",
        json_build_object('id', users.id, 'name', users.name, 'username', users.username) AS author,
        COALESCE(json_agg(DISTINCT jsonb_build_object('name', tags.name)) FILTER (WHERE tags.name IS NOT NULL), '[]') AS tags,
        json_build_object('id', categories.id, 'name', categories.name) AS category
    FROM posts
    LEFT JOIN users ON posts."authorId" = users.id
    LEFT JOIN post_tags ON posts.id = post_tags.post_id
    LEFT JOIN tags ON post_tags.tag_id = tags.id
    LEFT JOIN categories ON posts."category_id" = categories.id
    WHERE posts.id = $1
    GROUP BY posts.id, users.id, categories.id;
  `

	const client = await pool.connect()
	try {
		const result = await client.query(query, [id])

		if (result.rowCount === 0) {
			return NextResponse.json({ error: 'Post not found' }, { status: 404 })
		}

		return NextResponse.json(result.rows[0])
	} catch (error) {
		console.error('Error fetching post:', error)
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
	} finally {
		client.release()
	}
}

