import { readdirSync, existsSync } from 'fs'
import path from 'path'
import grayMatter from 'gray-matter'

type ProjectData = {
  slug: string
  title: string
  type: string
  date: string
  image: string
}

const projectsRoot = path.join(process.cwd(), 'src/app/[locale]/projects/pages')

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
      }

      const { data } = grayMatter.read(mdxPath, {
        parser: (input: string) => input.split(/\\r?\\n---\\r?\\n/)[1] // Type-safe frontmatter parsing
      }) as { data: Frontmatter }
      const images = readdirSync(path.join(projectsRoot, slug))
        .filter(file => /\.jpe?g$/i.test(file))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

      return {
        slug,
        title: data.title || '',
        type: data.type || '',
        date: data.date || '',
        image: images.length > 0 ? `/projects/pages/${slug}/${images[0]}` : ''
      }
    })
    .filter((p): p is ProjectData => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getProjectTypes(projects: ProjectData[]): string[] {
  return ['All', ...new Set(projects.map(p => p.type))].sort()
}
