import { ArrowRight } from 'lucide-react'

const SignInForm = () => {
  return (
    <form className='mx-auto mt-16 flex flex-col gap-5'>
      <input
        type="text"
        placeholder="Enter your email or username:"
        className="py-4 px-2 w-72 outline-none transition-colors duration-500 border-b-transparent focus:border-b-white border-b-2"
      />
      <input
        type="password"
        placeholder="Enter your password:"
        className="py-4 px-2 w-72 outline-none transition-colors duration-500 border-b-transparent focus:border-b-white border-b-2"
      />
      <button className="btn btn-outline">
        <span>Sign In</span>
        <ArrowRight size={19} className='ml-[-5px]' />
      </button>
    </form>
  )
}

export default SignInForm