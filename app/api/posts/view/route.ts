import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function POST(req: Request) {
	let body
	try {
		body = await req.json()
	} catch (error) {
		return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
	}

	const { postId } = body

	if (!postId) {
		return NextResponse.json({ error: 'Post ID is required.' }, { status: 400 })
	}

	try {
		await pool.query('SELECT increment_view_count($1)', [postId])

		return NextResponse.json({ message: 'View count incremented successfully.' }, { status: 200 })
	} catch (error) {
		console.error('Error incrementing view count:', error)
		return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
	}
}
