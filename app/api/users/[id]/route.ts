import pool from '@/lib/db'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyAccessToken } from '@/lib/jwt'

const secret = process.env.JWT_SECRET || 'default_secret'

type Params = Promise<{ id: string }>

export async function GET(
  request: Request,
  segmentData: { params: Params }
) {
  const params = await segmentData.params
  const userId = params.id

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
  }

  const cookieStore = await cookies()
  const authToken = cookieStore.get('authtoken')?.value

  let isThisMe = false

  if (authToken) {
    try {
      const decoded = verifyAccessToken(authToken, secret)
      isThisMe = decoded.id === userId
    } catch (error) {
      console.error('Error verifying auth token:', error)
    }
  }

  const query = `
    SELECT id, name, username, email, avatar, "createdAt", "updatedAt"
    FROM users
    WHERE id = $1
  `

  try {
    const client = await pool.connect()
    const result = await client.query(query, [userId])

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const user = result.rows[0]
    return NextResponse.json({ ...user, isThisMe }, { status: 200 })
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
