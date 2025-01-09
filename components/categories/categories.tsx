'use client'

import { useCategories } from '@/actions/categories/get-with-stats'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle } from 'lucide-react'

export default function Categories() {
	const { categories, isLoading, isError } = useCategories()

	if (isLoading) {
		return (
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold mb-6">Categories</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{[...Array(6)].map((_, index) => (
						<Card key={index}>
							<CardHeader>
								<Skeleton className="h-6 w-3/4" />
							</CardHeader>
							<CardContent>
								<Skeleton className="h-4 w-1/2 mb-2" />
								<Skeleton className="h-4 w-1/2" />
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		)
	}

	if (isError) {
		return (
			<div className="container mx-auto px-4 py-8">
				<Alert variant="destructive">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>
						Error loading categories. Please try again later.
					</AlertDescription>
				</Alert>
			</div>
		)
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6">Categories</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{categories?.map((category) => (
					<Link
						href={`/categories/${category.id}`}
						key={category.id}
						className="block transition-transform duration-200 hover:scale-[101%]"
					>
						<Card>
							<CardHeader>
								<CardTitle>{category.name}</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground">Posts: {category.posts_count}</p>
								<p className="text-sm text-muted-foreground">Views: {category.view_count}</p>
							</CardContent>
						</Card>
					</Link>
				))}
			</div>
		</div>
	)
}
