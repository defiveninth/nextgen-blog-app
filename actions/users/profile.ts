import { useState, useEffect } from 'react'

type UserProfile = {
	id: string
	name: string | null
	username: string | null
	email: string
	avatar: string | null
	createdAt: string
	updatedAt: string
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
					throw new Error(`Error fetching user profile: ${response.statusText}`)
				}
				const data = await response.json()
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
