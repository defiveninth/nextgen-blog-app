import { Suspense } from 'react'
import type { Metadata } from 'next'
import { KeyRound, LockKeyhole, Waypoints } from 'lucide-react'
import IRoute from '@/types/route'
import Link from 'next/link'

import Header from '@/components/auth/header'
import Layout from '@/components/auth/layout'
import Routing from '@/components/common/routing'
import Heading from '@/components/auth/heading'
import SetPasswordForm from '@/components/auth/client/set-password.form'

export const metadata: Metadata = {
  title: "FuckIt | Set Password",
  description: "FuckIt | Set Password",
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
  },
  {
    name: 'Set Password',
    icon: KeyRound,
    path: '/auth/set-password'
  }
]

const SetPassword = () => {
  return (
    <>
      <Header />
      <Layout>
        <Routing route={route} />
        <Heading title='Restore your account:' />
        <p>Enter the verify code from your email and set new password</p>
        <p className='mt-5'>
          <span>I remember my password? </span>
          <Link href={'/auth/sign-in'} className='text-blue-500 hover:text-blue-600 duration-150 hover:underline'>Sign In</Link>
        </p>
        <p>
          <span>Want a new account? </span>
          <Link href={'/auth/sign-up'} className='text-blue-500 hover:text-blue-600 duration-150 hover:underline'>Sign Up</Link>
        </p>
        <Suspense>
          <SetPasswordForm />
        </Suspense>
      </Layout>
    </>
  )
}

export default SetPassword