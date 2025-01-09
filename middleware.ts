import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
	const isAuthorized: boolean = request.cookies.has('authtoken')

	if (request.nextUrl.pathname.startsWith('/auth') && isAuthorized) {
		return NextResponse.redirect(new URL('/', request.url))
	}

	if (request.nextUrl.pathname.startsWith('/settings') && !isAuthorized) {
		return NextResponse.redirect(new URL('/', request.url))
	}

	NextResponse.next()
}