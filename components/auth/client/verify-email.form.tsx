'use client'

import { ChangeEvent, useRef, KeyboardEvent, useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { redirect, useSearchParams } from 'next/navigation'

const VerifyEmailForm = () => {
	const inputsRef = useRef<(HTMLInputElement | null)[]>([])
	const [email, setEmail] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [code, setCode] = useState<string[]>(['', '', '', ''])
	const searchParams = useSearchParams()

	useEffect(() => {
		if (searchParams.has('email')) setEmail(searchParams.get('email') as string)
		else redirect('/auth/sign-up')
	}, [])

	const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
		const value = e.target.value
		if (value.match(/[0-9]/)) {
			const newCode = [...code]
			newCode[index] = value
			setCode(newCode)
			if (index < inputsRef.current.length - 1) {
				inputsRef.current[index + 1]?.focus()
			}
		} else {
			e.target.value = ''
		}
	}

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
		if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
			inputsRef.current[index - 1]?.focus()
		}
	}

	const setInputRef = (el: HTMLInputElement | null, index: number) => {
		inputsRef.current[index] = el
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsLoading(true)
		setError(null)

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
			alert('Email verified successfully!')
		} catch (err) {
			setError('Verification failed. Please try again.')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<form className='mx-auto mt-16 flex flex-col gap-5' onSubmit={handleSubmit}>
			<div className='flex gap-5'>
				{[0, 1, 2, 3].map((i) => (
					<input
						key={i}
						type="text"
						className='w-14 h-14 outline-none text-center rounded-lg focus:border-white border-2 border-transparent duration-150'
						maxLength={1}
						onChange={(e) => handleChange(e, i)}
						onKeyDown={(e) => handleKeyDown(e, i)}
						ref={(el) => setInputRef(el, i)}
					/>
				))}
			</div>
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
