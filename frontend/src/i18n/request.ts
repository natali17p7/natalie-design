import { getRequestConfig } from "next-intl/server"
import { routing } from "./routing"
import type { Locale } from "../../i18n-config"

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = (await requestLocale) ?? routing.defaultLocale

  // Ensure that the incoming `locale` is valid
  if (!(routing.locales as readonly string[]).includes(locale)) {
    locale = routing.defaultLocale
  }
  locale = locale as Locale

  return {
    locale,
    messages: (
      await (locale === "en"
        ? // When using Turbopack, this will enable HMR for `en`
          import("../../messages/en.json")
        : import(`../../messages/${locale}.json`))
    ).default,
  }
})
