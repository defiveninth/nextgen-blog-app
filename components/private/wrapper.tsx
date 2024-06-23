import { FC } from 'react'
import ReadOnlyChild from '@/types/readonly-child'

const Wrapper: FC<ReadOnlyChild> = ({ children }) => {
	return (
		<div className='container mx-auto mt-24 relative'>
			{ children }
		</div>
	)
}

export default Wrapper