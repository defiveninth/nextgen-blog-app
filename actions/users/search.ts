import { useState } from 'react'

interface User {
	id: string
	name: string
	username: string
	email: string
}
const useSearchUsers = () => {
	const [users, setUsers] = useState<User[] | null>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const searchUsers = async (query: string) => {
		if (!query.trim()) {
			setError('Search query cannot be empty.')
			setUsers(null)
			return
		}

		setLoading(true)
		setError(null)

		try {
			const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`)
			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.error || 'Failed to fetch users.')
			}

			const data: User[] = await response.json()
			setUsers(data)
		} catch (err: any) {
			setError(err.message || 'An unknown error occurred.')
			setUsers(null)
		} finally {
			setLoading(false)
		}
	}

	return { users, loading, error, searchUsers }
}

export default useSearchUsers
