import { verifyAccessToken } from '@/lib/jwt'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import bcrypt from 'bcrypt'
import pool from '@/lib/db'

const secret = process.env.JWT_SECRET || 'default_secret'

export async function POST(req: Request) {
	try {
		const authToken = (await cookies()).get('authtoken')?.value
		if (!authToken) {
			return NextResponse.json({ error: 'Unauthorized. Missing auth token.' }, { status: 401 })
		}

		let userId
		try {
			const decoded = verifyAccessToken(authToken, secret)
			userId = decoded.id
		} catch (error) {
			console.error('Error verifying auth token:', error)
			return NextResponse.json({ error: 'Unauthorized. Invalid token.' }, { status: 401 })
		}

		if (!userId) {
			return NextResponse.json({ error: 'Unauthorized. User ID not found.' }, { status: 401 })
		}

		const { oldPassword, newPassword } = await req.json()
		if (!oldPassword || !newPassword) {
			return NextResponse.json({ error: 'Old password and new password are required.' }, { status: 400 })
		}

		const { rows } = await pool.query('SELECT password FROM users WHERE id = $1', [userId])
		const user = rows[0]
		if (!user) {
			return NextResponse.json({ error: 'User not found.' }, { status: 404 })
		}

		const isPasswordValid = await bcrypt.compare(oldPassword, user.password)
		if (!isPasswordValid) {
			return NextResponse.json({ error: 'Old password is incorrect.' }, { status: 400 })
		}

		const hashedPassword = await bcrypt.hash(newPassword, 10)
		await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, userId])

		return NextResponse.json({ message: 'Password updated successfully.' }, { status: 200 })
	} catch (error) {
		console.error('Internal server error:', error)
		return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
	}
}
