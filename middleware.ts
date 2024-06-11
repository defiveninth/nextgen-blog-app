import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import IsAuthorized from './utils/is-authorized'

export function middleware(request: NextRequest) {
	if (request.nextUrl.pathname.startsWith('/auth') && IsAuthorized()) return NextResponse.redirect(new URL('/', request.url))
}
