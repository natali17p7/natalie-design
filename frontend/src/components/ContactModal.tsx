"use client"
import { useTranslations } from "next-intl"

const encodedEmail = Buffer.from("natali.17p7@gmail.com").toString("base64")
const encodedPhone = Buffer.from("+380967638994").toString("base64")

export default function ContactModal() {
  const t = useTranslations("contactModal")

  const decode = (str: string) => Buffer.from(str, "base64").toString()

  return (
    <dialog className="modal" id="contact_modal">
      <form method="dialog" className="modal-backdrop">
        <button>{t("close")}</button>
      </form>
      <div className="modal-box">
        <div className="relative flex items-center justify-center mb-4">
          <h3 className="text-lg font-bold text-center">{t("title")}</h3>
          <form method="dialog" className="absolute right-4">
            <button className="btn btn-ghost p-2 text-xl transition-colors duration-200 hover:bg-gray-100 hover:rounded-lg">
              ✕
            </button>
          </form>
        </div>
        <div className="space-y-2">
          <p>
            <strong>{t("email")}:</strong> {decode(encodedEmail)}
          </p>
          <p>
            <strong>{t("phone")}:</strong> {decode(encodedPhone)}
          </p>
          <div className="flex gap-4 pt-4 justify-center">
            <a
              className="btn btn-outline btn-sm"
              href={`https://wa.me/${decode(encodedPhone)}`}
              rel="noreferrer"
              target="_blank"
            >
              WhatsApp
            </a>
            <a
              className="btn btn-outline btn-sm"
              href={`https://t.me/${decode(encodedPhone)}`}
              rel="noreferrer"
              target="_blank"
            >
              Telegram
            </a>
          </div>
        </div>
      </div>
    </dialog>
  )
}
