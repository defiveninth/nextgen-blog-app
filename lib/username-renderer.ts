function validateUsername(str: string, maxLength: number) {
	if (str.length <= maxLength) return str
	const visibleChars = Math.min(6, maxLength)
	return str.slice(0, visibleChars) + '...'
}

export default validateUsername