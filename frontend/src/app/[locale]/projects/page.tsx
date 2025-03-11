import { getProjects, getProjectTypes } from './utils'
import ProjectsClient from './ProjectsClient'
import { use } from "react"

type Props = {
  params: Promise<{locale: string}>;
};

export default function ProjectsPage(props: Props) {
  const params = use(props.params)
  const projects = getProjects(params.locale)
  const types = getProjectTypes(projects)

  return <ProjectsClient projects={projects} types={types} locale={params.locale} />
}
