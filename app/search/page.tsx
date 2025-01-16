import { Header } from '@/components/common/header'
import SearchUser from '@/components/search'

export default function SearchPage() {
	return (
		<>
			<Header />
			<div className="container mx-auto w-full max-w-[1080px] pb-10">
				<SearchUser />
			</div>
		</>
	)
}
