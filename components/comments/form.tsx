'use client'

import { useState, FormEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import useCreateComment from '@/actions/comments/create-comment'
import { useParams } from 'next/navigation'

export default function CommentForm() {
	const { id } = useParams()
	const [content, setContent] = useState('')
	const { createComment, loading, error, success } = useCreateComment()

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		await createComment(id as string, content)
		if (success) {
			setContent('')
		}
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-4 max-w-3xl mx-auto mb-5">
			<div className="flex space-x-2">
				<Input
					type="text"
					value={content}
					onChange={(e) => setContent(e.target.value)}
					placeholder="Write a comment..."
					disabled={loading}
					className="flex-grow"
				/>
				<Button type="submit" disabled={loading || !content.trim()}>
					{loading ? 'Submitting...' : 'Submit'}
				</Button>
			</div>

			{error && (
				<Alert variant="destructive">
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}

			{success && (
				<Alert>
					<AlertDescription>Comment submitted successfully!</AlertDescription>
				</Alert>
			)}
		</form>
	)
}

