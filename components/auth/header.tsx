import Link from 'next/link'

function Header() {
	return (
		<header className='container mx-auto h-20 flex justify-between items-center border-b-2 border-white'>
			<Link href={'/'}>
				<h2 className='text-2xl font-semibold'>FuckIt</h2>
			</Link>
			<nav className='flex gap-5'>
				<Link className='hover:text-gray-300 duration-150' href={'/auth'}>Get Started</Link>
				<Link className='hover:text-gray-300 duration-150' href={'/news'}>News</Link>
				<Link className='hover:text-gray-300 duration-150' href={'/terms-of-use'}>Terms of Use</Link>
			</nav>
		</header>
	)
}

export default Header