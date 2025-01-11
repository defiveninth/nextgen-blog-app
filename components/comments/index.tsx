'use client'

import useComments from '@/actions/comments/get-comments'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import Comment from './comment'
import CommentSkeleton from './comment-skeleton'

export default function CommentsPage() {
	const { id } = useParams()
	const { comments, loading, error } = useComments(id as string)

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
				) : comments && comments.length > 0 ? (
					comments.map((comment) => (
						<Comment key={comment.id} comment={comment} />
					))
				) : (
					<p className="text-center text-muted-foreground">No comments yet.</p>
				)}
			</CardContent>
		</Card>
	)
}

