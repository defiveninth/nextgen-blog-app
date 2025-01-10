'use client'

import { useState, useCallback } from 'react'

export function useRemovePost() {
	const [isRemoving, setIsRemoving] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const removePost = useCallback(async (postId: string) => {
		setIsRemoving(true)
		setError(null)

		try {
			const response = await fetch('/api/posts', {
				method: 'DELETE',
				body: JSON.stringify({ id: postId })
			})

			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.error || 'Failed to remove the post')
			}

			return true
		} catch (err) {
			console.error('Error removing post:', err)
			setError(err instanceof Error ? err.message : 'An unknown error occurred')
			return false
		} finally {
			setIsRemoving(false)
		}
	}, [])

	return {
		removePost,
		isRemoving,
		error,
	}
}

