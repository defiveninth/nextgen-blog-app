import { Header } from '@/components/common/header'
import GivenTagPosts from '@/components/post/tag-posts'

export default function CategoryPostsPage() {
	return (
		<>
			<Header />
			<div className="container mx-auto max-w-[1080px] pb-10 pt-10">
				<GivenTagPosts />
			</div>
		</>
	)
}
