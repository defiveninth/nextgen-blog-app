import { useState } from 'react'

export default function useActivateAccount() {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const activateAccount = async (
		verifyToken: string,
		name: string,
		password: string
	): Promise<boolean> => {
		setIsLoading(true)
		setError(null)

		try {
			const response = await fetch('/api/auth/activate', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ verifyToken, name, password }),
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.error || 'Activation failed. Please try again.')
			}

			return true
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
		activateAccount,
	} as const
}
