import { MetadataRoute } from "next"
import { getTranslations } from "next-intl/server"

type Props = {
  params: { locale: string }
}

export default async function manifest({
  params,
}: Props): Promise<MetadataRoute.Manifest> {
  const { locale } = params
  const t = await getTranslations("Manifest")

  return {
    name: t("name"),
    start_url: "/",
    theme_color: "#101E33",
  }
}
