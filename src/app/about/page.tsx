'use client'

import Link from 'next/link'

export default function AboutPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Link
        href="/"
        className="fixed top-6 right-6 md:top-8 md:right-8 z-50 back-link mix-blend-difference"
      >
        Close &times;
      </Link>

      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Photo */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen relative">
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #111 0%, #1a1a2e 50%, #222 100%)',
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="project-meta opacity-20">Portrait</p>
          </div>
        </div>

        {/* Info */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24">
          <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-12">
            Anders Heberling
          </h1>

          <p className="detail-description max-w-lg mb-12 leading-relaxed">
            Stage designer based in Stockholm, Sweden. Creating immersive visual
            experiences for live music, touring productions, and events. With a
            focus on bold, minimal aesthetics that amplify the artist&apos;s
            vision and connect with audiences at scale.
          </p>

          <div className="space-y-6 mb-16">
            <div>
              <p className="project-meta opacity-40 mb-1">Email</p>
              <a
                href="mailto:hello@andersheberling.com"
                className="text-sm uppercase tracking-widest font-light hover:opacity-50 transition-opacity"
              >
                hello@andersheberling.com
              </a>
            </div>
            <div>
              <p className="project-meta opacity-40 mb-1">Instagram</p>
              <a
                href="https://instagram.com/andersheberling"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm uppercase tracking-widest font-light hover:opacity-50 transition-opacity"
              >
                @andersheberling
              </a>
            </div>
            <div>
              <p className="project-meta opacity-40 mb-1">Based in</p>
              <p className="text-sm uppercase tracking-widest font-light">
                Stockholm, Sweden
              </p>
            </div>
          </div>

          <Link href="/" className="back-link">
            &larr; Back to projects
          </Link>
        </div>
      </div>
    </main>
  )
}
