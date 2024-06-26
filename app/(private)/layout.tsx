'use client'

import { FC } from 'react'
import ReadOnlyChild from '@/types/readonly-child'

import Header from '@/components/private/header'
import Wrapper from '@/components/private/wrapper'
import Nav from '@/components/private/nav'
import Content from '@/components/private/content'

const PrivateLayout: FC<ReadOnlyChild> = ({ children }) => {
	return (
		<>
			<Header />
			<Wrapper>
				<Nav />
				<Content>
					{children}
				</Content>
			</Wrapper>
		</>
	)
}

export default PrivateLayout