export const allProjectsQuery = `
  *[_type == "project"] | order(order asc) {
    _id,
    client,
    tour,
    slug,
    year,
    category,
    "heroImageUrl": heroImage.asset->url,
    "heroVideoUrl": heroVideo.asset->url,
    "firstGalleryImageUrl": media[_type == "image"][0].asset->url
  }
`

export const projectBySlugQuery = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    client,
    tour,
    slug,
    year,
    category,
    description,
    "heroImageUrl": heroImage.asset->url,
    "heroVideoUrl": heroVideo.asset->url,
    media[] {
      _type,
      _key,      "imageUrl": asset->url,
      "imageDimensions": asset->metadata.dimensions,
      "imageLqip": asset->metadata.lqip,
      hotspot,
      crop,
      "videoUrl": file.asset->url
    },
    credits[] {
      _key,
      role,
      name
    }
  }
`

export const projectSlugsQuery = `
  *[_type == "project" && defined(slug.current)][].slug.current
`
