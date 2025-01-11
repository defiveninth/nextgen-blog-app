'use client'

import useComments from '@/actions/comments/get-comments'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import Comment from './comment'
import CommentSkeleton from './comment-skeleton'
import { useEffect, useState } from 'react'

export default function CommentsPage() {
	const { id } = useParams()
	const { comments, loading, error } = useComments(id as string)
	const [localComments, setLocalComments] = useState(comments)

	useEffect(() => {
		if (comments) {
			setLocalComments(comments)
		}
	}, [comments])

	const handleRemove = async (commentId: string) => {
		// Here you would typically call an API to remove the comment
		// For now, we'll just remove it from the local state
		setLocalComments((prevComments) =>
			prevComments ? prevComments.filter(comment => comment.id !== commentId) : null
		)
	}

	const handleReport = async (commentId: string) => {
		console.log(`Reported comment: ${commentId}`)
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

	return (
		<Card className="w-full max-w-3xl mx-auto">
			<CardHeader>
				<CardTitle>Comments</CardTitle>
			</CardHeader>
			<CardContent>
				{loading ? (
					Array.from({ length: 3 }).map((_, index) => (
						<CommentSkeleton key={index} />
					))
				) : localComments && localComments.length > 0 ? (
					localComments.map((comment) => (
						<Comment
							key={comment.id}
							comment={comment}
							onRemove={handleRemove}
							onReport={handleReport}
						/>
					))
				) : (
					<p className="text-center text-muted-foreground">No comments yet.</p>
				)}
			</CardContent>
		</Card>
	)
}

