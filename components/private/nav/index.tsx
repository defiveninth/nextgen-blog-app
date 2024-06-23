import Link from 'next/link'
import { BookImage, Calendar, Files, Newspaper, TvMinimalPlay, UsersRound } from 'lucide-react'

const Nav = () => {
	return (
		<nav className='bg-[#1B1B1B] absolute top-0 left-0 min-h-screen flex flex-col gap-5 w-64 rounded-md p-5'>
			<Link href={'/'} className='flex gap-5 items-center'>
				<Newspaper />
				<span className='text-xl font-medium'>Feed</span>
			</Link>
			<Link href={'/'} className='flex gap-5 items-center'>
				<UsersRound />
				<span className='text-xl font-medium'>Friends</span>
			</Link>
			<Link href={'/'} className='flex gap-5 items-center'>
				<Calendar />
				<span className='text-xl font-medium'>Event</span>
			</Link>
			<Link href={'/'} className='flex gap-5 items-center'>
				<TvMinimalPlay />
				<span className='text-xl font-medium'>Watch Videos</span>
			</Link>
			<Link href={'/'} className='flex gap-5 items-center'>
				<BookImage />
				<span className='text-xl font-medium'>Photos</span>
			</Link>
			<Link href={'/'} className='flex gap-5 items-center'>
				<Files />
				<span className='text-xl font-medium'>Files</span>
			</Link>
		</nav>
	)
}

export default Nav