import { useState } from 'react'

type CreateCommentResult = {
	createComment: (postId: string, content: string) => Promise<void>
	loading: boolean
	error: string | null
	success: boolean
}

const useCreateComment = (): CreateCommentResult => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState<boolean>(false)

	const createComment = async (postId: string, content: string) => {
		if (!postId || !content) {
			setError('Post ID and content are required.')
			return
		}

		setLoading(true)
		setError(null)
		setSuccess(false)

		try {
			const response = await fetch(`/api/comments/${postId}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ content }),
			})

			if (!response.ok) {
				throw new Error(`Failed to create comment: ${response.statusText}`)
			}

			setSuccess(true)
		} catch (err) {
			console.error('Error creating comment:', err)
			setError((err as Error).message)
		} finally {
			setLoading(false)
		}
	}

	return { createComment, loading, error, success }
}

export default useCreateComment
