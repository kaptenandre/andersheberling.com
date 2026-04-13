'use client'

import Link from 'next/link'
import Header from '@/components/Header'

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="sidebar-right">
        <span>Scenic &amp; Spacial Design Studio, based in Malmö, SE</span>
      </div>

      <main>
        <div className="about-layout">
          {/* Photo placeholder */}
          <div className="about-photo">
            <span>Portrait</span>
          </div>

          {/* Info */}
          <div className="about-content">
            <h1>Anders<br />Heberling</h1>

            <p className="about-bio">
              Stage designer based in Stockholm, Sweden. Creating
              immersive visual experiences for live music, touring
              productions, and events. With a focus on bold, minimal
              aesthetics that amplify the artist&apos;s vision and
              connect with audiences at scale. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Praesent vitae eros
              eget tellus tristique bibendum. Donec rutrum sed sem
              quis venenatis.
            </p>

            <div>
              <p className="about-detail-label">Email</p>
              <p className="about-detail-value">
                <a href="mailto:hello@andersheberling.com">
                  hello@andersheberling.com
                </a>
              </p>
            </div>
            <div>
              <p className="about-detail-label">Instagram</p>
              <p className="about-detail-value">
                <a href="https://instagram.com/andersheberling"
                   target="_blank" rel="noopener noreferrer">
                  @andersheberling
                </a>
              </p>
            </div>
            <div>
              <p className="about-detail-label">Based in</p>
              <p className="about-detail-value">Stockholm, Sweden</p>
            </div>

            <div style={{ marginTop: '32px' }}>
              <Link href="/" className="back-link">
                &larr; Back
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="site-footer">
          <div className="footer-links">
            <a href="mailto:hello@andersheberling.com">Email</a>
            <a href="https://instagram.com/andersheberling" target="_blank" rel="noopener noreferrer">Instagram</a>
            <Link href="/">Projects</Link>
          </div>
          <span className="footer-copy">&copy; {new Date().getFullYear()}</span>
        </footer>
      </main>
    </>
  )
}
