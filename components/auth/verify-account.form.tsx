'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from '@/hooks/use-toast'

export default function VerifyAccountForm() {
	const [newPassword, setNewPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [name, setName] = useState('')
	const [age, setAge] = useState('')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (!newPassword || !confirmPassword || !name || !age) {
			toast({
				title: "Error",
				description: "Please fill in all fields.",
				variant: "destructive",
			})
			return
		}
		if (newPassword !== confirmPassword) {
			toast({
				title: "Error",
				description: "Passwords do not match.",
				variant: "destructive",
			})
			return
		}
		if (isNaN(Number(age)) || Number(age) <= 0) {
			toast({
				title: "Error",
				description: "Please enter a valid age.",
				variant: "destructive",
			})
			return
		}
		// Here you would typically send the data to your backend for account verification
		console.log('Form submitted:', { newPassword, name, age })
		toast({
			title: "Success!",
			description: "Your account has been verified and updated.",
		})
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
							<Label htmlFor="age">Age</Label>
							<Input
								id="age"
								type="number"
								placeholder="Enter your age"
								value={age}
								onChange={(e) => setAge(e.target.value)}
								required
								min="1"
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
						<Button type="submit" className="w-full">Verify Account</Button>
					</CardFooter>
				</form>
			</Card>
		</div>
	)
}

