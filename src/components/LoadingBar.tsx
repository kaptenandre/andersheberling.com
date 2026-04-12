'use client'

import { useEffect, useState } from 'react'

export default function LoadingBar({
  isLoading,
  onComplete,
}: {
  isLoading: boolean
  onComplete?: () => void
}) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (!isLoading && progress < 100) {
      // Jump to 100 when content is ready
      setProgress(100)
      const timeout = setTimeout(() => {
        setVisible(false)
        onComplete?.()
      }, 400)
      return () => clearTimeout(timeout)
    }

    if (isLoading) {
      setVisible(true)
      setProgress(0)
      // Simulate progress
      const intervals = [
        setTimeout(() => setProgress(12), 100),
        setTimeout(() => setProgress(28), 300),
        setTimeout(() => setProgress(45), 600),
        setTimeout(() => setProgress(62), 1000),
        setTimeout(() => setProgress(78), 1600),
        setTimeout(() => setProgress(88), 2400),
        setTimeout(() => setProgress(94), 3500),
      ]
      return () => intervals.forEach(clearTimeout)
    }
  }, [isLoading, onComplete, progress])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-opacity duration-300"
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
