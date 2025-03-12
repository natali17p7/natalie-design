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
    contentKey: "tile1" | "tile2" | "tile3" | "tile4"
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
      <div className="w-1/2 p-8 rounded-lg flex items-center justify-center">
        <div className="prose max-w-2xl">
          <h2 className="text-3xl mb-4">{t(`${contentKey}.title`)}</h2>
          <div className="whitespace-pre-line">{t.rich(`${contentKey}.content`, {
            title: chunks => <h2 className="text-3xl">{chunks}</h2>,
            b: chunks => <b>{chunks}</b>,
          })}</div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-16 text-center">{t("title")}</h1>

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
