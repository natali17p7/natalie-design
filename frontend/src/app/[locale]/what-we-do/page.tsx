import { useTranslations } from "next-intl"
import Image from "next/image"

export default function WhatWeDoPage() {
  const t = useTranslations("WhatWeDoPage")

  const TileRow = ({
    reverse,
    imageSrc,
    contentKey,
  }: {
    reverse: boolean
    imageSrc: string
    contentKey: string
  }) => (
    <div
      className={`flex ${reverse ? "flex-row-reverse" : "flex-row"} gap-8 w-full max-h-[80vh] mb-16`}
    >
      <div className="w-1/2 relative">
        <Image
          src={imageSrc}
          alt={t(`${contentKey}.alt`)}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div className="w-1/2 bg-base-200 p-8 rounded-lg flex items-center justify-center">
        <div className="prose max-w-2xl">
          <h2 className="text-3xl mb-4">{t(`${contentKey}.title`)}</h2>
          <p>{t(`${contentKey}.content`)}</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-16 text-center">{t("title")}</h1>

      <TileRow
        reverse={false}
        imageSrc="/images/placeholder1.jpg"
        contentKey="tile1"
      />
      <TileRow
        reverse={true}
        imageSrc="/images/placeholder2.jpg"
        contentKey="tile2"
      />
      <TileRow
        reverse={false}
        imageSrc="/images/placeholder3.jpg"
        contentKey="tile3"
      />
      <TileRow
        reverse={true}
        imageSrc="/images/placeholder4.jpg"
        contentKey="tile4"
      />
    </div>
  )
}
