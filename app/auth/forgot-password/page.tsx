import ForgotPasswordForm from '@/components/auth/forgot-password.form'
import { Header } from '@/components/common/header'

export default function ForgotPasswordPage() {
	return (
		<>
			<Header />
			<div className='min-h-screen flex justify-center items-center'>
				<ForgotPasswordForm />
			</div>
		</>
	)
}
