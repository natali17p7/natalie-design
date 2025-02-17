import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="footer footer-center p-4 bg-base-300 text-base-content/80">
      <div className="container mx-auto">
        <p>{t('text')}</p>
      </div>
    </footer>
  );
}
