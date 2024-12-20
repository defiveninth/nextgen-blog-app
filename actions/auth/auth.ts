import { useState } from 'react'

export default function useAuth() {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const fetchMyData = async () => {
		setIsLoading(true)
		setError(null)

		try {
			const tokenResponse = await fetch('/api/auth/get-token', {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			})

			if (!tokenResponse.ok) return false
			else {
				const myDataResponse = await fetch('/api/auth/my-data', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' }
				})
			}

		} catch (err: any) {
			setError(err.message || 'An unexpected error occurred.')
			return false
		} finally {
			setIsLoading(false)
		}
	}

	return {
		isLoading,
		error,
		fetchMyData,
	} as const
}
