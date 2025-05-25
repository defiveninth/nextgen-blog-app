import { NextResponse } from "next/server"
import pool from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const status = searchParams.get("status") || "all"
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const offset = (page - 1) * limit

    let query = `
      SELECT 
        p.id, 
        p.title, 
        p.published, 
        p."viewCount" as view_count,
        p."createdAt" as created_at,
        p."updatedAt" as updated_at,
        u.name as author_name,
        c.name as category_name,
        COUNT(DISTINCT cm.id) as comments_count
      FROM posts p
      JOIN users u ON p."authorId" = u.id
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN comments cm ON p.id = cm."postId"
    `

    const values: any[] = []
    const conditions: string[] = []

    if (search) {
      conditions.push(`(p.title ILIKE $${values.length + 1} OR u.name ILIKE $${values.length + 1})`)
      values.push(`%${search}%`)
    }

    if (status === "published") {
      conditions.push(`p.published = true`)
    } else if (status === "draft") {
      conditions.push(`p.published = false`)
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(" AND ")}`
    }

    query += `
      GROUP BY p.id, p.title, p.published, p."viewCount", p."createdAt", p."updatedAt", u.name, c.name
      ORDER BY p."createdAt" DESC
      LIMIT $${values.length + 1} OFFSET $${values.length + 2}
    `

    values.push(limit, offset)

    const result = await pool.query(query, values)

    // Get total count for pagination
    let countQuery = `
      SELECT COUNT(*) 
      FROM posts p
      JOIN users u ON p."authorId" = u.id
    `
    const countValues: any[] = []
    const countConditions: string[] = []

    if (search) {
      countConditions.push(`(p.title ILIKE $${countValues.length + 1} OR u.name ILIKE $${countValues.length + 1})`)
      countValues.push(`%${search}%`)
    }

    if (status === "published") {
      countConditions.push(`p.published = true`)
    } else if (status === "draft") {
      countConditions.push(`p.published = false`)
    }

    if (countConditions.length > 0) {
      countQuery += ` WHERE ${countConditions.join(" AND ")}`
    }

    const countResult = await pool.query(countQuery, countValues)
    const totalCount = Number.parseInt(countResult.rows[0].count)

    return NextResponse.json({
      posts: result.rows,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const postId = searchParams.get("id")

    if (!postId) {
      return NextResponse.json({ error: "Post ID is required." }, { status: 400 })
    }

    const query = `DELETE FROM posts WHERE id = $1`
    await pool.query(query, [postId])

    return NextResponse.json({ message: "Post deleted successfully." })
  } catch (error) {
    console.error("Error deleting post:", error)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, published } = await request.json()

    if (!id) {
      return NextResponse.json({ error: "Post ID is required." }, { status: 400 })
    }

    const query = `UPDATE posts SET published = $1, "updatedAt" = NOW() WHERE id = $2`
    await pool.query(query, [published, id])

    return NextResponse.json({ message: "Post updated successfully." })
  } catch (error) {
    console.error("Error updating post:", error)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}
