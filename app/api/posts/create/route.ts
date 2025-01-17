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
			return NextResponse.json({ error: 'We are unable to allow post creation until your identity is verified. Kindly sign in or sign up to proceed.' }, { status: 401 })
		}

		const decodedToken = verifyAccessToken(token, JWT_SECRET)
		const authorId = decodedToken?.id

		if (!authorId) {
			return NextResponse.json({ error: 'Invalid or expired authentication token.' }, { status: 401 })
		}

		const { title, content, published, category } = await request.json()

		if (!title) return NextResponse.json({ error: 'Title is required.' }, { status: 400 })
		if (!content) return NextResponse.json({ error: 'Content is required.' }, { status: 400 })
		if (published === null || published === undefined) {
			return NextResponse.json({ error: 'Published status is required.' }, { status: 400 })
		}
		if (!category) {
			return NextResponse.json({ error: 'Category is required.' }, { status: 400 })
		}

		const client = await pool.connect()
		try {
			await client.query('BEGIN')

			const insertPostQuery = `
				INSERT INTO posts (title, content, published, "authorId")
				VALUES ($1, $2, $3, $4)
				RETURNING id;
			`
			const postResult = await client.query(insertPostQuery, [title, content, published, authorId])
			const postId = postResult.rows[0].id

			const findCategoryQuery = 'SELECT id FROM categories WHERE name = $1'
			const categoryResult = await client.query(findCategoryQuery, [category])

			let categoryId
			if (categoryResult.rowCount === 0) {
				const insertCategoryQuery = `
					INSERT INTO categories (name)
					VALUES ($1)
					RETURNING id;
				`
				const newCategoryResult = await client.query(insertCategoryQuery, [category])
				categoryId = newCategoryResult.rows[0].id
			} else {
				categoryId = categoryResult.rows[0].id
			}

			const updatePostCategoryQuery = `
				UPDATE posts
				SET category_id = $1
				WHERE id = $2;
			`
			await client.query(updatePostCategoryQuery, [categoryId, postId])

			const tagPattern = /#(\w+)/g
			const tags = new Set<string>()
			for (const match of title.matchAll(tagPattern)) {
				tags.add(match[1].toLowerCase())
			}
			for (const match of content.matchAll(tagPattern)) {
				tags.add(match[1].toLowerCase())
			}

			for (const tagName of tags) {
				const findTagQuery = 'SELECT id FROM tags WHERE name = $1'
				const tagResult = await client.query(findTagQuery, [tagName])

				let tagId
				if (tagResult.rowCount === 0) {
					const insertTagQuery = `
						INSERT INTO tags (name)
						VALUES ($1)
						RETURNING id;
					`
					const newTagResult = await client.query(insertTagQuery, [tagName])
					tagId = newTagResult.rows[0].id
				} else {
					tagId = tagResult.rows[0].id
				}

				const insertPostTagQuery = `
					INSERT INTO post_tags (post_id, tag_id)
					VALUES ($1, $2)
					ON CONFLICT DO NOTHING;
				`
				await client.query(insertPostTagQuery, [postId, tagId])
			}

			await client.query('COMMIT')
			return NextResponse.json({ message: 'Post created successfully.', postId }, { status: 201 })
		} catch (error) {
			await client.query('ROLLBACK')
			console.error('Transaction error:', error)
			throw error
		} finally {
			client.release()
		}
	} catch (error: unknown) {
		console.error('Error processing POST request:', error)
		const message = error instanceof Error ? error.message : 'Internal server error'
		return NextResponse.json({ error: message }, { status: 500 })
	}
}
