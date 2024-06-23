import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type ReadOnlyChild from '@/types/readonly-child'
import '@/styles/common.css'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FuckIt | New Era of Messaging",
  description: "FuckIt | New Era of Messaging",
}

export default function RootLayout({
  children
}: ReadOnlyChild) {
  return (
    <html>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
