'use client'

import { useState, useEffect, FormEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import { redirect, useSearchParams } from 'next/navigation'
import signIn from '@/actions/auth/sign-in'
import CodeInput from '../code-input'

const VerifyEmailForm = () => {
	const [email, setEmail] = useState('')
	const [code, setCode] = useState<string[]>(['', '', '', ''])
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const searchParams = useSearchParams()

	useEffect(() => {
		if (searchParams.has('email')) setEmail(searchParams.get('email') as string)
		else redirect('/auth/sign-up')
	}, [])

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsLoading(true)
		setError(null)

		if (code.some(c => c === '')) {
			setError('Verify Code is Required')
			setIsLoading(false)
			return
		}

		const verifyCode = +(code.join(''))

		try {
			const response = await fetch('http://localhost:5000/auth/verify-account', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, verifyCode }),
			})

			if (!response.ok) {
				throw new Error('Verification failed')
			}

			const data = await response.json()
			signIn(data.user.token)
		} catch (err) {
			setError('Verification failed. Please try again.')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<form className='mx-auto mt-16 flex flex-col gap-5' onSubmit={handleSubmit}>
			<CodeInput code={code} setCode={setCode} />
			{error && <p className="text-red-500">{error}</p>}
			<button type="submit" className="btn btn-outline" disabled={isLoading}>
				{isLoading ? 'Verifying...' : (
					<>
						<span>Get Verified</span>
						<ArrowRight size={19} className='ml-[-5px]' />
					</>
				)}
			</button>
		</form>
	)
}

export default VerifyEmailForm
