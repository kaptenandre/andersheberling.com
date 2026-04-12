import Link from 'next/link'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-6 md:p-8 flex justify-center items-center mix-blend-difference pointer-events-none">
      <Link
        href="/about"
        className="site-title text-white pointer-events-auto hover:opacity-50 transition-opacity"
      >
        Anders Heberling
      </Link>
    </header>
  )
}
