import pool from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const query = 'SELECT * FROM categories'
		const result = await pool.query(query)

		return NextResponse.json({ categories: result.rows }, { status: 200 })
	} catch (error: unknown) {
		console.error('Error fetching categories:', error)

		if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 })

		return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
	}
}
