import { getIntl } from "@/lib/intl"
import styles from "../../page.module.css"

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Nested(props: Props) {
  const params = await props.params

  const {
    locale
  } = params

  const intl = await getIntl(locale)

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
