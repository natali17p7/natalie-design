'use client'
import {useTranslations} from 'next-intl'
import ContactModal from '@/components/ContactModal'

export default function ClientButtonWithModal() {
  const t = useTranslations('mainPage')
  
  return (
    <>
      <button
        className="btn btn-primary text-lg px-8 py-3"
        onClick={() => (document.getElementById('contact_modal') as HTMLDialogElement)?.showModal()}
      >
        {t('cta')}
      </button>
      <ContactModal />
    </>
  )
}
