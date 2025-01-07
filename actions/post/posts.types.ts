export interface Author {
	id: string
	name: string
	username: string | null
}

export interface Tag {
	name: string
}

export interface Category {
	id: string
	name: string
}

export interface Post {
	id: string
	title: string
	content: string
	published: boolean
	createdAt: string
	updatedAt: string
	viewCount: number
	author: Author
	tags: Tag[]
	category: Category | null
}
