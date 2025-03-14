import { routing } from "../../../i18n/routing"
import { getProjects, type ProjectData } from "./utils"

export function generateStaticParams() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    return routing.locales.flatMap(locale => {
      const projects = getProjects(locale)
      return projects.map((project: ProjectData) => ({
        slug: project.slug,
        locale: locale,
      }))
    })
  }
  return []
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
