import { useEffect, useState } from 'react'
import { Post } from '../post/posts.types'

type UseCategoryPostsResponse = {
	data: Post[] | null
	isLoading: boolean
	error: string | null
}

export const useCategoryPosts = (categoryId: string): UseCategoryPostsResponse => {
	const [data, setData] = useState<Post[] | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!categoryId) {
			setError('Category ID is required')
			return
		}

		const fetchPosts = async () => {
			setIsLoading(true)
			setError(null)

			try {
				const response = await fetch(`/api/categories/${categoryId}`)
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
	}, [categoryId])

	return { data, isLoading, error }
}
