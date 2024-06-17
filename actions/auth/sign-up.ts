'use server'

import { redirect } from 'next/navigation'

const signUp = (email: string) => {
	redirect(`/auth/verify?email=${email}`)
}

export default signUp