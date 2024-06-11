import { FC } from 'react'
import ReadOnlyChild from '@/types/readonly-child'

const Layout: FC<ReadOnlyChild> = ({ children }) => {
	return (
		<div className='container mx-auto mt-5 flex flex-col'>
			{children}
		</div>
	)
}

export default Layout
