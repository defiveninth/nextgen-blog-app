import { Header } from '@/components/common/header'
import SearchUser from '@/components/search'
import { Suspense } from 'react'

export default function SearchPage() {
	return (
		<>
			<Header />
			<div className="container mx-auto w-full max-w-[1080px] pb-10">
				<Suspense>
					<SearchUser />
				</Suspense>
			</div>
		</>
	)
}
