import {useTranslations} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import PageLayout from '@/components/PageLayout';

type Props = {
  params;
};

export default function IndexPage({params}: Props) {
  // Enable static rendering
  const locale = params.locale;
  setRequestLocale(locale);

  const t = useTranslations('IndexPage');

  return (
    <PageLayout title={t('title')}>
      <p className="max-w-[590px]">
        {t.rich('description', {
          code: (chunks) => (
            <code className="font-mono text-white">{chunks}</code>
          )
        })}
      </p>
    </PageLayout>
  );
}
