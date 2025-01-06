import { useState, useEffect } from 'react'

type CategoryType = {
	id: string
	name: string
}

const useCategories = () => {
	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [data, setData] = useState<Array<CategoryType>>([])

	useEffect(() => {
		const fetchCategories = async () => {
			setIsLoading(true)
			setError(null)
			try {
				const response = await fetch('/api/categories')
				if (!response.ok) {
					throw new Error(`Error fetching categories: ${response.statusText}`)
				}
				const categories: Array<CategoryType> = await response.json()
				setData(categories)
			} catch (err: any) {
				setError(err.message || 'An error occurred')
			} finally {
				setIsLoading(false)
			}
		}

		fetchCategories()
	}, [])

	return {
		error,
		isLoading,
		categories: data,
	} as const
}

export default useCategories
