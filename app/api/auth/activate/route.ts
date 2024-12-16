import pool from '@/lib/db'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'
import { generateAccessToken } from '@/lib/jwt'

export async function POST(request: Request) {
	try {
		const { verifyToken, name, password } = await request.json()

		if (!verifyToken) return NextResponse.json({ error: 'verifyToken is required.' }, { status: 400 })
		if (!name) return NextResponse.json({ error: 'Name is required.' }, { status: 400 })
		if (!password) return NextResponse.json({ error: 'Password is required.' }, { status: 400 })

		const { rows } = await pool.query(
			`SELECT id, email, "verifyToken", password FROM "users" WHERE "verifyToken" = $1 LIMIT 1`,
			[verifyToken]
		)
		if (rows.length === 0) {
			return NextResponse.json({ error: 'Invalid verifyToken.' }, { status: 400 })
		}

		const user = rows[0]

		const hashedPassword = await bcrypt.hash(password, 10)

		await pool.query(
			`
		UPDATE "users"
		SET name = $1, password = $2, "verifyToken" = NULL
		WHERE id = $3
		`,
			[name, hashedPassword, user.id]
		)

		const token = generateAccessToken({ id: user.id, email: user.email })

		const response = NextResponse.json(
			{ message: 'Activate account successful!' },
			{ status: 200 }
		)
		response.headers.set(
			'Set-Cookie',
			`authtoken=${token}; HttpOnly; Secure=${process.env.NODE_ENV === 'production'}; Max-Age=${5 * 24 * 60 * 60}; SameSite=Strict; Path=/`
		)

		return NextResponse.redirect('/')
	} catch (error: any) {
		console.error(error)
		return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
	}
}
