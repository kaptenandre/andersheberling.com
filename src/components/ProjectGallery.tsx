'use client'

import { useRef, useEffect } from 'react'
import { galleryImageUrl } from '@/lib/media'

interface MediaItem {
  _type: string
  _key: string
  caption?: string
  imageUrl?: string
  imageDimensions?: { width: number; height: number }
  imageLqip?: string
  videoUrl?: string
}

function AutoplayVideo({ src }: { src: string }) {
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
      { threshold: 0.2 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="metadata"
      className="w-full h-auto block"
      src={src}
    />
  )
}

export default function ProjectGallery({ media }: { media: MediaItem[] }) {
  return (
    <div>
      {media.map((item) => {
        if (item._type === 'image' && item.imageUrl) {
          const optimized = galleryImageUrl(item.imageUrl)
          return (
            <div key={item._key} className="relative w-full">
              <img
                src={optimized || item.imageUrl}
                alt=""
                className="w-full h-auto block"
                loading="lazy"
                style={
                  item.imageLqip
                    ? {
                        backgroundImage: `url(${item.imageLqip})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                      }
                    : undefined
                }
              />
            </div>
          )
        }

        if (item._type === 'video' && item.videoUrl) {
          return (
            <div key={item._key} className="relative w-full">
              <AutoplayVideo src={item.videoUrl} />
            </div>
          )
        }

        return null
      })}
    </div>
  )
}
