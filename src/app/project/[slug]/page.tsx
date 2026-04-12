'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { client } from '@/sanity/client'
import { projectBySlugQuery } from '@/sanity/lib/queries'
import ProjectGallery from '@/components/ProjectGallery'
import Link from 'next/link'
import { MOCK_PROJECT_DETAILS } from '@/lib/mockData'
import type { ProjectDetail } from '@/lib/mockData'

const GRADIENTS = [
  'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
  'linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 50%, #2d1b69 100%)',
  'linear-gradient(135deg, #0a0a0a 0%, #2e1a1a 50%, #4a1a1a 100%)',
  'linear-gradient(135deg, #0a0a0a 0%, #1a2e1a 50%, #0d3b2e 100%)',
]

export default function ProjectPage() {
  const params = useParams()
  const slug = params.slug as string
  const [project, setProject] = useState<ProjectDetail | null>(
    MOCK_PROJECT_DETAILS[slug] || null
  )
  const [loaded, setLoaded] = useState(!!MOCK_PROJECT_DETAILS[slug])

  useEffect(() => {
    client
      .fetch<ProjectDetail>(projectBySlugQuery, { slug })
      .then((data) => {
        if (data) setProject(data)
      })
      .catch(() => {})
      .finally(() => setLoaded(true))
  }, [slug])

  if (!loaded) {
    return (
      <main className="bg-black text-white min-h-screen flex items-center justify-center">
        <h1 className="project-title">Loading</h1>
      </main>
    )
  }

  if (!project) {
    return (
      <main className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="detail-title mb-8">Not Found</h1>
          <Link href="/" className="back-link">
            &larr; Back to projects
          </Link>
        </div>
      </main>
    )
  }

  return (
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
            src={project.heroVideoUrl}
          />
        ) : project.heroImageUrl ? (
          <img
            src={project.heroImageUrl}
            alt={project.client}
            className="image-bg"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: GRADIENTS[0] }}
          />
        )}
        <div className="media-overlay" />

        <div className="relative z-10 p-6 md:p-12 lg:p-16 pb-12 md:pb-16">
          <p className="project-meta opacity-50 mb-3 md:mb-4">{project.tour}</p>
          <h1 className="detail-title mb-8 md:mb-12">{project.client}</h1>
          <div className="project-meta">
            <span className="opacity-40">{project.year}</span>
          </div>
        </div>
      </section>

      {/* Media gallery */}
      {project.media && project.media.length > 0 && (
        <ProjectGallery media={project.media} />
      )}

      {/* Credits */}
      {project.credits && project.credits.length > 0 && (
        <section className="px-6 md:px-12 lg:px-16 py-20 md:py-32">
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
      <section className="p-6 md:p-12 lg:p-16 py-20 md:py-32 border-t border-white/10">
        <Link href="/" className="back-link">
          &larr; Back to projects
        </Link>
      </section>
    </main>
  )
}
