interface HeadingProps {
	title: string
}

function Heading({ title }: HeadingProps) {
  return (
	<h2 className='text-2xl font-semibold mb-1 mt-5'>{ title }</h2>
  )
}

export default Heading