'use client'

import { useRef, useEffect } from 'react'

interface MediaItem {
  _type: string
  _key: string
  caption?: string
  imageUrl?: string
  imageDimensions?: { width: number; height: number }
  imageLqip?: string
  videoUrl?: string
}

function AutoplayVideo({ src, caption }: { src: string; caption?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
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
    <div className="relative w-full">
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        className="w-full h-auto block"
        src={src}
      />
      {caption && (
        <p className="project-meta p-6 md:px-12 lg:px-16 py-4 opacity-40">
          {caption}
        </p>
      )}
    </div>
  )
}

export default function ProjectGallery({ media }: { media: MediaItem[] }) {
  return (
    <div>
      {media.map((item) => {
        if (item._type === 'image' && item.imageUrl) {
          return (
            <div key={item._key} className="relative w-full">
              <img
                src={item.imageUrl}
                alt={item.caption || ''}
                className="w-full h-auto block"
                loading="lazy"
                style={
                  item.imageLqip
                    ? {
                        backgroundImage: `url(${item.imageLqip})`,
                        backgroundSize: 'cover',
                      }
                    : undefined
                }
              />
              {item.caption && (
                <p className="project-meta p-6 md:px-12 lg:px-16 py-4 opacity-40">
                  {item.caption}
                </p>
              )}
            </div>
          )
        }

        if (item._type === 'video' && item.videoUrl) {
          return (
            <AutoplayVideo
              key={item._key}
              src={item.videoUrl}
              caption={item.caption}
            />
          )
        }

        return null
      })}
    </div>
  )
}
