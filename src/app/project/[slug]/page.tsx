'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { client } from '@/sanity/client'
import { projectBySlugQuery } from '@/sanity/lib/queries'
import ProjectGallery from '@/components/ProjectGallery'
import LoadingBar from '@/components/LoadingBar'
import Link from 'next/link'
import { MOCK_PROJECT_DETAILS } from '@/lib/mockData'
import { heroImageUrl } from '@/lib/media'
import type { ProjectDetail } from '@/lib/mockData'

const GRADIENTS = [
  'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
  'linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 50%, #2d1b69 100%)',
  'linear-gradient(135deg, #0a0a0a 0%, #2e1a1a 50%, #4a1a1a 100%)',
  'linear-gradient(135deg, #0a0a0a 0%, #1a2e1a 50%, #0d3b2e 100%)',
]

function PlaceholderBlock({ label, aspect = '16/9' }: { label: string; aspect?: string }) {
  return (
    <div
      className="w-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center"
      style={{ aspectRatio: aspect }}
    >
      <p className="project-meta opacity-20">{label}</p>
    </div>
  )
}

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
      .then((data) => {
        if (data) setProject(data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [slug])

  if (!project && !loading) {
    return (
      <main className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="detail-title mb-8">Not Found</h1>
          <Link href="/" className="back-link">&larr; Back to projects</Link>
        </div>
      </main>
    )
  }

  if (!project) {
    return (
      <>
        <LoadingBar isLoading={true} />
        <main className="bg-black text-white min-h-screen" />
      </>
    )
  }

  const hasRealMedia = project.media && project.media.length > 0

  return (
    <>
      <LoadingBar isLoading={loading} onComplete={() => setShowContent(true)} />
      <div style={{ opacity: showContent || !loading ? 1 : 0, transition: 'opacity 0.5s ease' }}>
        <main className="bg-black text-white min-h-screen">
          <Link
            href="/"
            className="fixed top-6 left-6 md:top-8 md:left-8 z-50 back-link mix-blend-difference"
          >
            &larr; Back
          </Link>

          {/* Hero */}
          <section className="h-screen h-[100dvh] relative flex flex-col justify-end overflow-hidden">
            {project.heroVideoUrl ? (
              <video
                className="video-bg"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                src={project.heroVideoUrl}
              />
            ) : project.heroImageUrl ? (
              <img
                src={heroImageUrl(project.heroImageUrl) || project.heroImageUrl}
                alt={project.client}
                className="image-bg"
              />
            ) : (
              <div className="absolute inset-0" style={{ background: GRADIENTS[0] }} />
            )}
            <div className="media-overlay" />

            <div className="relative z-10 p-6 md:p-12 lg:p-16 pb-12 md:pb-16">
              <h1 className="detail-title mb-4 md:mb-6">{project.client}</h1>
              <div className="flex items-center gap-6 md:gap-10 project-meta">
                <span>{project.tour}</span>
                <span className="opacity-40">{project.year}</span>
              </div>
            </div>
          </section>

          {/* Credits — spec sheet */}
          {project.credits && project.credits.length > 0 && (
            <section className="px-6 md:px-12 lg:px-16 py-12 md:py-16 border-b border-white/5">
              <div className="flex flex-wrap gap-x-12 md:gap-x-20 lg:gap-x-28 gap-y-4">
                {project.credits.map((credit) => (
                  <div key={credit._key} className="flex gap-3 items-baseline">
                    <span className="spec-label">{credit.role}</span>
                    <span className="spec-value">{credit.name}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Brief */}
          <section className="px-6 md:px-12 lg:px-16 py-20 md:py-32 lg:py-40">
            <h2 className="brief-heading mb-6 md:mb-8">The Vision</h2>
            <h3 className="brief-subheading mb-10 md:mb-14">
              An immersive world that dissolves the boundary between artist and audience
            </h3>
            <p className="brief-body max-w-4xl">
              Design a fully immersive stage environment for the {project.tour},{' '}
              spanning 24 arena shows across Scandinavia. The concept centers on
              creating a visual world that evolves throughout the set — from
              intimate, stripped-back moments to full-scale sensory overload.
              Emphasis on architectural form, dynamic lighting integration, and
              large-format video surfaces that blur the boundary between performer
              and environment.
            </p>
          </section>

          {/* Gallery */}
          <section className="px-6 md:px-12 lg:px-16 pb-20 md:pb-32">
            {hasRealMedia ? (
              <ProjectGallery media={project.media} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                <div className="md:col-span-2">
                  <PlaceholderBlock label="Video — Rehearsal Footage" aspect="16/9" />
                </div>
                <PlaceholderBlock label="Image 01" aspect="3/2" />
                <PlaceholderBlock label="Image 02" aspect="3/2" />
                <div className="md:col-span-2">
                  <PlaceholderBlock label="Image 03 — Wide" aspect="21/9" />
                </div>
                <PlaceholderBlock label="Sketch 01" aspect="4/3" />
                <PlaceholderBlock label="Sketch 02" aspect="4/3" />
                <PlaceholderBlock label="Image 04" aspect="3/2" />
                <PlaceholderBlock label="Image 05" aspect="3/2" />
              </div>
            )}
          </section>

          {/* Footer */}
          <section className="p-6 md:p-12 lg:p-16 py-20 md:py-32 border-t border-white/5">
            <Link href="/" className="back-link">
              &larr; Back to projects
            </Link>
          </section>
        </main>
      </div>
    </>
  )
}
