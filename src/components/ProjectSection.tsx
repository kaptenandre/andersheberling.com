'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import type { Project } from '@/lib/mockData'
import { heroImageUrl } from '@/lib/media'

const GRADIENTS = [
  'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
  'linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 50%, #2d1b69 100%)',
  'linear-gradient(135deg, #0a0a0a 0%, #2e1a1a 50%, #4a1a1a 100%)',
  'linear-gradient(135deg, #0a0a0a 0%, #1a2e1a 50%, #0d3b2e 100%)',
  'linear-gradient(135deg, #0a0a0a 0%, #2e2e1a 50%, #3d2e0a 100%)',
]

function HeroVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      className="video-bg"
      muted
      loop
      playsInline
      preload="metadata"
      src={src}
    />
  )
}

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
  const optimizedHero = heroImageUrl(project.heroImageUrl)

  return (
    <section className="snap-section group">
      <Link
        href={`/project/${project.slug.current}`}
        className="absolute inset-0 z-20 cursor-pointer"
        aria-label={`View ${project.client}`}
      />

      {project.heroVideoUrl ? (
        <HeroVideo src={project.heroVideoUrl} />
      ) : optimizedHero ? (
        <img
          src={optimizedHero}
          alt={project.client}
          className="image-bg"
          loading={isFirst ? 'eager' : 'lazy'}
        />
      ) : (
        <div className="absolute inset-0" style={{ background: gradient }} />
      )}

      <div className="media-overlay" />

      <div className="relative z-10 w-full flex flex-col items-center justify-center text-center p-6 md:p-12 lg:p-16 flex-1">
        <h2 className="project-title">{project.client}</h2>
        <div className="flex items-center gap-6 md:gap-10 mt-4 md:mt-6 project-meta">
          <span>{project.tour}</span>
          <span className="opacity-40">{project.year}</span>
        </div>
      </div>

      {isFirst && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 scroll-indicator">
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" className="opacity-50">
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
