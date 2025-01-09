import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const username = searchParams.get('username')

	if (!username) {
		return NextResponse.json({ error: 'Username is required' }, { status: 400 })
	}

	const query = `SELECT 1 FROM users WHERE username = $1 LIMIT 1`

	const client = await pool.connect()
	try {
		const result = await client.query(query, [username])
		const isAvailable = result.rowCount === 0

		return NextResponse.json({ isAvailable }, { status: 200 })
	} catch (error) {
		console.error('Error checking username availability:', error)
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
	} finally {
		client.release()
	}
}
