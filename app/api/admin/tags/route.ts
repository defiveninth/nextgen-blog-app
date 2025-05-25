import { NextResponse } from "next/server"
import pool from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""

    let query = `
      SELECT 
        t.id, 
        t.name,
        COUNT(pt.post_id) as posts_count
      FROM tags t
      LEFT JOIN post_tags pt ON t.id = pt.tag_id
    `

    const values: any[] = []

    if (search) {
      query += ` WHERE t.name ILIKE $1`
      values.push(`%${search}%`)
    }

    query += `
      GROUP BY t.id, t.name
      ORDER BY t.name ASC
    `

    const result = await pool.query(query, values)

    return NextResponse.json({
      tags: result.rows,
    })
  } catch (error) {
    console.error("Error fetching tags:", error)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json()

    if (!name) {
      return NextResponse.json({ error: "Tag name is required." }, { status: 400 })
    }

    const query = `INSERT INTO tags (id, name) VALUES (gen_random_uuid(), $1) RETURNING *`
    const result = await pool.query(query, [name])

    return NextResponse.json(
      {
        message: "Tag created successfully.",
        tag: result.rows[0],
      },
      { status: 201 },
    )
  } catch (error) {
    if ((error as { code?: string }).code === "23505") {
      return NextResponse.json({ error: "Tag with this name already exists." }, { status: 400 })
    }
    console.error("Error creating tag:", error)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const tagId = searchParams.get("id")

    if (!tagId) {
      return NextResponse.json({ error: "Tag ID is required." }, { status: 400 })
    }

    const query = `DELETE FROM tags WHERE id = $1`
    await pool.query(query, [tagId])

    return NextResponse.json({ message: "Tag deleted successfully." })
  } catch (error) {
    console.error("Error deleting tag:", error)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}
