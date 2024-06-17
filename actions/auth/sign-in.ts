'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const signIn = (token: string) => {
	cookies().set('token', token)
	redirect('/')
}

export default signIn