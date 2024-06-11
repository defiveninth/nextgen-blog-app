import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import IsAuthorized from './utils/is-authorized'

export function middleware(request: NextRequest) {
	const path: string = request.nextUrl.pathname
	const auth: boolean = IsAuthorized()

	if (
		path.startsWith("/_next") ||
		path.startsWith('/news') ||
		path.startsWith('/terms-of-use')
	) return NextResponse.next()

	if (path.startsWith('/auth') && auth) {
		return NextResponse.redirect(new URL('/', request.url))
	}
	if (!path.startsWith('/auth') && !auth) {
		return NextResponse.redirect(new URL('/auth', request.url))
	}

	return NextResponse.next()
}