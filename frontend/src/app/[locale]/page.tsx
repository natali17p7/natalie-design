import {useTranslations} from 'next-intl'
import {setRequestLocale} from 'next-intl/server'
import { use } from "react"
import PageLayout from '@/components/PageLayout'
import ClientButtonWithModal from '@/components/ClientButtonWithModal'

type Props = {
  params: Promise<{ locale: string }>;
};

export default function IndexPage(props: Props) {
  const params = use(props.params)
  // Enable static rendering
  const locale = params.locale
  setRequestLocale(locale)

  const t = useTranslations('mainPage')

  return (
    <PageLayout title={t('title')}>
      <h1 className="text-6xl font-bold mb-8">{t('title')}</h1>
      <ClientButtonWithModal />
    </PageLayout>
  )
}
