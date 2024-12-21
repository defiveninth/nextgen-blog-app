import { cookies } from 'next/headers'

export async function GET() {
	const cookieStore = await cookies()

	const token = cookieStore.get('authtoken')?.value
	if (!token) {
		return new Response(JSON.stringify({ error: 'No access token found' }), {
			status: 401,
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}

	return new Response(JSON.stringify({
		message: 'get token successfully',
		token: token
	}), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	})
}