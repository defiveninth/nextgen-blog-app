import { ChangeEvent, KeyboardEvent, useRef } from 'react'

interface CodeInputProps {
	code: string[]
	setCode: (code: string[]) => void
}

const CodeInput = ({ code, setCode }: CodeInputProps) => {
	const inputsRef = useRef<(HTMLInputElement | null)[]>([])

	const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
		const value = e.target.value
		if (value.match(/[0-9]/)) {
			const newCode = [...code]
			newCode[index] = value
			setCode(newCode)
			if (index < inputsRef.current.length - 1) {
				inputsRef.current[index + 1]?.focus()
			}
		} else {
			e.target.value = ''
		}
	}

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
		if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
			inputsRef.current[index - 1]?.focus()
		}
	}

	const setInputRef = (el: HTMLInputElement | null, index: number) => {
		inputsRef.current[index] = el
	}

	return (
		<div className='flex gap-5'>
			{[0, 1, 2, 3].map((i) => (
				<input
					key={i}
					type="text"
					className='w-14 h-14 outline-none text-center rounded-lg focus:border-white border-2 border-transparent duration-150'
					maxLength={1}
					onChange={(e) => handleChange(e, i)}
					onKeyDown={(e) => handleKeyDown(e, i)}
					ref={(el) => setInputRef(el, i)}
				/>
			))}
		</div>
	)
}

export default CodeInput
