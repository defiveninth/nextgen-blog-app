import { useState, useEffect } from 'react'

type Category = {
	id: string
	name: string
	posts_count: number
	view_count: number
}

type UseCategoriesResult = {
	categories: Category[] | null
	isLoading: boolean
	isError: boolean
}

export function useCategories(): UseCategoriesResult {
	const [categories, setCategories] = useState<Category[] | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [isError, setIsError] = useState<boolean>(false)

	useEffect(() => {
		async function fetchCategories() {
			setIsLoading(true)
			setIsError(false)

			try {
				const response = await fetch('/api/categories')

				if (!response.ok) {
					throw new Error(`Error fetching categories: ${response.statusText}`)
				}

				const data: Category[] = await response.json()
				setCategories(data)
			} catch (error) {
				console.error('Error in useCategories:', error)
				setIsError(true)
			} finally {
				setIsLoading(false)
			}
		}

		fetchCategories()
	}, [])

	return { categories, isLoading, isError }
}
