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

          {/* Brief */}
          <section className="px-6 md:px-12 lg:px-16 py-20 md:py-32">
            <h2 className="project-meta opacity-40 mb-8 md:mb-12">Brief</h2>
            <p className="detail-description max-w-4xl">
              Design a fully immersive stage environment for the {project.tour},{' '}
              spanning 24 arena shows across Scandinavia. The concept centers on
              creating a visual world that evolves throughout the set — from
              intimate, stripped-back moments to full-scale sensory overload.
              Emphasis on architectural form, dynamic lighting integration, and
              large-format video surfaces that blur the boundary between performer
              and environment.
            </p>
          </section>

          {/* Concept sketches */}
          <section className="px-6 md:px-12 lg:px-16 pb-20 md:pb-32">
            <h2 className="project-meta opacity-40 mb-8 md:mb-12">Concept</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <PlaceholderBlock label="Sketch 01" aspect="4/3" />
              <PlaceholderBlock label="Sketch 02" aspect="4/3" />
            </div>
          </section>

          {/* Video */}
          <section className="pb-2">
            {hasRealMedia ? (
              <ProjectGallery media={project.media} />
            ) : (
              <div className="px-6 md:px-12 lg:px-16 pb-20 md:pb-32">
                <h2 className="project-meta opacity-40 mb-8 md:mb-12">Video</h2>
                <PlaceholderBlock label="Video — Rehearsal Footage" aspect="16/9" />
              </div>
            )}
          </section>

          {/* Gallery */}
          {!hasRealMedia && (
            <section className="px-6 md:px-12 lg:px-16 pb-20 md:pb-32">
              <h2 className="project-meta opacity-40 mb-8 md:mb-12">Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <PlaceholderBlock label="Image 01" aspect="3/2" />
                <PlaceholderBlock label="Image 02" aspect="3/2" />
                <PlaceholderBlock label="Image 03" aspect="3/2" />
                <PlaceholderBlock label="Image 04" aspect="3/2" />
              </div>
            </section>
          )}

          {/* Credits */}
          {project.credits && project.credits.length > 0 && (
            <section className="px-6 md:px-12 lg:px-16 py-20 md:py-32 border-t border-white/5">
              <h2 className="project-meta opacity-40 mb-10 md:mb-16">Credits</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-6 md:gap-y-8">
                {project.credits.map((credit) => (
                  <div key={credit._key}>
                    <p className="project-meta opacity-40">{credit.role}</p>
                    <p className="text-sm md:text-base uppercase tracking-widest font-light mt-1">
                      {credit.name}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

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
