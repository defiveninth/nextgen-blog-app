import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const query = searchParams.get('query')

	if (!query || query.trim() === '') {
		return NextResponse.json(
			{ error: 'Query parameter is required' },
			{ status: 400 }
		)
	}

	try {
		const sqlQuery = `
      SELECT id, name, username, email
      FROM users
      WHERE name ILIKE $1
         OR username ILIKE $1
         OR email ILIKE $1
      LIMIT 20
    `
		const result = await pool.query(sqlQuery, [`%${query}%`])

		return NextResponse.json(result.rows, { status: 200 })
	} catch (error) {
		console.error('Error searching users:', error)
		return NextResponse.json(
			{ error: 'Failed to search users' },
			{ status: 500 }
		)
	}
}
