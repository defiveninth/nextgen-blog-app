import { NextResponse } from "next/server"
import pool from "@/lib/db"

export async function GET() {
  try {
    // Get total counts
    const statsQuery = `
      SELECT 
        (SELECT COUNT(*) FROM users) as total_users,
        (SELECT COUNT(*) FROM posts) as total_posts,
        (SELECT COUNT(*) FROM comments) as total_comments,
        (SELECT COALESCE(SUM("viewCount"), 0) FROM posts) as total_views
    `

    const statsResult = await pool.query(statsQuery)
    const stats = statsResult.rows[0]

    // Get recent posts
    const recentPostsQuery = `
      SELECT p.id, p.title, p.published, p."createdAt" as created_at, u.name as author_name
      FROM posts p
      JOIN users u ON p."authorId" = u.id
      ORDER BY p."createdAt" DESC
      LIMIT 5
    `

    const recentPostsResult = await pool.query(recentPostsQuery)

    // Get recent comments
    const recentCommentsQuery = `
      SELECT c.id, c.content, u.name as author_name, p.title as post_title
      FROM comments c
      JOIN users u ON c."authorId" = u.id
      JOIN posts p ON c."postId" = p.id
      ORDER BY c."createdAt" DESC
      LIMIT 5
    `

    const recentCommentsResult = await pool.query(recentCommentsQuery)

    return NextResponse.json({
      totalUsers: Number.parseInt(stats.total_users),
      totalPosts: Number.parseInt(stats.total_posts),
      totalComments: Number.parseInt(stats.total_comments),
      totalViews: Number.parseInt(stats.total_views),
      recentPosts: recentPostsResult.rows,
      recentComments: recentCommentsResult.rows,
    })
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}
