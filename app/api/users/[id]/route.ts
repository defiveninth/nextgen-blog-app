import pool from '@/lib/db'
import { NextResponse } from 'next/server'

type Params = Promise<{ id: string }>

export async function GET(segmentData: { params: Params }) {
	const params = await segmentData.params
	const id = params.id

	if (!id) {
		return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
	}

	const query = `
    SELECT id, name, username, email, avatar, "createdAt", "updatedAt"
    FROM users
    WHERE id = $1
  	`

	try {
		const client = await pool.connect()
		const result = await client.query(query, [id])

		if (result.rowCount === 0) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 })
		}

		return NextResponse.json(result.rows[0], { status: 200 })
	} catch (error) {
		console.error('Error fetching user profile:', error)
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
	}
}
