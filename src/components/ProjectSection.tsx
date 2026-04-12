'use client'

import Link from 'next/link'
import type { Project } from '@/lib/mockData'

const GRADIENTS = [
  'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
  'linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 50%, #2d1b69 100%)',
  'linear-gradient(135deg, #0a0a0a 0%, #2e1a1a 50%, #4a1a1a 100%)',
  'linear-gradient(135deg, #0a0a0a 0%, #1a2e1a 50%, #0d3b2e 100%)',
  'linear-gradient(135deg, #0a0a0a 0%, #2e2e1a 50%, #3d2e0a 100%)',
]

export default function ProjectSection({
  project,
  isFirst,
  index = 0,
}: {
  project: Project
  isFirst: boolean
  isLast: boolean
  index?: number
}) {
  const gradient = GRADIENTS[index % GRADIENTS.length]

  return (
    <section className="snap-section group">
      <Link
        href={`/project/${project.slug.current}`}
        className="absolute inset-0 z-20 cursor-pointer"
        aria-label={`View ${project.client}`}
      />

      {/* Background media */}
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
          style={{ background: gradient }}
        />
      )}

      {/* Overlay */}
      <div className="media-overlay" />

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col justify-end p-6 md:p-12 lg:p-16 pb-12 md:pb-16">
        <h2 className="project-title">{project.client}</h2>
        <div className="flex items-center gap-6 md:gap-10 mt-4 md:mt-6 project-meta">
          <span>{project.tour}</span>
          <span className="opacity-40">{project.year}</span>
        </div>
      </div>

      {/* Scroll indicator on first section */}
      {isFirst && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 scroll-indicator">
          <svg
            width="16"
            height="24"
            viewBox="0 0 16 24"
            fill="none"
            className="opacity-50"
          >
            <path
              d="M7.29 23.71a1 1 0 001.42 0l6.36-6.36a1 1 0 00-1.42-1.42L8 21.59l-5.66-5.66a1 1 0 00-1.41 1.42l6.36 6.36zM7 0v23.3h2V0H7z"
              fill="white"
            />
          </svg>
        </div>
      )}
    </section>
  )
}
