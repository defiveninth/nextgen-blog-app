import Link from 'next/link'
import { ArrowRight, UserRoundPlus, Waypoints } from 'lucide-react'
import type { Metadata } from 'next'
import IRoute from '@/types/route'

import Routing from '@/components/common/routing'
import Header from '@/components/auth/header'
import Layout from '@/components/auth/layout'
import Heading from '@/components/auth/heading'

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
          <Link href={'/auth/forgot-password'} className='text-blue-500 hover:text-blue-600 duration-150 hover:underline'>Sign In</Link>
        </p>
        <form className='mx-auto mt-16 flex flex-col gap-5'>
          <input
            type="text"
            placeholder="Enter your email:"
            className="py-4 px-2 w-72 outline-none transition-colors duration-500 border-b-transparent focus:border-b-white border-b-2"
          />
          <button className="btn btn-outline">
            <span>Verify email</span>
            <ArrowRight size={19} className='ml-[-5px]' />
          </button>
        </form>
      </Layout>
    </>
  )
}

export default SignUp