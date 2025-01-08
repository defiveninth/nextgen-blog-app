import { useState, useEffect } from 'react'
import { Post } from './posts.types'

export function usePosts() {
	const [posts, setPosts] = useState<Post[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		async function fetchPosts() {
			try {
				const response = await fetch('/api/posts')
				if (!response.ok) {
					throw new Error('Failed to fetch posts.')
				}
				const data: Post[] = await response.json()
				setPosts(data)
			} catch (err: any) {
				setError(err.message)
			} finally {
				setLoading(false)
			}
		}

		fetchPosts()
	}, [])

	return { posts, loading, error }
}
