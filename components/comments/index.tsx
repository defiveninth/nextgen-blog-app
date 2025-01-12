'use client'

import useComments from '@/actions/comments/get-comments'
import useDeleteComment from '@/actions/comments/delete-comment'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import Comment from './comment'
import CommentSkeleton from './comment-skeleton'
import { useEffect, useState } from 'react'

export default function CommentsPage() {
	const { id } = useParams()
	const { comments, loading, error } = useComments(id as string)
	const { deleteComment, loading: deleting, error: deleteError, success } = useDeleteComment()
	const [localComments, setLocalComments] = useState(comments)

	useEffect(() => {
		if (comments) {
			setLocalComments(comments)
		}
	}, [comments])

	const handleRemove = async (commentId: string) => {
		try {
			await deleteComment(commentId)
			setLocalComments((prevComments) =>
				prevComments ? prevComments.filter((comment) => comment.id !== commentId) : null
			)
		} catch (err) {
			console.error('Error removing comment:', err)
		}
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
			{success && (
				<Alert variant="default" className="mb-4">
					<AlertTitle>Success</AlertTitle>
					<AlertDescription>Comment deleted successfully.</AlertDescription>
				</Alert>
			)}
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
							isDeleting={deleting && comment.id}
						/>
					))
				) : (
					<p className="text-center text-muted-foreground">No comments yet.</p>
				)}
			</CardContent>
			{deleteError && (
				<Alert variant="destructive" className="mt-4">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>Deletion Error</AlertTitle>
					<AlertDescription>{deleteError}</AlertDescription>
				</Alert>
			)}
			
		</Card>
	)
}
