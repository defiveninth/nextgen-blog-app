'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import signIn from '@/actions/auth/sign-in'

const SignInForm = () => {
  const [formData, setFormData] = useState({ eu: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const res = await fetch('http://localhost:5000/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.eu, password: formData.password }),
      })

      const data = await res.json()
      if (data.user) {
        signIn(data.user.token)
      } else {
        setError(data.message)
        console.error('Sign-in failed:', data.message)
      }
    } catch (err) {
      setError('An error occurred during sign-in. Please try again.')
      console.error('Sign-in error:', err)
    } finally {
      setIsLoading(false)
    }
  } 

  return (
    <form onSubmit={handleSubmit} className='mx-auto mt-16 flex flex-col gap-5'>
      <input
        type="text"
        name="eu"
        placeholder="Enter your email or username:"
        value={formData.eu}
        onChange={handleChange}
        className="py-4 px-2 w-72 outline-none transition-colors duration-500 border-b-transparent focus:border-b-white border-b-2"
      />
      <input
        type="password"
        name="password"
        placeholder="Enter your password:"
        value={formData.password}
        onChange={handleChange}
        className="py-4 px-2 w-72 outline-none transition-colors duration-500 border-b-transparent focus:border-b-white border-b-2"
      />
      <button type="submit" className="btn btn-outline" disabled={isLoading}>
        {isLoading ? 'Signing In...' : (
          <>
            <span>Sign In</span>
            <ArrowRight size={19} className='ml-[-5px]' />
          </>
        )}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  )
}

export default SignInForm
