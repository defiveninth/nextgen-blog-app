import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function CommentSkeleton() {
	return (
		<Card className="mb-4">
			<CardHeader className="flex flex-row items-center gap-4 pb-2">
				<Skeleton className="h-10 w-10 rounded-full" />
				<div className="flex flex-col gap-2">
					<Skeleton className="h-4 w-24" />
					<Skeleton className="h-3 w-16" />
				</div>
			</CardHeader>
			<CardContent>
				<Skeleton className="h-4 w-full mb-2" />
				<Skeleton className="h-4 w-2/3" />
				<Skeleton className="h-3 w-24 mt-2" />
			</CardContent>
		</Card>
	)
}

