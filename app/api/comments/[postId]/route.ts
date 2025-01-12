import { Comment } from '@/actions/comments/get-comments'
import pool from '@/lib/db'
import { verifyAccessToken } from '@/lib/jwt'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

type Params = Promise<{ postId: string }>
const secret = process.env.JWT_SECRET || 'DEFAULT_SECRET'

export async function GET(
	request: Request,
	segmentData: { params: Params }
) {
	const params = await segmentData.params
	const postId = params.postId

	const authToken = (await cookies()).get('authtoken')
	let userId: string | null = null

	if (authToken?.value) {
		try {
			const payload = verifyAccessToken(authToken.value, secret)
			userId = payload.id as string
		} catch (error) {
			console.warn('Invalid token provided, proceeding without authentication:', error)
		}
	}

	const query = `
    SELECT 
      c.id, 
      c."content", 
      c."createdAt", 
      u.id AS "authorId", 
      u.name AS "authorName", 
      u.username AS "authorUsername"
    FROM comments c
    INNER JOIN users u ON c."authorId" = u.id
    WHERE c."postId" = $1
    ORDER BY c."createdAt" DESC
  `

	try {
		const { rows } = await pool.query(query, [postId])

		const enrichedComments = (rows as Comment[]).map((comment) => ({
			...comment,
			isItMine: userId === comment.authorId,
		}))


		return NextResponse.json(enrichedComments, { status: 200 })
	} catch (error) {
		console.error('Error fetching comments:', error)
		return NextResponse.json({ error: 'Error fetching comments' }, { status: 500 })
	}
}


export async function POST(
	request: Request,
	segmentData: { params: Params }
) {
	const params = await segmentData.params
	const postId = params.postId
	const { content } = await request.json()
	const authtoken = (await cookies()).get('authtoken')

	if (!authtoken) {
		return NextResponse.json(
			{ error: 'Only authorized users can leave comments' },
			{ status: 401 }
		)
	}

	if (!content) {
		return NextResponse.json({ error: 'Content is required' }, { status: 400 })
	}

	const query = `
    INSERT INTO comments ("postId", "content", "authorId")
    VALUES ($1, $2, (SELECT id FROM users WHERE "authToken" = $3))
    RETURNING id, "content", "createdAt"
  	`
	try {
		const { rows } = await pool.query(query, [postId, content, authtoken.value])
		const newComment = rows[0]
		return NextResponse.json(newComment, { status: 201 })
	} catch (error) {
		console.error('Error adding comment:', error)
		return NextResponse.json({ error: 'Error adding comment' }, { status: 500 })
	}
}

export async function DELETE(
	request: Request,
	segmentData: { params: Params }
) {
	const params = await segmentData.params
	const commentId = params.postId
	const authToken = (await cookies()).get('authtoken')

	if (!authToken) {
		return NextResponse.json(
			{ error: 'You must be logged in to delete a comment.' },
			{ status: 401 }
		)
	}

	let userId: string | null = null
	try {
		const payload = verifyAccessToken(authToken.value, secret)
		userId = payload.id as string
	} catch (error) {
		return NextResponse.json(
			{ error: 'Invalid or expired token. Please log in again.' },
			{ status: 401 }
		)
	}

	const query = `
    DELETE FROM comments 
    WHERE id = $1 
      AND "authorId" = $2
  	`
	try {
		const { rows } = await pool.query(query, [commentId, userId])

		if (rows.length === 0) {
			return NextResponse.json(
				{ error: 'Comment not found or you are not authorized to delete it.' },
				{ status: 404 }
			)
		}

		return NextResponse.json({ message: 'Comment deleted successfully.' }, { status: 200 })
	} catch (error) {
		console.error('Error deleting comment:', error)
		return NextResponse.json({ error: 'Error deleting comment.' }, { status: 500 })
	}
}
