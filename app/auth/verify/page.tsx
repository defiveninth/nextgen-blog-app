import Link from 'next/link'
import { ShieldCheck, Waypoints } from 'lucide-react'
import IRoute from '@/types/route'
import type { Metadata } from 'next'

import Header from '@/components/auth/header'
import Heading from '@/components/auth/heading'
import Layout from '@/components/auth/layout'
import Routing from '@/components/common/routing'
import VerifyEmailForm from '@/components/auth/client/verify-email.form'
import { Suspense } from 'react'

export const metadata: Metadata = {
	title: "FuckIt | Verify Email",
	description: "FuckIt | Verify Email",
}

const route: Array<IRoute> = [
	{
		name: 'Get Started',
		icon: Waypoints,
		path: '/auth'
	},
	{
		name: 'Verify Email',
		icon: ShieldCheck,
		path: '/auth/verify'
	}
]

const Verify = () => {
	return (
		<>
			<Header />
			<Layout>
				<Routing route={route} />
				<Heading title='Verify Your Email!' />
				<p>Get verified to continue:</p>
				<p className='mt-5'>
					<span>Already have an account? </span>
					<Link href={'/auth/sign-in'} className='text-blue-500 hover:text-blue-600 duration-150 hover:underline'>Sign In</Link>
				</p>
				<Suspense>
					<VerifyEmailForm />
				</Suspense>
			</Layout>
		</>
	)
}

export default Verify