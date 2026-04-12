export const allProjectsQuery = `
  *[_type == "project"] | order(order asc) {
    _id,
    title,
    slug,
    client,
    tour,
    year,
    "heroImageUrl": heroImage.asset->url,
    "heroVideoUrl": heroVideo.asset->url
  }
`

export const projectBySlugQuery = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    client,
    tour,
    year,
    description,
    "heroImageUrl": heroImage.asset->url,
    "heroVideoUrl": heroVideo.asset->url,
    media[] {
      _type,
      _key,
      caption,
      "imageUrl": asset->url,
      "imageDimensions": asset->metadata.dimensions,
      "imageLqip": asset->metadata.lqip,
      hotspot,
      crop,
      "videoUrl": file.asset->url
    }
  }
`

export const projectSlugsQuery = `
  *[_type == "project" && defined(slug.current)][].slug.current
`
