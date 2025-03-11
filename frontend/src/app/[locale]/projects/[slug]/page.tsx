import { notFound } from "next/navigation"
import Image from "next/image"
import { getProjects, getProjectImages } from "../utils"
import { useTranslations } from "next-intl"
import { use } from "react"

type Props = {
  params: Promise<{
    slug: string
    locale: string
  }>
}

export function generateStaticParams({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const projects = getProjects(locale)
  return projects.map(project => ({ slug: project.slug }))
}

export default function ProjectPage(props: Props) {
  const params = use(props.params)
  const { slug, locale } = params
  const projects = getProjects(locale)
  const project = projects.find(p => p.slug === slug)
  const t = useTranslations("ProjectPage")

  if (!project) notFound()

  const images = getProjectImages(slug)
  const heroImage = images[0]
  const galleryImages = images.slice(1)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="mb-16">
        {heroImage && (
          <Image
            src={heroImage.path}
            alt={project.title}
            width={1920}
            height={1080}
            className="w-full h-96 object-cover rounded-lg"
          />
        )}
        <h1 className="text-4xl font-bold mt-8 mb-4">{project.title}</h1>
      </div>

      {/* Metadata */}
      <div className="mb-8">
        <p>
          <b className="text-sm font-semibold">{t("location")}:</b>{" "}
          {project.location}
        </p>
        <p>
          <b className="text-sm font-semibold">{t("area")}:</b> {project.area}
        </p>
        <p>
          <b className="text-sm font-semibold">{t("year")}:</b>{" "}
          {new Date(project.date).getFullYear()}
        </p>
      </div>

      {/* Content Section */}
      <div className="grid md:grid-cols-3 gap-12 mb-16">
        <div className="md:col-span-2">
          {/* MDX Content */}
          <article className="prose prose-invert">{project.content}</article>
        </div>

        {/* Achievements */}
        <div className="md:col-span-1">
          <h2 className="text-2xl font-bold mb-4">{t("achievements")}</h2>
          <ul className="space-y-3">
            {project.achievements.map((achievement, i) => (
              <li key={i} className="flex items-start">
                <span className="text-primary-400 mr-2">•</span>
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {galleryImages.map((image, index) => (
          <Image
            key={index}
            src={image.path}
            alt={`${project.title} gallery image ${index + 1}`}
            width={image.width > image.height ? 1400 : 700}
            height={image.width > image.height ? 900 : 900}
            className={`w-full h-auto rounded-lg ${
              image.width > image.height ? "col-span-2" : ""
            }`}
          />
        ))}
      </div>
    </div>
  )
}
