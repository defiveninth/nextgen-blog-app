'use client'

import useCategories from '@/actions/categories/get-all'
import useCreatePost from '@/actions/post/create'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'

export default function CreatePostForm() {
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [published, setPublished] = useState(false)
	const [category, setCategory] = useState('')

	const { categories, isLoading: loadingCategories, error: categoriesError } = useCategories()
	const { isLoading: creatingPost, error: postError, createPost } = useCreatePost()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		await createPost({ title, content, published, category })
		setTitle('')
		setContent('')
		setPublished(false)
		setCategory('')
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="mt-5 space-y-4 max-w-2xl mx-auto p-6 bg-background border rounded-lg mb-10"
		>
			<h1 className="text-2xl font-bold mb-4">Create New Post</h1>

			{postError && <p className="text-red-500">{postError}</p>}

			<div>
				<Label htmlFor="title">Title</Label>
				<Input
					id="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
					placeholder="Write a headline that grabs attention..."
				/>
			</div>

			<div>
				<Label htmlFor="content">Content</Label>
				<Textarea
					id="content"
					value={content}
					onChange={(e) => setContent(e.target.value)}
					required
					placeholder="Let your words flow—start your masterpiece here..."
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
				{loadingCategories ? (
					<p>Loading categories...</p>
				) : categoriesError ? (
					<p className="text-red-500">{categoriesError}</p>
				) : (
					<select
						id="category"
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						className="w-full p-2 mt-1 bg-background border border-input rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
					>
						<option value="">Select category...</option>
						{categories.map((cat) => (
							<option key={cat.id} value={cat.name}>
								{cat.name}
							</option>
						))}
					</select>
				)}
			</div>

			<Button type="submit" className="w-full" disabled={creatingPost}>
				{creatingPost ? 'Creating Post...' : 'Create Post'}
			</Button>
		</form>
	)
}
