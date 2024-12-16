import SignUpForm from '@/components/auth/sign-up.form'
import { Header } from '@/components/common/header'

export default function SignUpPage() {
	return (
		<>
			<Header />
			<div className='min-h-screen flex justify-center items-center'>
				<SignUpForm />
			</div>
		</>
	)
}
