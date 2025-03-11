import { MetadataRoute } from "next"
import { getTranslations } from "next-intl/server"

type Props = {
  _params: { locale: string }
}

export default async function manifest({
  _params,
}: Props): Promise<MetadataRoute.Manifest> {
  const t = await getTranslations("Manifest")

  return {
    name: t("name"),
    start_url: "/",
    theme_color: "#101E33",
  }
}
