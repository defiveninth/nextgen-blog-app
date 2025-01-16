'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import useSearchUsers from '@/actions/users/search'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function SearchUser() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const query = searchParams.get('query') || ''
	const [searchTerm, setSearchTerm] = useState(query)
	const [hasSearched, setHasSearched] = useState(false)
	const { users, loading, error, searchUsers } = useSearchUsers()

	useEffect(() => {
		if (query && !loading) {
			searchUsers(query)
		}
	}, [query])

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault()
		if (searchTerm.trim() !== '') {
			setHasSearched(true)
			router.push(`/search?query=${encodeURIComponent(searchTerm)}`)
		}
	}

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Search Users</h1>
			<form onSubmit={handleSearch} className="mb-4 flex gap-2">
				<Input
					type="text"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					placeholder="Enter search query"
					className="flex-grow"
				/>
				<Button type="submit">Search</Button>
			</form>

			{loading && <p>Loading...</p>}
			{error && <p className="text-red-500">{error}</p>}

			{hasSearched && !loading && (
				users && users.length > 0 ? (
					<ul className="space-y-2">
						{users.map((user) => (
							<li key={user.id} className="border rounded-lg p-5">
								<Link href={`/users/${user.id}`} className="font-semibold">{user.name}</Link>
								<p className="text-sm text-gray-600">@{user.username}</p>
								<p className="text-sm">{user.email}</p>
							</li>
						))}
					</ul>
				) : (
					<p>No users found.</p>
				)
			)}
		</div>
	)
}

