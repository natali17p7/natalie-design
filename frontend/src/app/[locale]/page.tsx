import { useTranslations } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { use } from "react"
import PageLayout from "@/components/PageLayout"
import ClientButtonWithModal from "@/components/ClientButtonWithModal"

type Props = {
  params: Promise<{ locale: string }>
}

export default function IndexPage(props: Props) {
  const params = use(props.params)
  // Enable static rendering
  const locale = params.locale
  setRequestLocale(locale)

  const t = useTranslations("mainPage")

  return (
    <PageLayout background="/images/index-background.jpg">
      <div className="container mx-auto h-full flex flex-col items-center justify-center min-h-[600px] text-center">
        <h1
          className="text-7xl font-bold mb-8 text-white px-4 py-2 rounded-lg"
          style={{ textShadow: "0 0 2px gray, 0 0 2px gray, 0 0 2px gray" }}
        >
          {t("title")}
        </h1>
        <ClientButtonWithModal />
      </div>
    </PageLayout>
  )
}
