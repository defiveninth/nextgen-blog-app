import { Header } from '@/components/common/header'
import UserProfile from '@/components/profile/profile'
import UserPosts from '@/components/profile/user-posts'

export default function Home() {
	return (
		<>
			<Header />
			<div className="container mx-auto max-w-[1080px] pb-10">
				<UserProfile />
				<UserPosts />
			</div>
		</>
	)
}