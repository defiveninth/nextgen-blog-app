import { useEffect, useState } from 'react'

export type Comment = {
	id: string
	content: string
	createdAt: string
	authorId: string
	authorName: string
	authorUsername: string
	isItMine: boolean
}

type UseCommentsResult = {
	comments: Comment[] | null
	loading: boolean
	error: string | null
}

const useComments = (postId: string): UseCommentsResult => {
	const [comments, setComments] = useState<Comment[] | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!postId) {
			setError('Post ID is required')
			return
		}

		const fetchComments = async () => {
			setLoading(true)
			setError(null)

			try {
				const response = await fetch(`/api/comments/${postId}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				})

				if (!response.ok) {
					throw new Error(`Failed to fetch comments: ${response.statusText}`)
				}

				const data: Comment[] = await response.json()
				setComments(data)
			} catch (err) {
				console.error('Error fetching comments:', err)
				setError((err as Error).message)
			} finally {
				setLoading(false)
			}
		}

		fetchComments()
	}, [postId])

	return { comments, loading, error } as const
}

export default useComments
