'use client'

import { redirect, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const SetPasswordForm = () => {
	const searchParams = useSearchParams()
	const [user, setUser] = useState('')

	useEffect(() => {
		if (searchParams.has('email')) setUser(searchParams.get('email') as string)
		else if (searchParams.has('username')) setUser(searchParams.get('username') as string)
		else redirect('/auth/forgot-password')
	}, [])

  return (
	<form className='mx-auto mt-16 flex flex-col gap-5'>
		{ user }
	</form>
  )
}

export default SetPasswordForm
