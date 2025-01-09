'use client'

import { useState, useEffect } from 'react'
import { useMyPublicSettings } from '@/actions/settings/public-settings'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, Loader2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useCheckUsername } from '@/actions/settings/username-check'

export default function PublicDataSettings() {
	const { settings, isLoading, isError } = useMyPublicSettings()
	const { check: checkUsername, isLoading: isChecking, isAvailable, error: checkError } = useCheckUsername()

	const [formData, setFormData] = useState({
		name: '',
		username: '',
		email: '',
		avatar: '',
	})
	const [isSaving, setIsSaving] = useState(false)
	const [saveError, setSaveError] = useState<string | null>(null)
	const [saveSuccess, setSaveSuccess] = useState(false)

	useEffect(() => {
		if (settings) {
			setFormData({
				name: settings.name || '',
				username: settings.username || '',
				email: settings.email || '',
				avatar: settings.avatar || '',
			})
		}
	}, [settings])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))

		if (name === 'username' && value !== settings?.username) {
			checkUsername(value)
		}
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsSaving(true)
		setSaveError(null)
		setSaveSuccess(false)

		try {
			const response = await fetch('/api/settings', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			})

			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.error || 'Failed to update settings')
			}

			setSaveSuccess(true)
		} catch (error) {
			console.error('Error updating settings:', error)
			setSaveError(error instanceof Error ? error.message : 'An unknown error occurred')
		} finally {
			setIsSaving(false)
		}
	}

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-64">
				<Loader2 className="h-8 w-8 animate-spin" />
			</div>
		)
	}

	if (isError) {
		return (
			<Alert variant="destructive">
				<AlertCircle className="h-4 w-4" />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>Failed to load user settings. Please try again later.</AlertDescription>
			</Alert>
		)
	}

	return (
		<Card className="w-full max-w-2xl mx-auto">
			<CardHeader>
				<CardTitle>User Settings</CardTitle>
				<CardDescription>Update your personal information</CardDescription>
			</CardHeader>
			<form onSubmit={handleSubmit}>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							name="name"
							value={formData.name}
							onChange={handleInputChange}
							placeholder="Your name"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="username">Username</Label>
						<Input
							id="username"
							name="username"
							value={formData.username}
							onChange={handleInputChange}
							placeholder="Your username"
						/>
						{formData.username !== settings?.username && (
							<small
								className={`text-sm ${isChecking
										? 'text-gray-600'
										: isAvailable
											? 'text-green-600'
											: checkError
												? 'text-red-600'
												: 'text-red-600'
									}`}
							>
								{isChecking
									? 'Checking availability...'
									: isAvailable
										? 'Username is available!'
										: checkError
											? 'Error checking username availability.'
											: 'Username is already taken.'}
							</small>
						)}

					</div>
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							name="email"
							type="email"
							value={formData.email}
							onChange={handleInputChange}
							placeholder="Your email"
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="avatar">Avatar URL</Label>
						<Input
							id="avatar"
							name="avatar"
							value={formData.avatar}
							onChange={handleInputChange}
							placeholder="https://example.com/avatar.jpg"
						/>
					</div>
				</CardContent>
				<CardFooter className="flex flex-col items-start space-y-4">
					{saveError && (
						<Alert variant="destructive" className="w-full">
							<AlertCircle className="h-4 w-4" />
							<AlertTitle>Error</AlertTitle>
							<AlertDescription>{saveError}</AlertDescription>
						</Alert>
					)}
					{saveSuccess && (
						<Alert variant="default" className="w-full bg-green-50 text-green-800 border-green-300">
							<AlertTitle>Success</AlertTitle>
							<AlertDescription>Your settings have been updated successfully.</AlertDescription>
						</Alert>
					)}
					<Button type="submit" disabled={isSaving} className="w-full">
						{isSaving ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Saving...
							</>
						) : (
							'Save Changes'
						)}
					</Button>
				</CardFooter>
			</form>
		</Card>
	)
}
