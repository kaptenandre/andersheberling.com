import { sanityFetch } from '@/sanity/client'
import { projectBySlugQuery } from '@/sanity/lib/queries'
import ProjectGallery from '@/components/ProjectGallery'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

interface MediaItem {
  _type: string
  _key: string
  caption?: string
  imageUrl?: string
  imageDimensions?: { width: number; height: number }
  imageLqip?: string
  videoUrl?: string
}

interface Project {
  _id: string
  title: string
  slug: { current: string }
  client: string
  tour: string
  year: string
  description: string
  heroImageUrl: string | null
  heroVideoUrl: string | null
  media: MediaItem[]
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string }
}) {
  const project = await sanityFetch<Project>(projectBySlugQuery, {
    slug: params.slug,
  })

  if (!project) {
    notFound()
  }

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Fixed back button */}
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
            alt={project.title}
            className="image-bg"
          />
        ) : (
          <div className="absolute inset-0 bg-neutral-950" />
        )}
        <div className="media-overlay" />

        <div className="relative z-10 p-6 md:p-12 lg:p-16 pb-12 md:pb-16">
          <h1 className="detail-title mb-8 md:mb-12">{project.title}</h1>
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
      </section>

      {/* Description */}
      {project.description && (
        <section className="px-6 md:px-12 lg:px-16 py-16 md:py-24 lg:py-32">
          <p className="detail-description max-w-5xl">{project.description}</p>
        </section>
      )}

      {/* Media gallery */}
      {project.media && project.media.length > 0 && (
        <ProjectGallery media={project.media} />
      )}

      {/* Footer */}
      <section className="p-6 md:p-12 lg:p-16 py-20 md:py-32">
        <Link href="/" className="back-link">
          &larr; Back to projects
        </Link>
      </section>
    </main>
  )
}
