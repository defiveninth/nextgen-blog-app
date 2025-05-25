import { NextResponse } from "next/server"
import pool from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const offset = (page - 1) * limit

    let query = `
      SELECT 
        u.id, 
        u.name, 
        u.username, 
        u.email, 
        u."createdAt" as created_at,
        u."verifyToken" is null as verified,
        COUNT(DISTINCT p.id) as posts_count,
        COUNT(DISTINCT c.id) as comments_count
      FROM users u
      LEFT JOIN posts p ON u.id = p."authorId"
      LEFT JOIN comments c ON u.id = c."authorId"
    `

    const values: any[] = []

    if (search) {
      query += ` WHERE (u.name ILIKE $1 OR u.email ILIKE $1 OR u.username ILIKE $1)`
      values.push(`%${search}%`)
    }

    query += `
      GROUP BY u.id, u.name, u.username, u.email, u."createdAt", u."verifyToken"
      ORDER BY u."createdAt" DESC
      LIMIT $${values.length + 1} OFFSET $${values.length + 2}
    `

    values.push(limit, offset)

    const result = await pool.query(query, values)

    // Get total count for pagination
    let countQuery = `SELECT COUNT(*) FROM users`
    const countValues: any[] = []

    if (search) {
      countQuery += ` WHERE (name ILIKE $1 OR email ILIKE $1 OR username ILIKE $1)`
      countValues.push(`%${search}%`)
    }

    const countResult = await pool.query(countQuery, countValues)
    const totalCount = Number.parseInt(countResult.rows[0].count)

    return NextResponse.json({
      users: result.rows,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("id")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required." }, { status: 400 })
    }

    // Delete user and cascade delete related records
    const query = `DELETE FROM users WHERE id = $1`
    await pool.query(query, [userId])

    return NextResponse.json({ message: "User deleted successfully." })
  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}
