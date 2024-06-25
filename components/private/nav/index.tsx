import Link from 'next/link'
import { BookImage, Calendar, Files, Newspaper, TvMinimalPlay, UsersRound } from 'lucide-react'

const Nav = () => {
	return (
		<nav className='bg-[#1B1B1B] fixed top-24 min-h-screen flex flex-col gap-3 w-64 rounded-md py-5 px-1'>
			<Link href={'/'} className='flex gap-5 items-center hover:bg-black px-5 py-2 rounded-lg duration-100'>
				<Newspaper />
				<span className='text-xl font-medium'>Feed</span>
			</Link>
			<Link href={'/friends'} className='flex gap-5 items-center hover:bg-black px-5 py-2 rounded-lg duration-100'>
				<UsersRound />
				<span className='text-xl font-medium'>Friends</span>
			</Link>
			<Link href={'/event'} className='flex gap-5 items-center hover:bg-black px-5 py-2 rounded-lg duration-100'>
				<Calendar />
				<span className='text-xl font-medium'>Event</span>
			</Link>
			<Link href={'/videos'} className='flex gap-5 items-center hover:bg-black px-5 py-2 rounded-lg duration-100'>
				<TvMinimalPlay />
				<span className='text-xl font-medium'>Watch Videos</span>
			</Link>
			<Link href={'/photos'} className='flex gap-5 items-center hover:bg-black px-5 py-2 rounded-lg duration-100'>
				<BookImage />
				<span className='text-xl font-medium'>Photos</span>
			</Link>
			<Link href={'/files'} className='flex gap-5 items-center hover:bg-black px-5 py-2 rounded-lg duration-100'>
				<Files />
				<span className='text-xl font-medium'>Files</span>
			</Link>
		</nav>
	)
}

export default Nav