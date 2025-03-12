import { getRequestConfig } from "next-intl/server"
import { routing } from "./routing"
import type { Locale } from "../../i18n-config"

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale

  // Ensure that the incoming `locale` is valid
  if (!locale || !(routing.locales as unknown as Locale[]).includes(locale)) {
    locale = routing.defaultLocale as Locale
  }

  return {
    locale,
    messages: (
      await (locale === "en"
        ? // When using Turbopack, this will enable HMR for `en`
          import("../../messages/en.json")
        : (import(`../../messages/${locale}.json`) as Promise<{
            default: Record<string, Record<string, string>>
          }>))
    ).default,
  }
})
