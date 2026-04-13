'use client'

import { useEffect, useState, useCallback } from 'react'
import { client } from '@/sanity/client'
import { allProjectsQuery } from '@/sanity/lib/queries'
import Header from '@/components/Header'
import LoadingBar from '@/components/LoadingBar'
import Link from 'next/link'
import { MOCK_PROJECTS } from '@/lib/mockData'
import { heroImageUrl } from '@/lib/media'
import type { Project } from '@/lib/mockData'

export default function Home() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS)
  const [loading, setLoading] = useState(true)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    client
      .fetch<Project[]>(allProjectsQuery)
      .then((data) => {
        if (data && data.length > 0) setProjects(data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])
  useEffect(() => {
    if (!loading && !revealed) {
      const safety = setTimeout(() => setRevealed(true), 2000)
      return () => clearTimeout(safety)
    }
  }, [loading, revealed])

  const handleComplete = useCallback(() => setRevealed(true), [])

  // Split by category
  const stageProjects = projects.filter((p) => !p.category || p.category === 'stage')
  const commercialProjects = projects.filter((p) => p.category === 'commercial')

  // First 3 stage projects as hero slides, rest after overview
  const heroProjects = stageProjects.slice(0, 3)
  const remainingStage = stageProjects.slice(3)

  const gradients = [
    'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #111 100%)',
    'linear-gradient(135deg, #111 0%, #1e1e1e 50%, #0d0d0d 100%)',
    'linear-gradient(160deg, #0f0f0f 0%, #1a1a1a 50%, #0a0a0a 100%)',
    'linear-gradient(145deg, #0a0a1a 0%, #151520 50%, #0a0a0a 100%)',
    'linear-gradient(180deg, #111 0%, #0a0a0a 100%)',
  ]

  const renderSlide = (project: Project, index: number) => {
    const optimized = heroImageUrl(project.heroImageUrl)
    // Fallback image: hero image → first gallery image → gradient
    const fallbackImage = optimized || (project.firstGalleryImageUrl ? project.firstGalleryImageUrl + '?w=1600&q=75' : null)

    return (
      <Link
        href={`/project/${project.slug.current}`}
        key={project._id}
        className="project-slide"
      >
        {/* Always render image underneath as fallback for low-power mode */}
        {fallbackImage ? (
          <img
            className="project-slide-bg"
            src={fallbackImage}
            alt={project.client}
            loading="lazy"
          />
        ) : (
          <div
            className="project-slide-bg"
            style={{ background: gradients[index % gradients.length], opacity: 1 }}
          />
        )}
        {/* Video on top — won't autoplay in low-power mode, image shows through */}
        {project.heroVideoUrl && (
          <video
            className="project-slide-bg project-slide-video"
            autoPlay muted loop playsInline
            preload="metadata"
            poster={fallbackImage || undefined}
            src={project.heroVideoUrl}
          />
        )}
        <div className="project-slide-gradient" />
        <div className="project-slide-content">
          <h2 className="project-slide-client">{project.client}</h2>
          <p className="project-slide-tour">{project.tour}</p>
          <p className="project-slide-meta">{project.year} &mdash; Stage Design</p>
        </div>
      </Link>
    )
  }
  return (
    <>
      <LoadingBar isLoading={loading} onComplete={handleComplete} />
      <div style={{ opacity: revealed ? 1 : 0, transition: 'opacity 0.6s ease' }}>
        <Header />
        <div className="sidebar-right">
          <span>Scenic &amp; Spacial Design Studio, based in Malmö, SE</span>
        </div>

        <div className="snap-container">
          {/* First 3 stage projects as full-page slides */}
          {heroProjects.map((project, i) => renderSlide(project, i))}

          {/* Selected Stage Projects — A-Z list */}
          <section className="overview-section">
            <p className="overview-label">Selected Stage Projects</p>
            <div className="overview-list">
              {stageProjects.map((project) => (
                <Link
                  href={`/project/${project.slug.current}`}
                  key={`overview-${project._id}`}
                  className="overview-item"
                >
                  {project.client}
                </Link>
              ))}
            </div>
          </section>
          {/* Remaining stage projects as slides */}
          {remainingStage.map((project, i) => renderSlide(project, i + 3))}

          {/* Selected Commercial Clients — inverted */}
          <section className="commercial-section">
            <p className="commercial-label">Selected Commercial Clients</p>
            <div className="commercial-list">
              {commercialProjects.map((project) =>
                project.slug?.current ? (
                  <Link
                    href={`/project/${project.slug.current}`}
                    key={`commercial-${project._id}`}
                    className="commercial-item"
                  >
                    {project.client}
                  </Link>
                ) : (
                  <span
                    key={`commercial-${project._id}`}
                    className="commercial-item"
                  >
                    {project.client}
                  </span>
                )
              )}
            </div>
            <p className="commercial-note">Case available upon request</p>
          </section>
          {/* Information section */}
          <section className="info-section" id="info">
            <div className="info-layout">
              <div className="info-photo">
                <span>Portrait</span>
              </div>
              <div className="info-content">
                <h2>Anders<br />Heberling</h2>
                <p className="info-bio">
                  Scenic and spacial designer based in Malmö, Sweden.
                  Creating immersive visual experiences for live music,
                  touring productions, and events. With a focus on bold,
                  minimal aesthetics that amplify the artist&apos;s vision
                  and connect with audiences at scale. Lorem ipsum dolor
                  sit amet, consectetur adipiscing elit. Praesent vitae
                  eros eget tellus tristique bibendum. Donec rutrum sed
                  sem quis venenatis.
                </p>
                <div>
                  <p className="info-detail-label">Email</p>
                  <p className="info-detail-value">
                    <a href="mailto:hello@andersheberling.com">
                      hello@andersheberling.com
                    </a>
                  </p>
                </div>
                <div>
                  <p className="info-detail-label">Instagram</p>
                  <p className="info-detail-value">
                    <a href="https://instagram.com/andersheberling"                       target="_blank" rel="noopener noreferrer">
                      @andersheberling
                    </a>
                  </p>
                </div>
                <div>
                  <p className="info-detail-label">Based in</p>
                  <p className="info-detail-value">Malmö, Sweden</p>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="site-footer" style={{ scrollSnapAlign: 'end' }}>
            <div className="footer-links">
              <a href="mailto:hello@andersheberling.com">Email</a>
              <a href="https://instagram.com/andersheberling" target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
            <span className="footer-copy">&copy; {new Date().getFullYear()}</span>
          </footer>

        </div>
      </div>
    </>
  )
}
