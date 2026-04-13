'use client'

import { useEffect, useState, useCallback } from 'react'
import { client } from '@/sanity/client'
import { allProjectsQuery } from '@/sanity/lib/queries'
import ProjectSection from '@/components/ProjectSection'
import Header from '@/components/Header'
import LoadingBar from '@/components/LoadingBar'
import { MOCK_PROJECTS } from '@/lib/mockData'
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

  // Safety: if loading finishes but onComplete never fires, reveal after 2s
  useEffect(() => {
    if (!loading && !revealed) {
      const safety = setTimeout(() => setRevealed(true), 2000)
      return () => clearTimeout(safety)
    }
  }, [loading, revealed])

  const handleComplete = useCallback(() => setRevealed(true), [])

  return (
    <>
      <LoadingBar isLoading={loading} onComplete={handleComplete} />
      <div style={{ opacity: revealed ? 1 : 0, transition: 'opacity 0.5s ease' }}>
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
      </div>
    </>
  )
}
