import { useEffect, useState } from 'react'
import { Post } from '../post/posts.types'

type UseTagsPostsResponse = {
	data: Post[] | null
	isLoading: boolean
	error: string | null
}

export const usePostsWithGivenTagName = (tagName: string): UseTagsPostsResponse => {
	const [data, setData] = useState<Post[] | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!tagName) {
			setError('Tag name is required')
			return
		}

		const fetchPosts = async () => {
			setIsLoading(true)
			setError(null)

			try {
				const response = await fetch(`/api/tags/${tagName}`)
				if (!response.ok) {
					throw new Error(`Failed to fetch posts: ${response.statusText}`)
				}

				const result = await response.json()
				setData(result)
			} catch (err) {
				setError((err as Error).message)
			} finally {
				setIsLoading(false)
			}
		}

		fetchPosts()
	}, [tagName])

	return { data, isLoading, error }
}
