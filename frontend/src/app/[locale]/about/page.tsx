import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function AboutPage() {
  const t = useTranslations('AboutPage')

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Placeholder image - replace with actual image path */}
        <div className="md:w-1/2">
          <div className="relative h-[950px] rounded-lg">
            <Image
              alt="About"
              fill
              className="object-cover rounded-lg"
              src="/images/About.jpg" // Temporary placeholder
            />
          </div>
        </div>

        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold mb-6">{t('title')}</h1>
          <p className="text-lg leading-relaxed whitespace-pre-line">{t('description')}</p>
        </div>
      </div>
    </div>
  )
}
