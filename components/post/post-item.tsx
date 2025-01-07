import { Post } from '@/actions/post/posts.types'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, UserIcon } from 'lucide-react'

interface PostItemProps {
	post: Post
}

export function PostItem({ post }: PostItemProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{post.title}</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-muted-foreground mb-4">{post.content.substring(0, 150)}...</p>
				<div className="flex items-center space-x-4 text-sm text-muted-foreground">
					<div className="flex items-center">
						<UserIcon className="mr-1 h-3 w-3" />
						<span>{post.author.name}</span>
					</div>
					<div className="flex items-center">
						<CalendarIcon className="mr-1 h-3 w-3" />
						<span>{new Date(post.createdAt).toLocaleDateString()}</span>
					</div>
				</div>
			</CardContent>
			<CardFooter className="flex flex-wrap gap-2">
				{post.tags.map((tag) => (
					<Badge key={tag.name} variant="secondary">
						{tag.name}
					</Badge>
				))}
				{post.category && (
					<Badge variant="outline" className="ml-auto">
						{post.category.name}
					</Badge>
				)}
			</CardFooter>
		</Card>
	)
}
