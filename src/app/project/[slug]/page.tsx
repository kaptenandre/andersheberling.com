'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { client } from '@/sanity/client'
import { projectBySlugQuery } from '@/sanity/lib/queries'
import { PortableText } from '@portabletext/react'
import ProjectGallery from '@/components/ProjectGallery'
import LoadingBar from '@/components/LoadingBar'
import Header from '@/components/Header'
import Link from 'next/link'
import { MOCK_PROJECT_DETAILS } from '@/lib/mockData'
import { heroImageUrl } from '@/lib/media'
import type { ProjectDetail } from '@/lib/mockData'

export default function ProjectPage() {
  const params = useParams()
  const slug = params.slug as string
  const [project, setProject] = useState<ProjectDetail | null>(
    MOCK_PROJECT_DETAILS[slug] || null
  )
  const [loading, setLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    client
      .fetch<ProjectDetail>(projectBySlugQuery, { slug })
      .then((data) => { if (data) setProject(data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [slug])
  if (!project && !loading) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 className="detail-title" style={{ color: '#000', marginBottom: '32px' }}>Not Found</h1>
          <Link href="/" className="back-link">&larr; Back</Link>
        </div>
      </main>
    )
  }

  if (!project) {
    return (
      <>
        <LoadingBar isLoading={true} />
        <main style={{ minHeight: '100vh' }} />
      </>
    )
  }

  const hasRealMedia = project.media && project.media.length > 0
  const optimizedHero = heroImageUrl(project.heroImageUrl)
  const hasDescription = project.description && project.description.length > 0
  // Fallback: hero image → first gallery image
  const firstGalleryImg = hasRealMedia
    ? project.media.find((m) => m.imageUrl)?.imageUrl
    : null
  const fallbackHeroImg = optimizedHero || (firstGalleryImg ? firstGalleryImg + '?w=1600&q=75' : null)

  // Fallback text when no Sanity description exists
  const fallbackDescription = (
    <>
      Design a fully immersive stage environment for the {project.tour},{' '}      spanning arena shows across Scandinavia. The concept centers on
      creating a visual world that evolves throughout the set &mdash; from
      intimate, stripped-back moments to full-scale sensory overload.
      Emphasis on architectural form, dynamic lighting integration, and
      large-format video surfaces that blur the boundary between performer
      and environment. Each scene was conceived as its own spatial universe,
      with custom-built structural elements that transform through the show.
      The design language draws from brutalist architecture, Scandinavian
      minimalism, and the raw energy of live performance. Materials were
      chosen for their ability to absorb and reflect light in unpredictable
      ways, creating moments of visual tension and release that mirror the
      emotional arc of the music.
    </>
  )

  return (
    <>
      <LoadingBar isLoading={loading} onComplete={() => setShowContent(true)} />
      <div style={{ opacity: showContent || !loading ? 1 : 0, transition: 'opacity 0.5s ease' }}>
        <Header />
        <div className="sidebar-right">
          <span>Scenic &amp; Spacial Design Studio, based in Malmö, SE</span>
        </div>

        <main>
          {/* Hero */}
          <section className="detail-hero">
            {/* Image layer (always shown, fallback for low-power mode) */}
            {fallbackHeroImg ? (
              <img src={fallbackHeroImg} alt={project.client} />
            ) : (
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #111 100%)',
              }} />
            )}
            {/* Video layer on top — won't play in low-power mode */}
            {project.heroVideoUrl && (
              <video
                autoPlay muted loop playsInline
                preload="metadata"
                poster={fallbackHeroImg || undefined}
                src={project.heroVideoUrl}
                style={{ zIndex: 1 }}
              />
            )}
            <div className="detail-hero-gradient" />
            <div className="detail-hero-content">
              <h1 className="detail-title">{project.client}</h1>
              <p className="detail-tour">{project.tour}</p>
              <p className="detail-meta">{project.year} &mdash; Stage Design</p>
            </div>
          </section>

          {/* Credits */}
          {project.credits && project.credits.length > 0 && (
            <div className="spec-grid">
              {project.credits.map((credit) => (
                <div key={credit._key}>
                  <p className="spec-label">{credit.role}</p>
                  <p className="spec-value">{credit.name}</p>
                </div>
              ))}
            </div>
          )}

          {/* The Vision — rich text from Sanity or fallback */}
          <section className="brief-section">
            <h2 className="brief-heading">The Vision</h2>            <div className="brief-body">
              {hasDescription ? (
                <PortableText value={project.description!} />
              ) : (
                <p>{fallbackDescription}</p>
              )}
            </div>
          </section>

          {/* Gallery */}
          <div className="gallery-grid">
            {hasRealMedia ? (
              <ProjectGallery media={project.media} />
            ) : (
              <>
                <div className="gallery-placeholder gallery-wide">
                  <span>Video &mdash; Rehearsal Footage</span>
                </div>
                <div className="gallery-placeholder">
                  <span>Image 01</span>
                </div>
                <div className="gallery-placeholder">
                  <span>Image 02</span>
                </div>
                <div className="gallery-placeholder gallery-wide">
                  <span>Image 03 &mdash; Wide</span>
                </div>
                <div className="gallery-placeholder">
                  <span>Sketch 01</span>
                </div>                <div className="gallery-placeholder">
                  <span>Sketch 02</span>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <footer className="site-footer">
            <div className="footer-links">
              <Link href="/" className="back-link">&larr; Back</Link>
            </div>
            <span className="footer-copy">&copy; {new Date().getFullYear()}</span>
          </footer>
        </main>
      </div>
    </>
  )
}
