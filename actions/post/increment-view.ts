export function useIncrementViewCount() {
	const increment = (postId: string) => {
		if (!postId) {
			console.warn('Post ID is required to increment view count.')
			return
		}

		fetch('/api/posts/view', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ postId }),
		}).catch((error) => {
			console.error('Failed to increment view count:', error)
		})
	}

	return { increment }
}
