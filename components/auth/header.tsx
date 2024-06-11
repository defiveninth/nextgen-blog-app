import Link from 'next/link'

function Header() {
	return (
		<header className='container mx-auto h-20 flex justify-between items-center border-b-2 border-white'>
			<Link href={'/'}>
				<h2 className='text-2xl font-semibold'>FuckIt</h2>
			</Link>
			<nav className='flex gap-5'>
				<Link href={'/auth'}>Get Started</Link>
				<Link href={'/news'}>News</Link>
				<Link href={'/terms-of-use'}>Terms of Use</Link>
			</nav>
		</header>
	)
}

export default Header