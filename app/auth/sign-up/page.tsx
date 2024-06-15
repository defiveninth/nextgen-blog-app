import Link from 'next/link'
import { UserRoundPlus, Waypoints } from 'lucide-react'
import type { Metadata } from 'next'
import IRoute from '@/types/route'

import Routing from '@/components/common/routing'
import Header from '@/components/auth/header'
import Layout from '@/components/auth/layout'
import Heading from '@/components/auth/heading'
import SignUpForm from '@/components/auth/client/sign-up.form'

export const metadata: Metadata = {
  title: "FuckIt | Sign Up",
  description: "FuckIt | Sign Up",
}

const route: Array<IRoute> = [
  {
    name: 'Get Started',
    icon: Waypoints,
    path: '/auth'
  },
  {
    name: 'Sign Up',
    icon: UserRoundPlus,
    path: '/auth/sign-in'
  }
]

function SignUp() {
  return (
    <>
      <Header />
      <Layout>
        <Routing route={route} />
        <Heading title='Create Account' />
        <p>Get started with your email address:</p>
        <p className='mt-5'>
          <span>Already have an account? </span>
          <Link href={'/auth/sign-in'} className='text-blue-500 hover:text-blue-600 duration-150 hover:underline'>Sign In</Link>
        </p>
        <SignUpForm />
      </Layout>
    </>
  )
}

export default SignUp