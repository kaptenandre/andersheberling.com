'use client'

import { useEffect, useState, useCallback } from 'react'

export default function LoadingBar({
  isLoading,
  onComplete,
}: {
  isLoading: boolean
  onComplete?: () => void
}) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!isLoading) return
    setVisible(true)
    setProgress(0)
    setDone(false)
    const steps = [
      setTimeout(() => setProgress(15), 100),
      setTimeout(() => setProgress(35), 300),
      setTimeout(() => setProgress(55), 600),
      setTimeout(() => setProgress(70), 1000),
      setTimeout(() => setProgress(85), 1800),
      setTimeout(() => setProgress(92), 3000),
    ]
    return () => steps.forEach(clearTimeout)
  }, [isLoading])

  useEffect(() => {
    if (isLoading || done) return
    setProgress(100)
    const timer = setTimeout(() => {
      setVisible(false)
      setDone(true)
      onComplete?.()
    }, 500)
    return () => clearTimeout(timer)
  }, [isLoading, done, onComplete])

  if (!visible) return null

  return (
    <div
      className="loading-screen"
      style={{ opacity: progress >= 100 ? 0 : 1 }}
    >
      <div className="loading-bar-track">
        <div
          className="loading-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="loading-percent">
        {Math.round(progress)}%
      </p>
    </div>
  )
}
