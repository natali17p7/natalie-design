import { readdirSync, existsSync } from 'fs'
import path from 'path'
import grayMatter from 'gray-matter'

type ProjectData = {
  slug: string
  title: string
  type: string
  date: string
  path: string
  image: string
  gallery: string[]
  summary: string
  location: string
  area: string
  achievements: string[]
}

const projectsRoot = path.join(process.cwd(), 'src/app/[locale]/projects/pages')

export function getProjectImages(slug: string): string[] {
  const projectPath = path.join(projectsRoot, slug)
  const images = readdirSync(projectPath)
    .filter(file => /\.jpe?g$/i.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map(image => `/projects/pages/${slug}/${image}`)
  return images
}

export function getProjects(locale: string): ProjectData[] {
  const projectDirs = readdirSync(projectsRoot, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  return projectDirs
    .map(slug => {
      const mdxPath = path.join(projectsRoot, slug, `${locale}.mdx`)
      if (!existsSync(mdxPath)) return null

      type Frontmatter = {
        title?: string
        type?: string
        date?: string
        summary?: string
        location?: string
        area?: string
        achievements?: string
      }

      const { data } = grayMatter.read(mdxPath, {
        parser: (input: string) => input.split(/\\r?\\n---\\r?\\n/)[1] // Type-safe frontmatter parsing
      }) as { data: Frontmatter }
      const images = getProjectImages(slug)
      const achievements = data.achievements ? data.achievements.split('|') : []

      return {
        slug,
        title: data.title || '',
        type: data.type || '',
        date: data.date || '',
        summary: data.summary || '',
        location: data.location || '',
        area: data.area || '',
        achievements,
        image: images.length > 0 ? images[0] : '',
        gallery: images.slice(1),
      }
    })
    .filter((p): p is ProjectData => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getProjectTypes(projects: ProjectData[]): string[] {
  return ['All', ...new Set(projects.map(p => p.type))].sort()
}
