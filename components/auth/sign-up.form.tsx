'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import useCreateAccount from '@/actions/auth/create-account'
import { Loader } from 'lucide-react'

export default function SignUpForm() {
	const [email, setEmail] = useState('misterfighter1990@gmail.com')
	const [acceptTerms, setAcceptTerms] = useState(false)
	const router = useRouter()
	const { isLoading, createAccount } = useCreateAccount()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		const { success, error } = await createAccount(email)

		if (success) {
			toast({
				title: 'Success!',
				description: 'Your sign-up request has been submitted. Please check your email to verify your account.',
			})
			setEmail('')
			setAcceptTerms(false)
		} else if (error) {
			toast({
				title: 'Error',
				description: error,
				variant: 'destructive',
			})
		}
	}

	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader>
				<CardTitle>Sign Up</CardTitle>
				<CardDescription>Join our political campaign today.</CardDescription>
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
							disabled={isLoading}
						/>
					</div>
					<div className="flex items-center space-x-2">
						<Checkbox
							id="terms"
							checked={acceptTerms}
							onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
							required
							disabled={isLoading}
						/>
						<Label htmlFor="terms" className="text-sm">
							I accept the political terms and conditions
						</Label>
					</div>
				</CardContent>
				<CardFooter className="flex flex-col gap-5">
					<Button
						type="submit"
						className="w-full"
						disabled={!acceptTerms || !email || isLoading}
					>
						{isLoading ? <>
							<Loader className='animate-spin' />
							<span>Validating...</span>
						</> : 'Sign Up'}
					</Button>
					<Button
						type="button"
						className="w-full"
						variant={'outline'}
						onClick={() => router.push('/auth/sign-in')}
						disabled={isLoading}
					>
						I already have an account
					</Button>
				</CardFooter>
			</form>
		</Card>
	)
}
