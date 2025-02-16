import { useTranslation } from '@/i18n/client';

export default function Footer({ lng }: { lng: string }) {
  const { t } = useTranslation(lng, 'footer');
  
  return (
    <footer className="footer footer-center p-4 bg-base-300 text-base-content/80">
      <div className="container mx-auto">
        <p>{t('footer')}</p>
      </div>
    </footer>
  );
}
