import { getIntl } from "@/lib/intl"
import type { Locale } from "@/i18n/routing"
import styles from "../../page.module.css"

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Nested(props: Props) {
  const params = await props.params as { locale: Locale }
  const { locale } = params
  const intl = await getIntl(locale)
  
  if (!intl) {
    throw new Error(`Failed to load intl for locale: ${locale}`)
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          {intl.formatMessage({ id: "page.nested.title" })}
        </h1>
      </main>
    </div>
  )
}
