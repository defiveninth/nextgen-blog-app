import CommentsPage from '@/components/comments'
import CommentForm from '@/components/comments/form'
import { Header } from '@/components/common/header'
import Post from '@/components/post/post'

export default function PostPage() {
	return (
		<>
			<Header />
			<div className="container mx-auto max-w-[1080px] pb-10">
				<Post />
				<CommentForm />
				<CommentsPage />
			</div>
		</>
	)
}