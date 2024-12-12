'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const navigation = [
	{ name: 'Home', href: '/' },
	{
		name: 'Categories',
		href: '#',
		children: [
			{ name: 'Technology', href: '/category/technology' },
			{ name: 'Travel', href: '/category/travel' },
			{ name: 'Food', href: '/category/food' },
		],
	},
	{ name: 'About', href: '/about' },
	{ name: 'Contact', href: '/contact' },
]

export function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const router = useRouter()

	return (
		<header className="bg-white shadow">
			<nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
				<div className="flex w-full items-center justify-between border-b border-indigo-500 py-6 lg:border-none">
					<div className="flex items-center">
						<Link href="/">
							<span className="sr-only">My NextJs Blog</span>
							<img
								className="h-5 w-auto"
								src="/next.svg"
								alt="Logo"
							/>
						</Link>
						<div className="ml-10 hidden space-x-8 lg:flex">
							{navigation.map((item) => (
								<NavItem key={item.name} item={item} />
							))}
						</div>
					</div>
					<div className="ml-10 space-x-4">
						<Button variant="outline" className="hidden lg:inline-block" onClick={() => router.push('/auth/sign-in')}>
							Sign in
						</Button>
						<Button className="hidden lg:inline-block" onClick={() => router.push('/auth/sign-up')}>Sign up</Button>
					</div>
					<div className="flex lg:hidden">
						<Button
							variant="ghost"
							className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
							onClick={() => setMobileMenuOpen(true)}
						>
							<span className="sr-only">Open main menu</span>
							<Menu className="h-6 w-6" aria-hidden="true" />
						</Button>
					</div>
				</div>
			</nav>
			{mobileMenuOpen && (
				<MobileMenu onClose={() => setMobileMenuOpen(false)} />
			)}
		</header>
	)
}

function NavItem({ item }: { item: typeof navigation[0] }) {
	const [isOpen, setIsOpen] = useState(false)

	if (item.children) {
		return (
			<div className="relative">
				<button
					className="text-base font-medium text-gray-500 hover:text-gray-900"
					onClick={() => setIsOpen(!isOpen)}
				>
					{item.name}
				</button>
				{isOpen && (
					<div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
						<div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
							{item.children.map((child) => (
								<Link
									key={child.name}
									href={child.href}
									className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
									role="menuitem"
								>
									{child.name}
								</Link>
							))}
						</div>
					</div>
				)}
			</div>
		)
	}

	return (
		<Link
			href={item.href}
			className="text-base font-medium text-gray-500 hover:text-gray-900"
		>
			{item.name}
		</Link>
	)
}

function MobileMenu({ onClose }: { onClose: () => void }) {
	return (
		<div className="lg:hidden" role="dialog" aria-modal="true">
			<div className="fixed inset-0 z-10" />
			<div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
				<div className="flex items-center justify-between">
					<Link href="/" className="-m-1.5 p-1.5">
						<span className="sr-only">My NextJs Blog</span>
						<img
							className="h-4 w-auto"
							src="/next.svg"
							alt="Logo"
						/>
					</Link>
					<Button variant="ghost" onClick={onClose}>
						<span className="sr-only">Close menu</span>
						<X className="h-6 w-6" aria-hidden="true" />
					</Button>
				</div>
				<div className="mt-6 flow-root">
					<div className="-my-6 divide-y divide-gray-500/10">
						<div className="space-y-2 py-6">
							{navigation.map((item) => (
								<MobileNavItem key={item.name} item={item} />
							))}
						</div>
						<div className="py-6">
							<Button variant="outline" className="w-full mb-2">Sign in</Button>
							<Button className="w-full">Sign up</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

function MobileNavItem({ item }: { item: typeof navigation[0] }) {
	const [isOpen, setIsOpen] = useState(false)

	if (item.children) {
		return (
			<div>
				<button
					className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
					onClick={() => setIsOpen(!isOpen)}
				>
					{item.name}
					<svg
						className={`h-5 w-5 flex-none ${isOpen ? 'rotate-180' : ''}`}
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fillRule="evenodd"
							d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
				{isOpen && (
					<div className="mt-2 space-y-2">
						{item.children.map((child) => (
							<Link
								key={child.name}
								href={child.href}
								className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
							>
								{child.name}
							</Link>
						))}
					</div>
				)}
			</div>
		)
	}

	return (
		<Link
			href={item.href}
			className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
		>
			{item.name}
		</Link>
	)
}

