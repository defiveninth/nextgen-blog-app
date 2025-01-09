import { useState, useCallback } from 'react'

type UsernameCheckResult = {
	isAvailable: boolean
	error?: string
}

export function useCheckUsername() {
	const [isLoading, setIsLoading] = useState(false)
	const [isAvailable, setIsAvailable] = useState<boolean | null>(null)
	const [error, setError] = useState<string | null>(null)

	const check = useCallback(async (username: string): Promise<UsernameCheckResult> => {
		setIsLoading(true)
		setError(null)

		try {
			const response = await fetch(`/api/settings/username-available?username=${encodeURIComponent(username)}`)
			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.error || 'Failed to check username availability')
			}

			setIsAvailable(data.isAvailable)
			return data
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
			setError(errorMessage)
			setIsAvailable(null)
			return { isAvailable: false, error: errorMessage }
		} finally {
			setIsLoading(false)
		}
	}, [])

	return {
		isLoading,
		isAvailable,
		error,
		check,
	}
}
