import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Weather App',
  description: 'Get instant weather updates and forecasts for any location.',
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {

  const am = [1,2,3,4,5,6,7,8,9,10,11,12];
  const currentStatus = Number(new Date().getHours().toFixed());

  return (
    <html lang="en" className={`bg-${currentStatus >= 0 && currentStatus <= 12 ? 'black' : 'black'}`}>
      <body className={`${inter.className}`}>
        {children}
      </body>
    </html>
  )
}
