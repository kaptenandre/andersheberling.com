import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Anders Heberling — Stage Design',
  description: 'Portfolio of Anders Heberling, Stage Designer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
