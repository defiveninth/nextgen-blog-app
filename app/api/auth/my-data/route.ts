import pool from '@/lib/db'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(_request: Request) {
	const cookieStore = await cookies()
	const token = cookieStore.get('authtoken')?.value

	if (!token) {
		return new NextResponse(JSON.stringify({ error: 'No access token found' }), {
			status: 401,
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}

	try {
		const query = `
            SELECT id, name, username, email, avatar
            FROM users
            WHERE "authToken" = $1;
        `
		const result = await pool.query(query, [token])

		if (result.rows.length === 0) {
			return new NextResponse(JSON.stringify({ error: 'User not found' }), {
				status: 404,
				headers: {
					'Content-Type': 'application/json'
				}
			})
		}

		const user = result.rows[0]
		return new NextResponse(JSON.stringify(user), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		})
	} catch (error) {
		console.error('Database query error:', error)
		return new NextResponse(JSON.stringify({ error: 'Internal server error' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}
}
