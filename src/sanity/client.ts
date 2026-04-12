import { createClient } from 'next-sanity'
import { projectId, dataset, apiVersion } from './env'

const isConfigured = !!projectId

export const client = createClient({
  projectId: projectId || 'placeholder',
  dataset,
  apiVersion,
  useCdn: true,
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function sanityFetch<T>(query: string, params?: any): Promise<T | null> {
  if (!isConfigured) return null
  try {
    if (params) {
      return await client.fetch<T>(query, params)
    }
    return await client.fetch<T>(query)
  } catch (e) {
    console.error('Sanity fetch error:', e)
    return null
  }
}
