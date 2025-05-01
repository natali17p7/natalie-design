import { ReactNode } from "react"
import Image from "next/image"

type Props = {
  children?: ReactNode
  title?: ReactNode
  background?: string
}

export default function PageLayout({ children, title, background }: Props) {
  return (
    <div
      className="relative flex min-h-screen flex-col"
      style={{
        background:
          "linear-gradient(to bottom right, rgb(245, 245, 245), rgb(200, 200, 200))",
      }}
    >
      {background && (
        <Image
          alt=""
          src={background}
          fill
          className="object-cover"
          style={{
            position: "absolute",
            height: "100%",
            zIndex: 0,
          }}
        />
      )}
      <div
        className="container relative flex grow flex-col items-center mx-auto px-4 py-36"
        style={{ zIndex: 1 }}
      >
        {title && (
          <h1 className="text-3xl font-semibold leading-tight tracking-tight w-full md:text-5xl">
            {title}
          </h1>
        )}
        <div className="mt-6 md:text-lg">{children}</div>
      </div>
    </div>
  )
}
