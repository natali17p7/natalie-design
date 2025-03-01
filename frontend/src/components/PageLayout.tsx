import {ReactNode} from 'react'

type Props = {
  children?: ReactNode;
  title?: ReactNode;
  background?: string;
};

export default function PageLayout({children, title, background}: Props) {

  return (
    <div
      className="relative flex grow flex-col py-36"
      style={background ? {backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center'} : undefined}
    >
      <div className="container relative flex grow flex-col px-4">
        {title && (
          <h1 className="text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
            {title}
          </h1>
        )}
        <div className="mt-6 md:text-lg">{children}</div>
      </div>
    </div>
  )
}
