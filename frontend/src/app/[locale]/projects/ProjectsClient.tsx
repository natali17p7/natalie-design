'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { ProjectData } from './utils'

export default function ProjectsClient({
  projects,
  types,
  locale
}: {
  projects: ProjectData[]
  types: string[]
  locale: string
}) {
  const [selectedType, setSelectedType] = useState('All')

  const filteredProjects = selectedType === 'All'
    ? projects
    : projects.filter(p => p.type === selectedType)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 flex gap-4 flex-wrap justify-center">
        {types.map(type => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-2 rounded-lg ${
              type === selectedType
                ? 'btn-primary text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <Link
            key={project.slug}
            href={`/${locale}/projects/${project.slug}`}
            className="group block overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={project.image.path}
                alt={project.title}
                height={500}
                width={500}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
              <p className="text-gray-600 text-sm">{project.type}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
