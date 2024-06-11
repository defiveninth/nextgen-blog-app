import Link from 'next/link'
import IRoute from '@/types/route'

function Routing({ route }: { route: Array<IRoute> }) {
	return (
		<div className="text-sm breadcrumbs">
			<ul>
				{
					route.map(r => (
						<li>
							<Link href={r.path} className='font-medium'>
								<r.icon size={15} className='mr-2' />
								<span>{r.name}</span>
							</Link>
						</li>
					))
				}
			</ul>
		</div>
	)
}

export default Routing