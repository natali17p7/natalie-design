import {notFound} from 'next/navigation';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {ReactNode} from 'react';
import BaseLayout from '@/components/BaseLayout';
import {routing} from '@/i18n/routing';

type Props = {
  children: ReactNode;
  params;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params
}: Omit<Props, 'children'>) {
  const p = await params;
  const locale = p.locale;
  const t = await getTranslations({locale, namespace: 'LocaleLayout'});

  return {
    title: t('title')
  };
}

export default async function LocaleLayout({
  children,
  params
}: Props) {
  // Ensure that the incoming `locale` is valid
  const p = await params;
  const locale = p.locale;
  if (!routing.locales.includes(p.locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return <BaseLayout locale={locale}>{children}</BaseLayout>;
}
