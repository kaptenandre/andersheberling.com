import { sanityFetch } from '@/sanity/client'
import { allProjectsQuery } from '@/sanity/lib/queries'
import ProjectSection from '@/components/ProjectSection'
import Header from '@/components/Header'

export const dynamic = 'force-dynamic'

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

export default async function Home() {
  const projects: Project[] = await sanityFetch<Project[]>(allProjectsQuery) || []

  return (
    <>
      <Header />
      <main className="snap-container">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <ProjectSection
              key={project._id}
              project={project}
              isFirst={index === 0}
              isLast={index === projects.length - 1}
            />
          ))
        ) : (
          <section className="snap-section flex items-center justify-center">
            <div className="text-center">
              <h1 className="project-title mb-8">Anders<br />Heberling</h1>
              <p className="project-meta opacity-50">Stage Design Portfolio</p>
              <p className="project-meta opacity-30 mt-4">
                Add projects in <a href="/studio" className="underline">/studio</a>
              </p>
            </div>
          </section>
        )}
      </main>
    </>
  )
}
