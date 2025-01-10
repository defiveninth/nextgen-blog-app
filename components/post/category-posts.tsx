'use client'

import { useCategoryPosts } from '@/actions/categories/posts'
import { useParams } from 'next/navigation'
import { Skeleton } from '../ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { PostItem } from './post-item'
import { AlertCircle } from 'lucide-react'

function PostSkeleton() {
	return (
		<div className="space-y-3">
			<Skeleton className="h-[125px] w-full rounded-xl" />
			<div className="space-y-2">
				<Skeleton className="h-4 w-[250px]" />
				<Skeleton className="h-4 w-[200px]" />
			</div>
		</div>
	)
}

export default function GivenCategoryPosts() {
	const { cid } = useParams()
	const { data, isLoading: loading, error } = useCategoryPosts(cid as string)

	if (loading) {
		return (
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{[...Array(6)].map((_, i) => (
					<PostSkeleton key={i} />
				))}
			</div>
		)
	}

	if (error) {
		return (
			<Alert variant="destructive">
				<AlertCircle className="h-4 w-4" />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>{error}</AlertDescription>
			</Alert>
		)
	}

	if (!data || data.length === 0) {
		return (
			<Alert>
				<AlertTitle>No posts found</AlertTitle>
				<AlertDescription>
					There are currently no blog posts available.
				</AlertDescription>
			</Alert>
		)
	}

	return (
		<>
			<h2 className='text-xl font-semibold mb-5'>
				Category: {data[0].category?.name} (Found {data.length} posts)
			</h2>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{data.map((post) => (
					<PostItem key={post.id} post={post} />
				))}
			</div>
		</>
	)
}
