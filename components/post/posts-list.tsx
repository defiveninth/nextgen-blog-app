'use client'

import { usePosts } from '@/actions/post/posts'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle } from 'lucide-react'
import { PostItem } from './post-item'

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

export function PostList() {
	const { posts, loading, error } = usePosts()

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

	if (posts.length === 0) {
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
		<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{posts.map((post) => (
				<PostItem key={post.id} post={post} />
			))}
		</div>
	)
}

