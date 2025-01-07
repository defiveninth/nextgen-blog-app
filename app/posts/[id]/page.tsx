import { Header } from '@/components/common/header'
import Post from '@/components/post/post'

export default function PostPage() {
	return (
		<>
			<Header />
			<div className="container mx-auto max-w-[1080px] pb-10">
				<Post />
			</div>
		</>
	)
}