import { useEffect, useState } from 'react'
import { Post } from './posts.types'

export function usePost(id: string) {
	const [post, setPost] = useState<Post & { isThisMyPost: boolean } | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [isThisMyPost, setIsThisMyPost] = useState<boolean>(false)

	useEffect(() => {
		async function fetchPost() {
			setLoading(true)
			setIsThisMyPost(false)
			try {
				const response = await fetch(`/api/posts/${id}`)
				if (!response.ok) {
					const errorData = await response.json()
					setError(errorData.error || 'Failed to fetch post')
				} else {
					const data = await response.json()
					setPost(data)
					setIsThisMyPost(data.isThisMyPost)
				}
			} catch (err) {
				setError('An error occurred while fetching the post')
			} finally {
				setLoading(false)
			}
		}

		fetchPost()
	}, [id])

	return { post, loading, error, isThisMyPost }
}
