import { Bell, Bookmark, MessageCircleMore } from 'lucide-react'
import Image from 'next/image'

const RightSide = () => {
	return (
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
				<Image alt='' src={'/avatar/default.png'} width={40} height={40} className='rounded-full' />
			</button>
		</div>
	)
}

export default RightSide