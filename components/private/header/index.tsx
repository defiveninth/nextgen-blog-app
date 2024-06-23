import LeftSide from './left-side'
import RightSide from './right-side'

const Header = () => {
	return (
		<header className='flex justify-center'>
			<div className='container mt-5 flex items-center justify-between'>
				<LeftSide />
				<RightSide />
			</div>
		</header>
	)
}

export default Header