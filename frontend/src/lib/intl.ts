import "server-only"

import { createIntl } from "@formatjs/intl"
import type { Locale } from "../../i18n-config"

export async function getIntl(locale: Locale) {
  return createIntl({
    locale,
    messages: (
      await import(
        `../../messages/${locale}.json` satisfies {
          default: Record<string, string>
        }
      )
    ).default,
  })
}

export function getDirection(_locale: Locale) {
  // switch (locale) {
  //   // case "ar":
  //   //   return "rtl";
  //   case "en":
  //   case "pl":
  //   case "uk":
  //     return "ltr"
  // }
  return "ltr"
}
