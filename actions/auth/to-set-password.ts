import isEmail from '@/utils/is-email'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

const toSetPassword = (router: AppRouterInstance, user: string) => {
	const userType = isEmail(user)
	router.push(`/auth/set-password?${userType ? 'email' : 'username'}=${user}`)
}

export default toSetPassword
