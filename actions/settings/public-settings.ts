import { useState, useEffect } from 'react'

type UserPublicSettings = {
	id: string
	name: string | null
	username: string | null
	email: string
	avatar: string | null
	createdAt: string
	updatedAt: string
	isThisMe: boolean
}

export function useMyPublicSettings() {
	const [user, setUser] = useState<UserPublicSettings | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [isError, setIsError] = useState<boolean>(false)

	useEffect(() => {
		async function fetchMyPublicSettings() {
			setIsLoading(true)
			setIsError(false)

			try {
				const response = await fetch('/api/settings')
				if (!response.ok) {
					const errorData = await response.json()
					throw new Error(errorData.error || 'Failed to fetch user profile')
				}
				const data: UserPublicSettings = await response.json()
				setUser(data)
			} catch (error) {
				console.error('Error in useUserProfile:', error)
				setIsError(true)
			} finally {
				setIsLoading(false)
			}
		}

		fetchMyPublicSettings()
	}, [])

	return {
		settings: user,
		isLoading,
		isError
	} as const
}
