import { FC } from 'react'
import ReadOnlyChild from '@/types/readonly-child'

const Content: FC<ReadOnlyChild> = ({ children }) => {
  return (
	<main className='ml-64 p-5'>
		{ children }
	</main>
  )
}

export default Content