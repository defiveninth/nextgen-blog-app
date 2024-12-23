'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function CreatePostForm() {
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [published, setPublished] = useState(false)
	const [category, setCategory] = useState('')

	const categories = [
		"Technology", "Science", "Health", "Business", "Finances", "Sports", "Entertainment",
		"Politics", "Education", "Environment", "Travel", "Food", "Fashion", "Art", "Music",
		"Literature", "History", "Philosophy", "Psychology", "Sociology", "Economics", "Law",
		"Medicine", "Engineering", "Architecture", "Design", "Marketing", "Advertising",
		"Public Relations", "Human Resources", "Management", "Entrepreneurship", "Investing",
		"Real Estate", "Cryptocurrency", "Artificial Intelligence", "Machine Learning",
		"Data Science", "Cybersecurity", "Cloud Computing", "Internet of Things", "Robotics",
		"Biotechnology", "Nanotechnology", "Space Exploration", "Renewable Energy",
		"Sustainability", "Climate Change", "Agriculture", "Nutrition"
	]

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		console.log({ title, content, published, category })
	}

	return (
		<form onSubmit={handleSubmit} className="mt-5 space-y-4 max-w-2xl mx-auto p-6 bg-background border rounded-lg">
			<h1 className="text-2xl font-bold mb-6">Create New Post</h1>
			<div>
				<Label htmlFor="title">Title</Label>
				<Input
					id="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
				/>
			</div>

			<div>
				<Label htmlFor="content">Content</Label>
				<Textarea
					id="content"
					value={content}
					onChange={(e) => setContent(e.target.value)}
					required
				/>
			</div>

			<div className="flex items-center space-x-2">
				<Switch
					id="published"
					checked={published}
					onCheckedChange={setPublished}
				/>
				<Label htmlFor="published">Draft | Publish right now</Label>
			</div>

			<div>
				<Label htmlFor="category">Category</Label>
				<select
					id="category"
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					className="w-full p-2 mt-1 bg-background border border-input rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
				>
					<option value="">Select category...</option>
					{categories.map((cat) => (
						<option key={cat} value={cat}>
							{cat}
						</option>
					))}
				</select>
			</div>

			<Button type="submit" className="w-full">Create Post</Button>
		</form>
	)
}

