import VerifyAccountForm from '@/components/auth/verify-account.form'
import { Header } from '@/components/common/header'

export default function VerifyAccountPage() {
	return (
		<>
			<Header />
			<div className='min-h-screen flex justify-center items-center'>
				<VerifyAccountForm />
			</div>
		</>
	)
}

