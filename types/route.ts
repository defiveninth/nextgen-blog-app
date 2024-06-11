import { LucideProps } from 'lucide-react'
import { ForwardRefExoticComponent, RefAttributes } from 'react'


interface IRoute {
	name: string
	icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
	path: string
}

export default IRoute