import '@/styles/globals.css'
import {clsx} from 'clsx'
import {Inter} from 'next/font/google'
import {NextIntlClientProvider} from 'next-intl'
import ContactModal from "@/components/ContactModal"
import {getMessages} from 'next-intl/server'
import {ReactNode} from 'react'
import Footer from "@/components/Footer"
import Header from "@/components/Header"

const inter = Inter({subsets: ['latin']})

type Props = {
  children: ReactNode;
  locale: string;
};

export default async function BaseLayout({children, locale}: Props) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html className="h-full" lang={locale}>
      <body className={clsx(inter.className, 'flex h-full flex-col')}>
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale}/>
          <main className="min-h-[calc(100vh-160px)]">{children}</main>
          <Footer />
          <ContactModal />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
