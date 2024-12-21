import { useState, useCallback } from 'react'

interface comingUserDataType {
	id: string
	name: string
	username: string
	email: string
	avatar: string
}

export default function useAuth() {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string>('')
	const [data, setData] = useState<comingUserDataType | null>(null)

	const fetchMyData = useCallback(async () => {
		setIsLoading(true)
		setError('')

		try {
			const myDataResponse = await fetch('/api/auth/my-data', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
			})

			if (!myDataResponse.ok) {
				const errorResponse = await myDataResponse.json()
				throw new Error(errorResponse.error || 'Failed to fetch user data.')
			}

			const userData: comingUserDataType = await myDataResponse.json()
			setData(userData)
		} catch (err: any) {
			setError(err.message || 'An unexpected error occurred.')
		} finally {
			setIsLoading(false)
		}
	}, [])

	return {
		isLoading,
		error,
		fetchMyData,
		data,
	} as const
}
