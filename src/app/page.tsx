'use client'

import { useEffect, useState } from 'react'
import { client } from '@/sanity/client'
import { allProjectsQuery } from '@/sanity/lib/queries'
import ProjectSection from '@/components/ProjectSection'
import Header from '@/components/Header'
import { MOCK_PROJECTS } from '@/lib/mockData'
import type { Project } from '@/lib/mockData'

export default function Home() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS)

  useEffect(() => {
    client
      .fetch<Project[]>(allProjectsQuery)
      .then((data) => {
        if (data && data.length > 0) setProjects(data)
      })
      .catch(() => {})
  }, [])

  return (
    <>
      <Header />
      <main className="snap-container">
        {projects.map((project, index) => (
          <ProjectSection
            key={project._id}
            project={project}
            isFirst={index === 0}
            isLast={index === projects.length - 1}
            index={index}
          />
        ))}
      </main>
    </>
  )
}
