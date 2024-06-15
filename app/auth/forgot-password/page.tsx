import Link from 'next/link'
import { LockKeyhole, Waypoints } from 'lucide-react'
import type { Metadata } from 'next'
import IRoute from '@/types/route'

import Routing from '@/components/common/routing'
import Header from '@/components/auth/header'
import Layout from '@/components/auth/layout'
import Heading from '@/components/auth/heading'
import ForgotPasswordForm from '@/components/auth/client/forgot-password.form'

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
    name: 'Forgot Password',
    icon: LockKeyhole,
    path: '/auth/forgot-password'
  }
]

function ForgotPassword() {
  return (
    <>
      <Header />
      <Layout>
        <Routing route={route} />
        <Heading title='Restore your password:' />
        <p>First of all you&apos;ll need to verify yourself!</p>
        <p className='mt-5'>
          <span>I remember my password? </span>
          <Link href={'/auth/sign-in'} className='text-blue-500 hover:text-blue-600 duration-150 hover:underline'>Sign In</Link>
        </p>
        <p>
          <span>Want a new account? </span>
          <Link href={'/auth/sign-up'} className='text-blue-500 hover:text-blue-600 duration-150 hover:underline'>Sign Up</Link>
        </p>
        <ForgotPasswordForm />
      </Layout>
    </>
  )
}

export default ForgotPassword