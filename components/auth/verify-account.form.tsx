'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from '@/hooks/use-toast'
import useActivateAccount from '@/actions/auth/activate-account'
import { Loader } from 'lucide-react'

export default function VerifyAccountForm() {
	const { verifyToken }: { verifyToken: string } = useParams()
	const { activateAccount, isLoading, error } = useActivateAccount()
	const [newPassword, setNewPassword] = useState('123456789')
	const [confirmPassword, setConfirmPassword] = useState('123456789')
	const [name, setName] = useState('Sakenov Abdurrauf')

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		const success = await activateAccount(verifyToken, name, newPassword)

		if (success) {
			toast({
				title: 'Success!',
				description: 'Your account has been verified and updated.',
			})
		} else if (error) {
			toast({
				title: 'Error',
				description: error,
				variant: 'destructive',
			})
		}
	}

	return (
		<div className="container mx-auto py-10">
			<Card className="w-full max-w-md mx-auto">
				<CardHeader>
					<CardTitle>Verify Account</CardTitle>
					<CardDescription>Complete your account setup</CardDescription>
				</CardHeader>
				<form onSubmit={handleSubmit}>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="name">Full Name</Label>
							<Input
								id="name"
								type="text"
								placeholder="Enter your full name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="newPassword">New Password</Label>
							<Input
								id="newPassword"
								type="password"
								placeholder="Enter your new password"
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="confirmPassword">Confirm Password</Label>
							<Input
								id="confirmPassword"
								type="password"
								placeholder="Confirm your new password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
							/>
						</div>
					</CardContent>
					<CardFooter>
						<Button type="submit" className="w-full" disabled={isLoading || !newPassword || !confirmPassword || !name}>
							{isLoading ? <>
								<Loader className='animate-spin' />
								<span>Validating...</span>
							</> : 'Verify Account'}
						</Button>
					</CardFooter>
				</form>
			</Card>
		</div>
	)
}
