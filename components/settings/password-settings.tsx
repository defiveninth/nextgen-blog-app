'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useChangePassword } from '@/actions/settings/change-password'

export default function ChangePasswordForm() {
	const [currentPassword, setCurrentPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const { loading, error, message, changePassword } = useChangePassword()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (newPassword !== confirmPassword) {
			alert("New password and confirmation do not match!")
			return
		}

		await changePassword(currentPassword, newPassword)
	}

	return (
		<Card className="w-full max-w-2xl mx-auto">
			<CardHeader>
				<CardTitle>Change Password</CardTitle>
				<CardDescription>Enter your current password and choose a new one</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4" id='passwordForm'>
					<div className="space-y-2">
						<Label htmlFor="current-password">Current Password</Label>
						<Input
							id="current-password"
							type="password"
							value={currentPassword}
							onChange={(e) => setCurrentPassword(e.target.value)}
							required
							placeholder="Something you have..."
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="new-password">New Password</Label>
						<Input
							id="new-password"
							type="password"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							required
							placeholder="Something you want..."
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="confirm-password">Confirm New Password</Label>
						<Input
							id="confirm-password"
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
							placeholder="Something you wrote..."
						/>
					</div>
					{error && (
						<Alert variant="destructive">
							<AlertCircle className="h-4 w-4" />
							<AlertDescription>{error}</AlertDescription>
						</Alert>
					)}
					{message && (
						<Alert className="bg-green-100 text-green-800 border-green-300">
							<AlertDescription>{message || 'Password changed successfully!'}</AlertDescription>
						</Alert>
					)}
				</form>
			</CardContent>
			<CardFooter>
				<Button form='passwordForm' type="submit" variant={'outline'} className="w-full" disabled={loading}>
					{loading ? 'Changing...' : 'Change Password'}
				</Button>
			</CardFooter>
		</Card>
	)
}
