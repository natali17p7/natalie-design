"use client"
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

type Project = {
  slug: string
  category: 'commercial' | 'residential'
  title: string
}

export default function ProjectsPage() {
  const t = useTranslations('ProjectsPage')
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'commercial' | 'residential'>('all')

  // Temporary mock data - will be replaced with dynamic import of MDX files
  const projects: Project[] = [
    { slug: 'office-renovation', category: 'commercial', title: 'Office Complex Renovation' },
    { slug: 'modern-villa', category: 'residential', title: 'Modern Villa Design' },
    { slug: 'retail-space', category: 'commercial', title: 'Retail Space Concept' },
    { slug: 'apartment-makeover', category: 'residential', title: 'Apartment Makeover' },
    { slug: 'hotel-lobby', category: 'commercial', title: 'Hotel Lobby Design' },
    { slug: 'country-house', category: 'residential', title: 'Country House Interior' },
  ]

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category === selectedCategory)

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">{t('title')}</h1>

      <div className="flex gap-4 justify-center mb-12">
        {['all', 'commercial', 'residential'].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category as typeof selectedCategory)}
            className={`px-6 py-2 rounded-full ${
              selectedCategory === category
                ? 'bg-primary text-white'
                : 'bg-base-200 hover:bg-base-300'
            }`}
          >
            {t(`categories.${category}`)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <GalleryTile
            key={project.slug}
            slug={project.slug}
            title={project.title}
            category={project.category}
          />
        ))}
      </div>
    </div>
  )
}

function GalleryTile({ slug, title, category }: Project) {
  return (
    <Link href={`/projects/${slug}`} className="group block">
      <div className="relative overflow-hidden rounded-lg aspect-square">
        <Image
          src={`/projects/${slug}/tile.jpg`}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-gray-500">{category}</p>
      </div>
    </Link>
  )
}
