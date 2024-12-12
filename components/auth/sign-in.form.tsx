'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

export default function SignInForm() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const router = useRouter()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (!email || !password) {
			toast({
				title: "Error",
				description: "Please fill in all fields.",
				variant: "destructive",
			})
			return
		}
		console.log('Form submitted:', { email, password })
		toast({
			title: "Success!",
			description: "Sign-in attempt recorded.",
		})
	}

	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader>
				<CardTitle>Sign In</CardTitle>
				<CardDescription>Access your account</CardDescription>
			</CardHeader>
			<form onSubmit={handleSubmit}>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="Enter your email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							type="password"
							placeholder="Enter your password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<div className="text-right">
						<Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:underline">
							Forgot password?
						</Link>
					</div>
				</CardContent>
				<CardFooter className='flex flex-col gap-5'>
					<Button type="submit" className="w-full">Sign In</Button>
					<Button variant={'outline'} className="w-full" type='button' onClick={() => router.push('/auth/sign-up')}>Create account</Button>
				</CardFooter>
			</form>
		</Card>
	)
}

