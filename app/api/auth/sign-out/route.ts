import { cookies } from 'next/headers'

export async function GET(_request: Request) {
	const cookieStore = await cookies()

	cookieStore.delete('authtoken')

	return new Response(null, {
		status: 307,
		headers: {
			Location: '/auth/sign-in'
		}
	})
}