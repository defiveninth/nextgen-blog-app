import { useState } from 'react'
import { useRouter } from 'next/navigation'

type PostData = {
	title: string
	content: string
	published: boolean
	category: string
}

type UseCreatePostReturn = {
	isLoading: boolean
	error: string | null
	createPost: (postData: PostData) => Promise<void>
}

export default function useCreatePost(): UseCreatePostReturn {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const router = useRouter()

	const createPost = async (postData: PostData) => {
		setIsLoading(true)
		setError(null)

		try {
			const response = await fetch('/api/posts/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(postData),
			})

			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.error || 'Failed to create post.')
			}

			const data = await response.json()
			router.push(`/posts/${data.postId}`)
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message)
			} else {
				setError('An unknown error occurred.')
			}
		} finally {
			setIsLoading(false)
		}
	}

	return { isLoading, error, createPost }
}
