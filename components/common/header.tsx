'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, ChevronDown, LogOut, User, Settings, HomeIcon, Rss, ChartBarStacked } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ModeToggle } from '../theme/switch'
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet"

export function Header() {
	const [searchValue, setSearchValue] = useState('')
	const isAuthenticated = true

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="mx-auto max-w-[1080px] px-4">
				<div className="flex h-14 items-center justify-between">
					{/* Mobile Header */}
					<div className="flex md:hidden items-center justify-between w-full">
						<Link href="/" className="flex items-center space-x-2">
							<div className="h-6 w-6 bg-blue-500 rounded-md" />
							<span className="font-bold">NextGen</span>
						</Link>

						<div className="flex items-center space-x-4">
							<Sheet>
								<SheetTrigger asChild>
									<Button variant="ghost" size="icon" className="text-muted-foreground">
										<Search className="h-5 w-5" />
									</Button>
								</SheetTrigger>
								<SheetContent side="top" className="h-32">
									<div className="h-full flex items-center justify-center px-4">
										<div className="relative w-full max-w-md">
											<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
											<input
												className="w-full rounded-md border border-input bg-background px-10 py-2 text-sm"
												placeholder="Search applications"
											/>
										</div>
									</div>
								</SheetContent>
							</Sheet>

							{isAuthenticated ? (
								<Sheet>
									<SheetTrigger asChild>
										<Button variant="ghost" className="flex items-center space-x-1 px-2">
											<span>@defive...</span>
											<ChevronDown className="h-4 w-4" />
										</Button>
									</SheetTrigger>
									<SheetContent side="bottom" className="h-auto">
										<SheetHeader>
											<SheetTitle className="text-left">NextGen</SheetTitle>
										</SheetHeader>
										<div className="mt-4 space-y-4 mb-5">
											<Button variant="ghost" className="w-full justify-start" onClick={() => { }}>
												<HomeIcon className="mr-2 h-5 w-5" />
												Home
											</Button>
											<Button
												variant="ghost"
												className="w-full justify-start"
												onClick={() => { }}
											>
												<Rss className="mr-2 h-5 w-5" />
												Popular
											</Button>
											<Button variant="ghost" className="w-full justify-start" onClick={() => { }}>
												<ChartBarStacked className="mr-2 h-5 w-5" />
												Categories
											</Button>
										</div>
										<SheetHeader>
											<SheetTitle className="text-left">Profile actions</SheetTitle>
										</SheetHeader>
										<div className="mt-4 space-y-4">
											<Button variant="ghost" className="w-full justify-start" onClick={() => { }}>
												<User className="mr-2 h-5 w-5" />
												My Profile
											</Button>
											<Button variant="ghost" className="w-full justify-start" onClick={() => { }}>
												<Settings className="mr-2 h-5 w-5" />
												Settings
											</Button>
											<Button
												variant="ghost"
												className="w-full justify-start text-red-500 hover:text-red-500 hover:bg-red-50"
												onClick={() => { }}
											>
												<LogOut className="mr-2 h-5 w-5" />
												Logout
											</Button>
										</div>
									</SheetContent>
								</Sheet>
							) : (
								<div className="flex items-center space-x-4">
									<Button variant="outline" onClick={() => { /* Sign In logic */ }}>
										Sign In
									</Button>
									<Button onClick={() => { /* Sign Up logic */ }}>
										Sign Up
									</Button>
								</div>
							)}
							<ModeToggle />
						</div>
					</div>

					{/* Desktop Header - hidden on mobile */}
					<div className="hidden md:flex md:items-center md:justify-between md:w-full">
						{/* Logo */}
						<Link href="/" className="flex items-center space-x-2">
							<div className="h-6 w-6 bg-blue-500 rounded-md" />
							<span className="font-bold">NextGen</span>
						</Link>

						{/* Desktop Navigation */}
						<NavigationMenu className="hidden md:flex">
							<NavigationMenuList>
								<NavigationMenuItem>
									<Link href="/apps" legacyBehavior passHref>
										<NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
											Home
										</NavigationMenuLink>
									</Link>
								</NavigationMenuItem>
								<NavigationMenuItem>
									<Link href="/journal" legacyBehavior passHref>
										<NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
											Popular
										</NavigationMenuLink>
									</Link>
								</NavigationMenuItem>
								<NavigationMenuItem>
									<Link href="/ads" legacyBehavior passHref>
										<NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
											Categories
										</NavigationMenuLink>
									</Link>
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>

						{/* Search - hidden on mobile */}
						<div className="hidden md:block relative flex-1 max-w-md mx-4">
							<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Search applications"
								value={searchValue}
								onChange={(e) => setSearchValue(e.target.value)}
								className="pl-8 pr-12"
							/>
							<kbd className="pointer-events-none absolute right-2 top-2.5 select-none rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
								/
							</kbd>
						</div>

						{/* Right Section */}
						<div className="flex items-center space-x-4">
							{isAuthenticated ? (
								<>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" className="flex items-center space-x-1">
												<span className="hidden sm:inline-block">@defive...</span>
												<ChevronDown className="h-4 w-4" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuItem>
												<User className="mr-2 h-4 w-4" />
												<span>My Profile</span>
											</DropdownMenuItem>
											<DropdownMenuItem>
												<Settings className="mr-2 h-4 w-4" />
												<span>Settings</span>
											</DropdownMenuItem>
											<DropdownMenuSeparator />
											<DropdownMenuItem>
												<LogOut className="mr-2 h-4 w-4" />
												<span>Sign Out</span>
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</>
							) : (
								<div className="flex items-center space-x-4">
									<Button variant="outline" onClick={() => { /* Sign In logic */ }}>
										Sign In
									</Button>
									<Button onClick={() => { /* Sign Up logic */ }}>
										Sign Up
									</Button>
								</div>
							)}
							<ModeToggle />
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}
