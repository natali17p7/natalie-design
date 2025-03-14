import { routing } from "../../../i18n/routing"
import { getProjects, type ProjectData } from "./utils"

export function generateStaticParams() {
  return routing.locales.flatMap(locale => {
    const projects = getProjects(locale)
    return projects.map((project: ProjectData) => ({
      slug: project.slug,
      locale: locale,
    }))
  })
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
