'use client'

import { FormEvent, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import isEmail from '@/utils/is-email'
import toSetPassword from '@/actions/auth/to-set-password'
import { useRouter } from 'next/navigation'

const ForgotPasswordForm = () => {
	const [user, setUser] = useState('')
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsLoading(true)
		setError('')

		try {
			const key = isEmail(user) ? 'email' : 'username'

			const res = await fetch('http://localhost:5000/auth/forgot-password', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ [key]: user }),
			})

			const data = await res.json()
			if (!data.error) {
				toSetPassword(router, user)
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
			<input
				type="text"
				placeholder="Enter your email or username:"
				className="py-4 px-2 w-72 outline-none transition-colors duration-500 border-b-transparent focus:border-b-white border-b-2"
				minLength={5}
				value={user}
				onChange={({ target }) => setUser(target.value)}
			/>
			<button className="btn btn-outline" disabled={isLoading}>
				<span>Verify email</span>
				<ArrowRight size={19} className='ml-[-5px]' />
			</button>
			{error && <p className="text-red-500">{error}</p>}
		</form>
	)
}

export default ForgotPasswordForm
