export interface Project {
  _id: string
  client: string
  tour: string
  slug: { current: string }
  year: string
  category?: 'stage' | 'commercial'
  heroImageUrl: string | null
  heroVideoUrl: string | null
}

export interface ProjectDetail extends Project {
  media: MediaItem[]
  credits: Credit[]
  description?: any[]
}

export interface MediaItem {
  _type: string
  _key: string
  imageUrl?: string
  imageDimensions?: { width: number; height: number }
  imageLqip?: string
  videoUrl?: string
}

export interface Credit {
  _key: string
  role: string
  name: string
}
export const MOCK_PROJECTS: Project[] = [
  {
    _id: 'mock-1',
    client: 'Håkan Hellström',
    tour: 'Arena Tour 2026',
    slug: { current: 'hakan-hellstrom' },
    year: '2026',
    category: 'stage',
    heroImageUrl: null,
    heroVideoUrl: null,
  },
  {
    _id: 'mock-2',
    client: 'Robyn',
    tour: 'Club Tour 2025',
    slug: { current: 'robyn' },
    year: '2025',
    category: 'stage',
    heroImageUrl: null,
    heroVideoUrl: null,
  },
  {
    _id: 'mock-3',
    client: 'Veronica Maggio',
    tour: 'Stadion Tour 2024',
    slug: { current: 'veronica-maggio' },
    year: '2024',
    category: 'stage',
    heroImageUrl: null,
    heroVideoUrl: null,
  },  {
    _id: 'mock-4',
    client: 'First Aid Kit',
    tour: 'World Tour 2025',
    slug: { current: 'first-aid-kit' },
    year: '2025',
    category: 'stage',
    heroImageUrl: null,
    heroVideoUrl: null,
  },
  {
    _id: 'mock-5',
    client: 'Volvo',
    tour: '',
    slug: { current: '' },
    year: '2025',
    category: 'commercial',
    heroImageUrl: null,
    heroVideoUrl: null,
  },
  {
    _id: 'mock-6',
    client: 'H&M',
    tour: '',
    slug: { current: '' },
    year: '2024',
    category: 'commercial',
    heroImageUrl: null,
    heroVideoUrl: null,
  },
  {
    _id: 'mock-7',    client: 'Spotify',
    tour: '',
    slug: { current: '' },
    year: '2025',
    category: 'commercial',
    heroImageUrl: null,
    heroVideoUrl: null,
  },
]

export const MOCK_PROJECT_DETAILS: Record<string, ProjectDetail> = {
  'hakan-hellstrom': {
    ...MOCK_PROJECTS[0],
    media: [],
    credits: [
      { _key: '1', role: 'Stage Design', name: 'Anders Heberling' },
      { _key: '2', role: 'Lighting Design', name: 'Johan Andersson' },
      { _key: '3', role: 'Video Design', name: 'Maria Lindqvist' },
      { _key: '4', role: 'Production Manager', name: 'Erik Svensson' },
      { _key: '5', role: 'Set Construction', name: 'Scenbyggarna AB' },
      { _key: '6', role: 'Rigging', name: 'Nordic Rigging' },
    ],
  },
  'robyn': {
    ...MOCK_PROJECTS[1],
    media: [],
    credits: [
      { _key: '1', role: 'Stage Design', name: 'Anders Heberling' },
      { _key: '2', role: 'Creative Director', name: 'Sara Forsberg' },
      { _key: '3', role: 'Lighting Design', name: 'Klas Pettersson' },
      { _key: '4', role: 'Video Design', name: 'Studio Moross' },      { _key: '5', role: 'Choreography', name: 'Lydia Wålsten' },
    ],
  },
  'veronica-maggio': {
    ...MOCK_PROJECTS[2],
    media: [],
    credits: [
      { _key: '1', role: 'Stage Design', name: 'Anders Heberling' },
      { _key: '2', role: 'Lighting Design', name: 'Patrik Olsson' },
      { _key: '3', role: 'Sound Design', name: 'Daniel Berg' },
      { _key: '4', role: 'Production Manager', name: 'Lisa Ekström' },
    ],
  },
  'first-aid-kit': {
    ...MOCK_PROJECTS[3],
    media: [],
    credits: [
      { _key: '1', role: 'Stage Design', name: 'Anders Heberling' },
      { _key: '2', role: 'Lighting Design', name: 'Oscar Nilsson' },
      { _key: '3', role: 'Video Design', name: 'Emma Johansson' },
      { _key: '4', role: 'Production Design', name: 'Viktor Lund' },
      { _key: '5', role: 'Scenic Art', name: 'Anna Bergström' },
    ],
  },
}
