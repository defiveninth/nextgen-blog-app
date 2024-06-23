import Link from 'next/link'

const SearchInput = () => {
	return (
		<div className='ml-20'>
			<label className="input input-bordered flex items-center gap-2 rounded-md">
				<input type="text" className="grow" placeholder="Search" />
				<kbd className="kbd kbd-sm">⌘</kbd>
				<kbd className="kbd kbd-sm">K</kbd>
			</label>
		</div>
	)
}

export default SearchInput