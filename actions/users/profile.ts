import { useState, useEffect } from 'react'

type UserProfile = {
	id: string
	name: string | null
	username: string | null
	email: string
	avatar: string | null
	createdAt: string
	updatedAt: string
	isThisMe: boolean
}

export function useUserProfile(userId: string) {
	const [user, setUser] = useState<UserProfile | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [isError, setIsError] = useState<boolean>(false)

	useEffect(() => {
		if (!userId) return

		async function fetchUserProfile() {
			setIsLoading(true)
			setIsError(false)

			try {
				const response = await fetch(`/api/users/${userId}`)
				if (!response.ok) {
					const errorData = await response.json()
					throw new Error(errorData.error || 'Failed to fetch user profile')
				}
				const data: UserProfile = await response.json()
				setUser(data)
			} catch (error) {
				console.error('Error in useUserProfile:', error)
				setIsError(true)
			} finally {
				setIsLoading(false)
			}
		}

		fetchUserProfile()
	}, [userId])

	return { user, isLoading, isError } as const
}
