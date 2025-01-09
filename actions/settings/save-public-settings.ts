import { useState } from 'react'

type UpdateSettingsInput = {
	name: string
	username: string
	email: string
	avatar: string
}

type UpdateSettingsResult = {
	isUpdating: boolean
	updateError: string | null
	updateSuccess: boolean
	updateSettings: (data: UpdateSettingsInput) => Promise<void>
}

export function useUpdateSettings(): UpdateSettingsResult {
	const [isUpdating, setIsUpdating] = useState(false)
	const [updateError, setUpdateError] = useState<string | null>(null)
	const [updateSuccess, setUpdateSuccess] = useState(false)

	const updateSettings = async (data: UpdateSettingsInput) => {
		setIsUpdating(true)
		setUpdateError(null)
		setUpdateSuccess(false)

		try {
			const response = await fetch('/api/settings', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})

			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.error || 'Failed to update settings')
			}

			setUpdateSuccess(true)
		} catch (error) {
			setUpdateError(error instanceof Error ? error.message : 'An unknown error occurred')
		} finally {
			setIsUpdating(false)
		}
	}

	return {
		isUpdating,
		updateError,
		updateSuccess,
		updateSettings,
	}
}
