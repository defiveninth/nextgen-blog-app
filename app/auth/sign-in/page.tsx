import { LogIn, Waypoints } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'
import IRoute from '@/types/route'

import Layout from '@/components/auth/layout'
import Header from '@/components/auth/header'
import Routing from '@/components/common/routing'

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
        <h2 className='text-2xl font-semibold mb-1 mt-5'>Sign In:</h2>
        <p>Please enter your details to continue</p>
        <form className='mx-auto mt-16 flex flex-col gap-5'>
          <input
            type="text"
            placeholder="Enter your email or username:"
            className="py-4 px-2 w-72 outline-none transition-colors duration-500 border-b-transparent focus:border-b-white border-b-2"
          />
          <input
            type="text"
            placeholder="Enter your password:"
            className="py-4 px-2 w-72 outline-none transition-colors duration-500 border-b-transparent focus:border-b-white border-b-2"
          />
          <div className='flex justify-end mt-[-15px]'>
            <Link href={'/auth/forgot-password'} className='text-blue-500 text-sm'>
              Forgot password?
            </Link>
          </div>
          <button className="btn btn-outline">Sign In</button>
        </form>
      </Layout>
    </>
  )
}

export default SignIn