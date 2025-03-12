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
    contentKey: "tile1" | "tile2" | "tile3"
  }) => (
    <div
      className={`flex ${reverse ? "md:flex-row-reverse" : "md:flex-row"} flex-col gap-8 w-full mb-16`}
    >
      <div className="md:w-1/2 w-[calc(100%+32px)] -mx-4 md:mx-0 h-[480px] md:h-auto relative flex-shrink-0">
        <Image
          src={imageSrc}
          alt={t(`${contentKey}.alt`)}
          fill
          className="object-contain md:object-cover rounded-lg"
        />
      </div>
      <div className="md:w-1/2 w-full px-4 md:px-8 py-4 md:py-8 rounded-lg flex items-center justify-center overflow-y-auto">
        <div className="prose max-w-2xl md:text-base text-sm">
          <h2 className="md:text-3xl text-2xl mb-4">
            {t(`${contentKey}.title`)}
          </h2>
          <div className="whitespace-pre-line break-words">
            {t.rich(`${contentKey}.content`, {
              title: chunks => <h2 className="text-3xl">{chunks}</h2>,
              b: chunks => <b>{chunks}</b>,
            })}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-16">
      <TileRow
        reverse={false}
        imageSrc="/what-we-do/commercial.jpg"
        contentKey="tile1"
      />
      <TileRow
        reverse={true}
        imageSrc="/what-we-do/private.jpg"
        contentKey="tile2"
      />
      <TileRow
        reverse={false}
        imageSrc="/what-we-do/supervision.jpg"
        contentKey="tile3"
      />
    </div>
  )
}
