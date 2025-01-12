import { useState } from 'react'

type DeleteCommentResult = {
	deleteComment: (commentId: string) => Promise<void>
	loading: boolean
	error: string | null
	success: boolean
}

const useDeleteComment = (): DeleteCommentResult => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState<boolean>(false)

	const deleteComment = async (commentId: string) => {
		if (!commentId) {
			setError('Comment ID is required.')
			return
		}

		setLoading(true)
		setError(null)
		setSuccess(false)

		try {
			const response = await fetch(`/api/comments/${commentId}`, {
				method: 'DELETE',
			})

			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.error || 'Failed to delete comment.')
			}

			setSuccess(true)
		} catch (err) {
			console.error('Error deleting comment:', err)
			setError((err as Error).message)
		} finally {
			setLoading(false)
		}
	}

	return { deleteComment, loading, error, success }
}

export default useDeleteComment
