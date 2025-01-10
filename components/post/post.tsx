'use client'

import { useIncrementViewCount } from '@/actions/post/increment-view'
import { usePost } from '@/actions/post/post'
import { useRemovePost } from '@/actions/post/remove'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import formatDate from '@/lib/data-formatter'
import { parseContent } from '@/lib/parse-content'
import { CalendarIcon, ClipboardCopyIcon, EditIcon, EyeIcon, FlagIcon, MoreVerticalIcon, TrashIcon, UserIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PostPage() {
	const { id } = useParams()
	const router = useRouter()
	const { post, loading, error, isThisMyPost } = usePost(id as string)
	const [isCopied, setIsCopied] = useState(false)

	const { increment } = useIncrementViewCount()
	const { removePost, isRemoving, error: removeError } = useRemovePost()

	useEffect(() => {
		increment(id as string)
	}, [id, increment])

	useEffect(() => {
		if (!loading && !post && !error) {
			router.replace('/')
		}
	}, [loading, post, error, router])

	if (loading) {
		return (
			<div className="container mx-auto px-4 py-4 sm:py-8">
				<Skeleton className="h-8 sm:h-12 w-full sm:w-3/4 mb-2 sm:mb-4" />
				<Skeleton className="h-4 w-full sm:w-1/2 mb-4 sm:mb-8" />
				<div className="space-y-2 sm:space-y-4">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-3/4" />
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className="container mx-auto px-4 py-4 sm:py-8">
				<Alert variant="destructive">
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			</div>
		)
	}

	if (!post) {
		return (
			<div className="container mx-auto px-4 py-4 sm:py-8">
				<Alert>
					<AlertTitle>Not Found</AlertTitle>
					<AlertDescription>The requested post could not be found.</AlertDescription>
				</Alert>
			</div>
		)
	}

	const parsedTitle = parseContent(post.title)
	const parsedContent = parseContent(post.content)

	const copyUrl = () => {
		navigator.clipboard.writeText(window.location.href)
		setIsCopied(true)
		setTimeout(() => setIsCopied(false), 2000)
	}

	const editPost = () => {
		router.push(`/posts/${id}/edit`)
	}

	const deletePost = async () => {
		await removePost(id as string)
		router.replace('/')
	}

	const reportPost = () => {
		// Implement report functionality
		console.log('Report post')
	}

	return (
		<div className="container mx-auto px-4 py-4 sm:py-8">
			<Card className="overflow-hidden">
				<CardHeader className="space-y-0 pb-2">
					<div className="flex items-start justify-between">
						<CardTitle className="text-2xl sm:text-3xl leading-tight mb-2">{parsedTitle}</CardTitle>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" className="h-8 w-8 p-0">
									<span className="sr-only">Open menu</span>
									<MoreVerticalIcon className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem onClick={copyUrl}>
									<ClipboardCopyIcon className="mr-2 h-4 w-4" />
									<span>{isCopied ? 'Copied!' : 'Copy URL'}</span>
								</DropdownMenuItem>
								{isThisMyPost ? (
									<>
										<DropdownMenuItem onClick={editPost}>
											<EditIcon className="mr-2 h-4 w-4" />
											<span>Edit</span>
										</DropdownMenuItem>
										<DropdownMenuItem onClick={deletePost} disabled={isRemoving}>
											<TrashIcon className="mr-2 h-4 w-4" />
											<span>{isRemoving ? 'Deleting...' : 'Delete'}</span>
										</DropdownMenuItem>
									</>
								) : (
									<DropdownMenuItem onClick={reportPost}>
										<FlagIcon className="mr-2 h-4 w-4" />
										<span>Report</span>
									</DropdownMenuItem>
								)}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
					<div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
						<div className="flex items-center">
							<UserIcon className="mr-1 h-3 w-3" />
							<span>{post.author.name}</span>
						</div>
						<div className="flex items-center">
							<CalendarIcon className="mr-1 h-3 w-3" />
							<span>{formatDate(post.createdAt)}</span>
						</div>
						<div className="flex items-center">
							<EyeIcon className="mr-1 h-3 w-3" />
							<span>{post.viewCount} views</span>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<div className="prose prose-sm sm:prose max-w-none">{parsedContent}</div>
				</CardContent>
				<CardFooter className="flex flex-col items-start gap-4">
					<div className="flex flex-wrap gap-2">
						{post.tags.map((tag) => (
							<Badge key={tag.name} variant="secondary" className="text-xs sm:text-sm">
								#{tag.name.replace(/([A-Z])/g, ' $1').trim()}
							</Badge>
						))}
					</div>
					{post.category && (
						<Badge variant="outline" className="text-xs sm:text-sm">
							{post.category.name.replace(/([A-Z])/g, ' $1').trim()}
						</Badge>
					)}
				</CardFooter>
			</Card>

			{removeError && (
				<Alert variant="destructive" className="mt-4">
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>{removeError}</AlertDescription>
				</Alert>
			)}
		</div>
	)
}
