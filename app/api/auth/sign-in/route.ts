import pool from '@/lib/db'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'
import { generateAccessToken } from '@/lib/jwt'

export async function POST(request: Request) {
	try {
		const { email, password } = await request.json()

		if (!email) {
			return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
		}
		if (!password) {
			return NextResponse.json({ error: 'Password is required.' }, { status: 400 })
		}

		const query = `
			SELECT id, email, password
			FROM users
			WHERE email = $1
		`
		const values = [email]
		const { rows } = await pool.query(query, values)
		const user = rows[0]

		if (!user || !user.password) {
			return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
		}

		const passwordMatch = await bcrypt.compare(password, user.password)
		if (!passwordMatch) {
			return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
		}

		const token = generateAccessToken({ id: user.id, email: user.email })

		const updateQuery = `
			UPDATE users
			SET "authToken" = $1
			WHERE id = $2
		`
		await pool.query(updateQuery, [token, user.id])

		const response = NextResponse.json(
			{ message: 'Sign-in successful!' },
			{ status: 200 }
		)
		response.headers.set(
			'Set-Cookie',
			`authtoken=${token}; HttpOnly; Secure=${process.env.NODE_ENV === 'production'}; Max-Age=${5 * 24 * 60 * 60}; SameSite=Strict; Path=/`
		)

		return response
	} catch (error: unknown) {
		console.error(error)

		if (error instanceof Error) {
			return NextResponse.json({ error: error.message }, { status: 500 })
		}

		return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
	}
}
