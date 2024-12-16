import { useState } from 'react'

export default function useSignIn() {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const signIn = async (email: string, password: string): Promise<boolean> => {
		setIsLoading(true)
		setError(null)

		try {
			const response = await fetch('/api/auth/sign-in', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.error || 'Invalid email or password.')
			}
			return true
		} catch (err: any) {
			setError(err.message || 'An error occurred during sign-in.')
			return false
		} finally {
			setIsLoading(false)
		}
	}

	return {
		isLoading,
		error,
		signIn,
	} as const
}
