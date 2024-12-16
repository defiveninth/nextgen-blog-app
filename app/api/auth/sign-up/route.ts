import generateVerifyToken from '@/lib/generate-verify-token'
import { sendVerificationEmail } from '@/lib/send-verification-email'
import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function POST(request: Request) {
	try {
		const { email } = await request.json()

		if (!email) {
			return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
		}

		const verifyToken = generateVerifyToken()

		const query = `
		INSERT INTO users (email, "verifyToken")
		VALUES ($1, $2)`

		const values = [email, verifyToken]

		try {
			await pool.query(query, values)

			await sendVerificationEmail(email, verifyToken)

			return NextResponse.json({ message: 'User created successfully, Please check your email address to verify account' }, { status: 201 })
		} catch (dbError: any) {
			if (dbError.code === '23505') {
				return NextResponse.json({ error: 'User with this email already exists.' }, { status: 400 })
			}
			throw dbError
		}
	} catch (error: any) {
		console.error(error)
		return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
	}
}
