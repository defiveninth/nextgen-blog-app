'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useUserPosts } from '@/actions/users/user-posts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, Eye } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function UserPosts() {
	const { id } = useParams()
	const { posts, isLoading, isError } = useUserPosts(id as string)

	if (isLoading) {
		return (
			<div className="container mx-auto p-4 space-y-4">
				<h1 className="text-2xl font-bold mb-4">User Posts</h1>
				{[...Array(3)].map((_, index) => (
					<Card key={index} className="w-full">
						<CardHeader>
							<Skeleton className="h-4 w-3/4" />
						</CardHeader>
						<CardContent>
							<Skeleton className="h-4 w-full mb-2" />
							<Skeleton className="h-4 w-5/6" />
						</CardContent>
					</Card>
				))}
			</div>
		)
	}

	if (isError) {
		return (
			<div className="container mx-auto p-4">
				<Alert variant="destructive">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>
						There was an error loading the user&apos;s posts. Please try again later.
					</AlertDescription>
				</Alert>
			</div>
		)
	}

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">User Posts</h1>
			{posts && posts.length > 0 ? (
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{posts.map((post) => (
						<Link href={`/posts/${post.id}`} key={post.id} className="group">
							<Card className="flex flex-col h-full transition-shadow hover:shadow-md">
								<CardHeader>
									<CardTitle className="text-lg group-hover:underline">{post.title}</CardTitle>
								</CardHeader>
								<CardContent className="flex-grow">
									<p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{post.content_preview}</p>
									<div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
										<span>Created: {new Date(post.createdAt).toLocaleDateString()}</span>
										<span className="flex items-center">
											<Eye className="h-4 w-4 mr-1" />
											{post.viewCount}
										</span>
									</div>
								</CardContent>
								<div className="px-4 pb-4">
									{post.tags && post.tags.length > 0 && (
										<div className="flex flex-wrap gap-2 mt-2">
											{post.tags.map((tag, index) => (
												<Badge key={index} variant="secondary">{tag}</Badge>
											))}
										</div>
									)}
								</div>
							</Card>
						</Link>
					))}
				</div>
			) : (
				<p className="text-center text-gray-600 dark:text-gray-400">No posts found for this user.</p>
			)}
		</div>
	)
}

