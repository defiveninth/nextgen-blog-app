import { useState } from 'react'

const useCreatePost = () => {
	const [isLoading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string>('')
	const [response, setResponse] = useState<Record<string, any> | null>(null)

	const createPost = async (
		title: string,
		content: string,
		published: boolean
	) => {
		setError('')
		setLoading(true)
		setResponse(null)

		try {
			const res = await fetch('/api/posts', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title, content, published }),
			})

			const data = await res.json()

			if (!res.ok) {
				throw new Error(data.error || 'Failed to create post.')
			}

			setResponse(data)
		} catch (err: any) {
			setError(err.message || 'An unexpected error occurred.')
		} finally {
			setLoading(false)
		}
	}
	return { isLoading, error, response, createPost } as const
}

export default useCreatePost
