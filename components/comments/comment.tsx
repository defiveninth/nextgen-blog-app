import { Comment as CommentType } from '@/actions/comments/get-comments'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type CommentProps = {
	comment: CommentType
}

export default function Comment({ comment }: CommentProps) {
	return (
		<Card className="mb-4">
			<CardHeader className="flex flex-row items-center gap-4 pb-2">
				<Avatar>
					<AvatarImage src={`https://avatar.vercel.sh/${comment.authorUsername}`} />
					<AvatarFallback>{comment.authorName[0]}</AvatarFallback>
				</Avatar>
				<div className="flex flex-col">
					<CardTitle className="text-sm font-medium">{comment.authorName}</CardTitle>
					<p className="text-xs text-muted-foreground">@{comment.authorUsername}</p>
				</div>
			</CardHeader>
			<CardContent>
				<p className="text-sm">{comment.content}</p>
				<p className="text-xs text-muted-foreground mt-2">
					{new Date(comment.createdAt).toLocaleString()}
				</p>
			</CardContent>
		</Card>
	)
}

