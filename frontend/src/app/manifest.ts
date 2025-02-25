import {MetadataRoute} from 'next'
import {getTranslations} from 'next-intl/server'

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function manifest({ params }: Props): Promise<MetadataRoute.Manifest> {
  const { locale } = await params
  const t = await getTranslations({locale, namespace: 'Manifest'})

  return {
    name: t('name'),
    start_url: '/',
    theme_color: '#101E33'
  }
}
