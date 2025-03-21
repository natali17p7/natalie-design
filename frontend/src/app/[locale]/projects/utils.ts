import { readdirSync, existsSync, readFileSync } from "fs"
import path from "path"
import grayMatter from "gray-matter"

type ImageData = {
  path: string
  width: number
  height: number
}

export type ProjectData = {
  slug: string
  title: string
  type: string
  date: string
  path: string
  image: ImageData
  gallery: ImageData[]
  location: string
  area: string
  achievements: string[]
  content: string
}

const projectsRoot = path.join(process.cwd(), "public/projects/pages")

import imageSize from "image-size"

export function getProjectImages(slug: string): ImageData[] {
  const projectPath = path.join(projectsRoot, slug)
  const images = readdirSync(projectPath)
    .filter(file => /\.jpe?g$/i.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map(image => {
      const imagePath = path.join(projectPath, image)
      const buffer = readFileSync(imagePath)
      const dimensions = imageSize(buffer)
      return {
        path: `/projects/pages/${slug}/${image}`,
        width: dimensions.width || 0,
        height: dimensions.height || 0,
      }
    })
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
        location?: string
        area?: string
        achievements?: string
      }

      const { data, content } = grayMatter.read(mdxPath, {
        engines: {
          ".mdx": (input: string) => ({
            data: {},
            content: input.split(/\r?\n---\r?\n/)[1],
          }),
        },
      }) as { data: Frontmatter; content: string }
      const images = getProjectImages(slug)
      const achievements = data.achievements
        ? data.achievements.split("|").filter(n => n)
        : []

      return {
        slug,
        title: data.title || "",
        type: data.type || "",
        date: data.date || "",
        location: data.location || "",
        area: data.area || "",
        achievements,
        content: content || "",
        image:
          images.length > 0 ? images[0] : { path: "", width: 0, height: 0 },
        gallery: images.slice(1),
      }
    })
    .filter((p): p is ProjectData => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getProjectTypes(projects: ProjectData[]): string[] {
  return ["All", ...new Set(projects.map(p => p.type))].sort()
}
