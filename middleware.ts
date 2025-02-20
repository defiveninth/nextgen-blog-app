import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
	const ISAUTHORIZED = request.cookies.has('authtoken')

	if (request.nextUrl.pathname.startsWith('/auth') && ISAUTHORIZED) {
		return NextResponse.redirect(new URL('/', request.url))
	}

	if (request.nextUrl.pathname.startsWith('/settings') && !ISAUTHORIZED) {
		return NextResponse.redirect(new URL('/', request.url))
	}

	NextResponse.next()
}