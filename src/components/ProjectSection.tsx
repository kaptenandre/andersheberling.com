'use client'

import Link from 'next/link'

interface Project {
  _id: string
  title: string
  slug: { current: string }
  client: string
  tour: string
  year: string
  heroImageUrl: string | null
  heroVideoUrl: string | null
}

export default function ProjectSection({
  project,
  isFirst,
  isLast,
}: {
  project: Project
  isFirst: boolean
  isLast: boolean
}) {
  return (
    <section className="snap-section group">
      <Link
        href={`/project/${project.slug.current}`}
        className="absolute inset-0 z-20 cursor-pointer"
        aria-label={`View ${project.title}`}
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
          alt={project.title}
          className="image-bg"
        />
      ) : (
        <div className="absolute inset-0 bg-neutral-950" />
      )}

      {/* Overlay */}
      <div className="media-overlay" />

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col justify-end p-6 md:p-12 lg:p-16 pb-12 md:pb-16">
        <div className="mb-6 md:mb-10">
          <h2 className="project-title">{project.title}</h2>
        </div>
        <div className="flex gap-8 md:gap-16 project-meta">
          <div>
            <span className="opacity-40 block">Client</span>
            <p className="mt-1.5">{project.client}</p>
          </div>
          {project.tour && (
            <div>
              <span className="opacity-40 block">Tour</span>
              <p className="mt-1.5">{project.tour}</p>
            </div>
          )}
          <div>
            <span className="opacity-40 block">Year</span>
            <p className="mt-1.5">{project.year}</p>
          </div>
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
