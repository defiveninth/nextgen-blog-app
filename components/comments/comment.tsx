import { Comment as CommentType } from '@/actions/comments/get-comments'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Trash, Flag } from 'lucide-react'
import formatDate from '@/lib/data-formatter'

type CommentProps = {
	comment: CommentType
	onRemove?: (id: string) => void
	onReport?: (id: string) => void
	isDeleting: string | boolean
}

export default function Comment({ comment, onRemove, onReport, isDeleting }: CommentProps) {
	const handleAction = () => {
		if (comment.isItMine && onRemove) {
			onRemove(comment.id)
		} else if (!comment.isItMine && onReport) {
			onReport(comment.id)
		}
	}

	return (
		<Card className="mb-4">
			<CardHeader className="flex flex-row items-center justify-between pb-2">
				<div className="flex items-center gap-4">
					<Avatar>
						<AvatarImage src={`https://avatar.vercel.sh/${comment.authorUsername}`} />
						<AvatarFallback>{comment.authorName[0]}</AvatarFallback>
					</Avatar>
					<div className="flex flex-col">
						<CardTitle className="text-sm font-medium">{comment.authorName}</CardTitle>
						<p className="text-xs text-muted-foreground">@{comment.authorUsername}</p>
					</div>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="sm" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem onClick={handleAction}>
							{comment.isItMine ? (
								<>
									<Trash className="mr-2 h-4 w-4" />
									{isDeleting ? 'Deleting...' : 'Delete'}
								</>
							) : (
								<>
									<Flag className="mr-2 h-4 w-4" />
									<span>Report</span>
								</>
							)}
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</CardHeader>
			<CardContent>
				<p className="text-sm">{comment.content}</p>
				<p className="text-xs text-muted-foreground mt-2">
					{formatDate(comment.createdAt)}
				</p>
			</CardContent>
		</Card>
	)
}

