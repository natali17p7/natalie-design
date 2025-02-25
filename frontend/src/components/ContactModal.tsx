'use client'
import { useTranslations } from 'next-intl'

const encodedEmail = Buffer.from('natali.17p7@gmail.com').toString('base64')
const encodedPhone = Buffer.from('+380967638994').toString('base64')

export default function ContactModal() {
  const t = useTranslations('contactModal')

  const decode = (str: string) => Buffer.from(str, 'base64').toString()

  return (
    <dialog className="modal" id="contact_modal">
      <div className="modal-box">
        <h3 className="mb-4 text-lg font-bold">{t('title')}</h3>
        <div className="space-y-2">
          <p>
            <strong>{t('email')}:</strong> {decode(encodedEmail)}
          </p>
          <p>
            <strong>{t('phone')}:</strong> {decode(encodedPhone)}
          </p>
          <div className="flex gap-4 pt-4">
            <a
              className="btn btn-outline btn-sm"
              href={`https://wa.me/${decode(encodedPhone)}`}
              rel="noreferrer" target="_blank"
            >
              WhatsApp
            </a>
            <a
              className="btn btn-outline btn-sm"
              href={`https://t.me/${decode(encodedPhone)}`}
              rel="noreferrer" target="_blank"
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
  )
}
