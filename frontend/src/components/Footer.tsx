import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations("Footer")

  return (
    <footer className="footer footer-center p-4 text-base-content/80">
      <div className="container mx-auto">
        <p className="whitespace-pre-line utility"><a href="https://github.com/aidaho">{t('text')}</a></p>
      </div>
    </footer>
  )
}
