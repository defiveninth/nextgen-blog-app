import { useState } from 'react'

export default function useCreateAccount() {
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const createAccount = async (email: string): Promise<{ success: boolean; error?: string }> => {
		setIsLoading(true)

		try {
			const response = await fetch('/api/auth/sign-up', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email }),
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.error || 'Something went wrong')
			}

			return { success: true }
		} catch (err: any) {
			return { success: false, error: err.message || 'An error occurred' }
		} finally {
			setIsLoading(false)
		}
	}

	return {
		isLoading,
		createAccount,
	} as const
}
