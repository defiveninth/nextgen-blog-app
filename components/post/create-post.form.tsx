'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from "@/lib/utils"

export default function CreatePostForm() {
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [published, setPublished] = useState(false)
	const [category, setCategory] = useState('')
	const [openCategory, setOpenCategory] = useState(false)

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
		<form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6 bg-background shadow-lg rounded-lg">
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
					className="min-h-[200px]"
				/>
			</div>

			<div className="flex items-center space-x-2">
				<Switch
					id="published"
					checked={published}
					onCheckedChange={setPublished}
				/>
				<Label htmlFor="published">Published</Label>
			</div>

			<div>
				<Label>Category</Label>
				<Popover open={openCategory} onOpenChange={setOpenCategory}>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							role="combobox"
							aria-expanded={openCategory}
							className="w-full justify-between"
						>
							{category || "Select category..."}
							<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-full p-0">
						<Command>
							<CommandInput placeholder="Search category..." />
							<CommandEmpty>No category found.</CommandEmpty>
							<CommandGroup>
								{categories.map((cat) => (
									<CommandItem
										key={cat}
										onSelect={(currentValue) => {
											setCategory(currentValue === category ? "" : currentValue)
											setOpenCategory(false)
										}}
									>
										<Check
											className={cn(
												"mr-2 h-4 w-4",
												category === cat ? "opacity-100" : "opacity-0"
											)}
										/>
										{cat}
									</CommandItem>
								))}
							</CommandGroup>
						</Command>
					</PopoverContent>
				</Popover>
			</div>

			<Button type="submit" className="w-full">Create Post</Button>
		</form>
	)
}

