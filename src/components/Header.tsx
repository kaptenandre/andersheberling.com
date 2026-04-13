'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  // On homepage, clicking logo scrolls to info section
  // On other pages, clicking logo goes back to homepage
  const handleClick = (e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault()
      const el = document.getElementById('info')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="site-header">
      <Link href="/" className="site-logo" onClick={handleClick}>
        Anders Heberling
      </Link>
    </header>
  )
}
