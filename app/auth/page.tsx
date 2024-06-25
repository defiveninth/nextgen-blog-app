import Link from 'next/link'
import Header from '@/components/auth/header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Murdergram | Get Started",
  description: "Murdergram get started page",
}

function GetStarted() {
  return (
    <>
      <Header />
      <div className='container mx-auto mt-5 px-5 flex flex-col'>
        <h2 className='font-medium text-5xl mt-20 ml-10'>
          <p>Murdergram</p>
          <span className='ml-20 flex items-center'>
            <span>- new era of messaging</span>
            <span className="loading loading-infinity loading-lg ml-5 mt-2"></span>
          </span>
        </h2>
        <div className='mt-10 flex gap-5 justify-end'>
          <Link href={'/auth/sign-in'} className="btn btn-outline">Get Started</Link>
          <Link href={'#'} className="btn btn-outline">Download Now</Link>
        </div>
      </div>
    </>
  )
}

export default GetStarted
