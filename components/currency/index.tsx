"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"

const scrollbarHideStyles = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`

const currencyData = [
	{ symbol: "BTC", price: 96083, change: 27746 },
	{ symbol: "USD", price: 1.00, change: 0.00 },
	{ symbol: "EUR", price: 0.92, change: -0.01 },
	{ symbol: "GBP", price: 0.79, change: 0.02 },
	{ symbol: "JPY", price: 147.58, change: -1.20 },
	{ symbol: "AUD", price: 1.52, change: 0.03 },
	{ symbol: "CAD", price: 1.35, change: -0.02 },
	{ symbol: "CHF", price: 0.88, change: 0.01 },
	{ symbol: "CNY", price: 7.29, change: -0.05 },
	{ symbol: "HKD", price: 7.82, change: 0.00 },
	{ symbol: "NZD", price: 1.66, change: 0.04 },
]

export default function CurrencyTicker() {
	const [animate, setAnimate] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => setAnimate(true), 100)
		return () => clearTimeout(timer)
	}, [])

	return (
		<>
			<style jsx global>{scrollbarHideStyles}</style>
			<Card className="w-full overflow-hidden bg-background rounded-none shadow-none border-0 border-b-2">
				<CardContent className="pt-2 pb-0 overflow-x-auto scrollbar-hide">
					<div className="flex space-x-4 whitespace-nowrap py-1 px-2 pb-4">
						{currencyData.map((currency, index) => (
							<div
								key={currency.symbol}
								className={cn(
									"flex items-center space-x-2 transition-all duration-700 ease-out",
									animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
								)}
								style={{ transitionDelay: `${index * 100}ms` }}
							>
								<span className="text-lg font-semibold">{currency.symbol}</span>
								<span className="text-sm">{currency.price.toFixed(2)}</span>
								<span
									className={cn(
										"text-xs flex items-center",
										currency.change > 0 ? "text-green-500" :
											currency.change < 0 ? "text-red-500" :
												"text-gray-500"
									)}
								>
									{currency.change > 0 ? (
										<ArrowUpIcon className="w-3 h-3 mr-1" />
									) : currency.change < 0 ? (
										<ArrowDownIcon className="w-3 h-3 mr-1" />
									) : null}
									{Math.abs(currency.change).toFixed(2)}
								</span>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</>
	)
}

