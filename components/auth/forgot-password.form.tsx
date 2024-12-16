import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ForgotPasswordForm() {
	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader>
				<CardTitle>Forgot Password</CardTitle>
				<CardDescription>Enter your email to reset your password</CardDescription>
			</CardHeader>
			<form>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="Enter your email"
							required
						/>
					</div>
				</CardContent>
				<CardFooter className="flex flex-col space-y-4">
					<Button type="submit" className="w-full">Reset Password</Button>
					<Link href="/auth/sign-in" className="text-sm text-blue-600 hover:underline">
						Back to Sign In
					</Link>
				</CardFooter>
			</form>
		</Card>
	)
}

