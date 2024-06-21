'use client'

import { FormEvent, useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { redirect, useSearchParams } from 'next/navigation'

import CodeInput from '../code-input'
import isEmail from '@/utils/is-email'
import signIn from '@/actions/auth/sign-in'

const SetPasswordForm = () => {
	const [user, setUser] = useState('')
	const [code, setCode] = useState<string[]>(['', '', '', ''])
	const [newPassword, SetPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const searchParams = useSearchParams()

	useEffect(() => {
		if (searchParams.has('email')) setUser(searchParams.get('email') as string)
		else if (searchParams.has('username')) setUser(searchParams.get('username') as string)
		else redirect('/auth/forgot-password')
	}, [])

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setIsLoading(true)
		setError('')

		const key = isEmail(user) ? 'email' : 'username'
		const verifyCode = +(code.join(''))
	
		try {
		  const res = await fetch('http://localhost:5000/auth/set-forgotten-password', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({ [key]: user, verifyCode, newPassword }),
		  })
	
		  const data = await res.json()
		  if (data.token) {
			signIn(data.token)
			setError('')
		  } else {
			setError(data.message)
		  }
		} catch (err) {
		  setError('An error occurred during sign-in. Please try again.')
		} finally {
		  setIsLoading(false)
		}
	  } 

	return (
		<form className='mx-auto mt-16 flex flex-col gap-5' onSubmit={handleSubmit}>
			<CodeInput code={code} setCode={setCode} />
			<input
				type="password"
				placeholder='Set your new password:'
				className='py-4 px-2 w-72 outline-none transition-colors duration-500 border-b-transparent focus:border-b-white border-b-2'
				minLength={5}
				value={newPassword}
				onChange={({ target }) => SetPassword(target.value)}
			/>
			<button type="submit" className="btn btn-outline" disabled={isLoading}>
				{isLoading ? 'Signing In...' : (
					<>
						<span>Set Password</span>
						<ArrowRight size={19} className='ml-[-5px]' />
					</>
				)}
			</button>
			{error && <p className="text-red-500">{error}</p>}
		</form>
	)
}

export default SetPasswordForm
