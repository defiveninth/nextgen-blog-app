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
        c.id, 
        c.content, 
        c."createdAt" as created_at,
        u.name as author_name,
        p.title as post_title,
        p.id as post_id
      FROM comments c
      JOIN users u ON c."authorId" = u.id
      JOIN posts p ON c."postId" = p.id
    `

    const values: any[] = []

    if (search) {
      query += ` WHERE (c.content ILIKE $1 OR u.name ILIKE $1 OR p.title ILIKE $1)`
      values.push(`%${search}%`)
    }

    query += `
      ORDER BY c."createdAt" DESC
      LIMIT $${values.length + 1} OFFSET $${values.length + 2}
    `

    values.push(limit, offset)

    const result = await pool.query(query, values)

    // Get total count for pagination
    let countQuery = `
      SELECT COUNT(*) 
      FROM comments c
      JOIN users u ON c."authorId" = u.id
      JOIN posts p ON c."postId" = p.id
    `
    const countValues: any[] = []

    if (search) {
      countQuery += ` WHERE (c.content ILIKE $1 OR u.name ILIKE $1 OR p.title ILIKE $1)`
      countValues.push(`%${search}%`)
    }

    const countResult = await pool.query(countQuery, countValues)
    const totalCount = Number.parseInt(countResult.rows[0].count)

    return NextResponse.json({
      comments: result.rows,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching comments:", error)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const commentId = searchParams.get("id")

    if (!commentId) {
      return NextResponse.json({ error: "Comment ID is required." }, { status: 400 })
    }

    const query = `DELETE FROM comments WHERE id = $1`
    await pool.query(query, [commentId])

    return NextResponse.json({ message: "Comment deleted successfully." })
  } catch (error) {
    console.error("Error deleting comment:", error)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}
