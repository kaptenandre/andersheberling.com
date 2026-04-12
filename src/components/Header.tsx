import Link from 'next/link'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-6 md:p-8 flex justify-between items-center mix-blend-difference pointer-events-none">
      <Link
        href="/"
        className="site-title text-white pointer-events-auto"
      >
        Anders Heberling
      </Link>
      <span className="site-title text-white opacity-50">
        Stage Design
      </span>
    </header>
  )
}
