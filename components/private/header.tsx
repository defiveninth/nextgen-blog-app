import { Bell, Bookmark, MessageCircleMore } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
	return (
		<header className='flex justify-center'>
			<div className='container mt-5 flex items-center justify-between'>
				<div className='flex items-center'>
					<Link href={'/'} className='text-3xl font-bold'>FuckIt</Link>
					<div className='ml-20'>
						<label className="input input-bordered flex items-center gap-2 rounded-md">
							<input type="text" className="grow" placeholder="Search" />
							<kbd className="kbd kbd-sm">⌘</kbd>
							<kbd className="kbd kbd-sm">K</kbd>
						</label>
					</div>
				</div>
				<div className='flex gap-4'>
					<button className='h-12 w-12 rounded-full hover:bg-zinc-800 flex justify-center items-center duration-150'>
						<Bookmark />
					</button>
					<button className='h-12 w-12 rounded-full hover:bg-zinc-800 flex justify-center items-center duration-100'>
						<MessageCircleMore />
					</button>
					<button className='h-12 w-12 rounded-full hover:bg-zinc-800 flex justify-center items-center duration-100'>
						<Bell />
					</button>
					<button>
						<Image alt='' src={'/avatar/download.png'} width={40} height={40} className='rounded-full' />
					</button>
				</div>
			</div>
		</header>
	)
}

export default Header