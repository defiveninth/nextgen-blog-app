import { ArrowRight } from 'lucide-react'

const SignUpForm = () => {
	return (
		<form className='mx-auto mt-16 flex flex-col gap-5'>
			<input
				type="text"
				placeholder="Enter your email:"
				className="py-4 px-2 w-72 outline-none transition-colors duration-500 border-b-transparent focus:border-b-white border-b-2"
			/>
			<button className="btn btn-outline">
				<span>Verify email</span>
				<ArrowRight size={19} className='ml-[-5px]' />
			</button>
		</form>
	)
}

export default SignUpForm