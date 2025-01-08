'use client'

import { useParams } from 'next/navigation'
import { useUserProfile } from '@/actions/users/profile'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"

export default function UserProfile() {
	const { id } = useParams()
	const { user, isLoading, isError } = useUserProfile(id as string)

	if (isLoading) {
		return (
			<div className="container mx-auto p-4">
				{  }
				<Card>
					<CardHeader>
						<Skeleton className="h-8 w-[250px]" />
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							<Skeleton className="h-4 w-[200px]" />
							<Skeleton className="h-4 w-[150px]" />
							<Skeleton className="h-4 w-[150px]" />
						</div>
					</CardContent>
				</Card>
			</div>
		)
	}

	if (isError) {
		return (
			<div className="container mx-auto p-4">
				<Card>
					<CardHeader>
						<CardTitle className="text-red-500">Error</CardTitle>
					</CardHeader>
					<CardContent>
						<p>Failed to load user profile. Please try again later.</p>
					</CardContent>
				</Card>
			</div>
		)
	}

	if (!user) {
		return (
			<div className="container mx-auto p-4">
				<Card>
					<CardHeader>
						<CardTitle>User Not Found</CardTitle>
					</CardHeader>
					<CardContent>
						<p>The requested user profile could not be found.</p>
					</CardContent>
				</Card>
			</div>
		)
	}

	return (
		<div className="container mx-auto p-4">
			<Card>
				<CardHeader className="flex flex-row items-center gap-4">
					<Avatar className="h-16 w-16">
						<AvatarImage src={user.avatar || undefined} alt={user.name || user.username || 'User avatar'} />
						<AvatarFallback>{user.name?.[0] || user.username?.[0] || 'U'}</AvatarFallback>
					</Avatar>
					<div>
						<CardTitle>{user.name || user.username || 'Anonymous User'}</CardTitle>
						{user.username && <p className="text-sm text-muted-foreground">@{user.username}</p>}
					</div>
				</CardHeader>
				<CardContent>
					<div className="space-y-2">
						<p><strong>Email:</strong> {user.email}</p>
						<p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
						{user.isThisMe && <p className="text-blue-500 font-semibold">This is you!</p>}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

