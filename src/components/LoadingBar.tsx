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

  // Simulate progress while loading
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

  // When loading finishes, jump to 100 and fade out
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
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-opacity duration-400"
      style={{ opacity: progress >= 100 ? 0 : 1 }}
    >
      <div className="w-48 md:w-64">
        <div className="h-[1px] w-full bg-white/10 relative overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-center mt-3 text-[10px] uppercase tracking-[0.3em] font-light opacity-50">
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  )
}
