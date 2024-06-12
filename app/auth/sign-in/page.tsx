import Link from 'next/link'
import { ArrowRight, LogIn, Waypoints } from 'lucide-react'
import type { Metadata } from 'next'
import IRoute from '@/types/route'

import Layout from '@/components/auth/layout'
import Header from '@/components/auth/header'
import Routing from '@/components/common/routing'
import Heading from '@/components/auth/heading'

export const metadata: Metadata = {
  title: "FuckIt | Sign In",
  description: "FuckIt | Sign In",
}

const route: Array<IRoute> = [
  {
    name: 'Get Started',
    icon: Waypoints,
    path: '/auth'
  },
  {
    name: 'Sign In',
    icon: LogIn,
    path: '/auth/sign-in'
  }
]

function SignIn() {
  return (
    <>
      <Header />
      <Layout>
        <Routing route={route} />
        <Heading title='Welcome Back!' />
        <p>Please enter your details to continue:</p>
        <p className='mt-5'>
          <span>Forgot Password? </span>
          <Link href={'/auth/forgot-password'} className='text-blue-500 hover:text-blue-600 duration-150 hover:underline'>Restore</Link>
        </p>
        <p>
          <span>Don't have an account? </span>
          <Link href={'/auth/sign-up'} className='text-blue-500 hover:text-blue-600 duration-150 hover:underline'>Sign Up</Link>
        </p>
        <form className='mx-auto mt-16 flex flex-col gap-5'>
          <input
            type="text"
            placeholder="Enter your email or username:"
            className="py-4 px-2 w-72 outline-none transition-colors duration-500 border-b-transparent focus:border-b-white border-b-2"
          />
          <input
            type="password"
            placeholder="Enter your password:"
            className="py-4 px-2 w-72 outline-none transition-colors duration-500 border-b-transparent focus:border-b-white border-b-2"
          />
          <button className="btn btn-outline">
            <span>Sign In</span>
            <ArrowRight size={19} className='ml-[-5px]' />
          </button>
        </form>
      </Layout>
    </>
  )
}

export default SignIn