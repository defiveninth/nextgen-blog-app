import SignInForm from '@/components/auth/sign-in.form'
import { Header } from '@/components/common/header'

export default function SignInPage() {
	return (
		<>
			<Header />
			<div className='min-h-screen flex justify-center items-center'>
				<SignInForm />
			</div>
		</>
	)
}
