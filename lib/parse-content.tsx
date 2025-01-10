import React from 'react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

export function parseContent(content: string) {
	const words = content.split(/\s+/)
	const router = useRouter()

	return words.map((word, index) => {
		if (word.startsWith('#')) {
			return (
				<Button
					key={index}
					variant="link"
					className="p-0 h-auto font-normal text-blue-500 hover:text-blue-700 mr-1"
					onClick={() => router.push(`/tags/${word.slice(1)}`)}
				>
					{word}
				</Button>
			)
		}
		return <React.Fragment key={index}>{word} </React.Fragment>
	})
}

