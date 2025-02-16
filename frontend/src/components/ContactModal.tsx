'use client';
import { useTranslation } from '@/i18n/client';

const encodedEmail = Buffer.from('natali.17p7@gmail.com').toString('base64');
const encodedPhone = Buffer.from('+380967638994').toString('base64');

export default function ContactModal() {
  const { t } = useTranslation('en', 'contactModal'); // Assuming language is handled by parent
  
  const decode = (str: string) => Buffer.from(str, 'base64').toString();
  
  return (
    <dialog id="contact_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">{t('title')}</h3>
        <div className="space-y-2">
          <p>
            <strong>{t('email')}:</strong> {decode(encodedEmail)}
          </p>
          <p>
            <strong>{t('phone')}:</strong> {decode(encodedPhone)}
          </p>
          <div className="flex gap-4 pt-4">
            <a 
              href={`https://wa.me/${decode(encodedPhone)}`}
              className="btn btn-outline btn-sm"
              target="_blank"
            >
              WhatsApp
            </a>
            <a
              href={`https://t.me/${decode(encodedPhone)}`}
              className="btn btn-outline btn-sm"
              target="_blank"
            >
              Telegram
            </a>
          </div>
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">{t('close')}</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
