import { useState, useEffect } from 'react'

type Post = {
	id: string
	title: string
	content_preview: string
	createdAt: string
	updatedAt: string
	viewCount: number
	tags: string[] | null
}

export function useUserPosts(userId: string) {
	const [posts, setPosts] = useState<Post[] | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [isError, setIsError] = useState<boolean>(false)

	useEffect(() => {
		if (!userId) return

		async function fetchUserPosts() {
			setIsLoading(true)
			setIsError(false)

			try {
				const response = await fetch(`/api/users/${userId}/posts`)
				if (!response.ok) {
					throw new Error(`Error fetching posts: ${response.statusText}`)
				}
				const data = await response.json()
				setPosts(data)
			} catch (error) {
				console.error('Error in useUserPosts:', error)
				setIsError(true)
			} finally {
				setIsLoading(false)
			}
		}

		fetchUserPosts()
	}, [userId])

	return { posts, isLoading, isError } as const
}
