import Link from 'next/link'

function GetStarted() {
  return (
    <>
      <header className='container mx-auto h-20 flex justify-between items-center border-b-2 border-white'>
          <Link href={'/'}>
            <h2 className='text-2xl font-semibold'>FuckIt</h2>
          </Link>
      </header>
    </>
  )
}

export default GetStarted
