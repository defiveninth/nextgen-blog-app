import { useState } from 'react'

interface ChangePasswordResponse {
	message?: string
	error?: string
}

export const useChangePassword = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [message, setMessage] = useState<string | null>(null)

	const changePassword = async (oldPassword: string, newPassword: string) => {
		setLoading(true)
		setError(null)
		setMessage(null)

		try {
			const response = await fetch('/api/settings/set-password', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ oldPassword, newPassword }),
			})

			const data: ChangePasswordResponse = await response.json()

			if (!response.ok) {
				setError(data.error || 'Something went wrong.')
			} else {
				setMessage(data.message || 'Password changed successfully.')
			}
		} catch (error) {
			setError('Failed to change password. Please try again later.')
		} finally {
			setLoading(false)
		}
	}

	return { loading, error, message, changePassword }
}
