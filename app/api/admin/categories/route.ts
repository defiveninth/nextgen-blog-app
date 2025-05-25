import { NextResponse } from "next/server"
import pool from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""

    let query = `
      SELECT 
        c.id, 
        c.name,
        COUNT(p.id) as posts_count
      FROM categories c
      LEFT JOIN posts p ON c.id = p.category_id
    `

    const values: any[] = []

    if (search) {
      query += ` WHERE c.name ILIKE $1`
      values.push(`%${search}%`)
    }

    query += `
      GROUP BY c.id, c.name
      ORDER BY c.name ASC
    `

    const result = await pool.query(query, values)

    return NextResponse.json({
      categories: result.rows,
    })
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json()

    if (!name) {
      return NextResponse.json({ error: "Category name is required." }, { status: 400 })
    }

    const query = `INSERT INTO categories (id, name) VALUES (gen_random_uuid(), $1) RETURNING *`
    const result = await pool.query(query, [name])

    return NextResponse.json(
      {
        message: "Category created successfully.",
        category: result.rows[0],
      },
      { status: 201 },
    )
  } catch (error) {
    if ((error as { code?: string }).code === "23505") {
      return NextResponse.json({ error: "Category with this name already exists." }, { status: 400 })
    }
    console.error("Error creating category:", error)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get("id")

    if (!categoryId) {
      return NextResponse.json({ error: "Category ID is required." }, { status: 400 })
    }

    const query = `DELETE FROM categories WHERE id = $1`
    await pool.query(query, [categoryId])

    return NextResponse.json({ message: "Category deleted successfully." })
  } catch (error) {
    console.error("Error deleting category:", error)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}
