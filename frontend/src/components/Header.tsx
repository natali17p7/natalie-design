
'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations("Header")
  const pathname = usePathname()

  const navLinks = [
    { href: '/', key: 'home' },
    { href: '/projects', key: 'projects' },
    { href: '/what-we-do', key: 'whatWeDo' },
    { href: '/contacts', key: 'contacts' },
  ]

  return (
    <div className="navbar bg-base-100 px-4 sm:px-8">
      <div className="navbar-start">
        <div className="dropdown">
          <label className="btn btn-ghost lg:hidden" tabIndex={0}>
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6h16M4 12h8m-8 6h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </label>
          <ul className="dropdown-content rounded-box menu-sm z-10 mt-3 w-52 bg-transparent p-2 shadow [&_.menu-dropdown-show]:bg-transparent [li]:hover:bg-transparent" tabIndex={0}>
            {navLinks.map((link) => (
              <li key={link.key} className="bg-transparent hover:bg-transparent">
                <Link className={`hover:underline [&.active]:bg-transparent ${pathname === `/${locale}${link.href}` ? 'underline' : ''}`} href={`/${locale}${link.href}`}>
                  {t(`nav-${link.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Link className="btn btn-ghost h-auto p-2" href={`/${locale}`}>
          <Image alt="Logo" height={40} src="/images/logo.svg" width={40} />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu-horizontal flex gap-8 bg-transparent [&_.menu-dropdown-show]:bg-transparent [li]:hover:bg-transparent">
          {navLinks.map((link) => (
            <li key={link.key} className="bg-transparent hover:bg-transparent">
              <Link
                className={`text-lg hover:underline [&.active]:bg-transparent ${pathname === `/${locale}${link.href}` ? 'underline' : ''}`}
                href={`/${locale}${link.href}`}
              >
                {t(`nav-${link.key}`)}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end gap-4">
        <div className="hidden gap-2 lg:flex">
          {['en', 'pl', 'uk'].map((lang) => (
            <Link
              key={lang}
              className={`hover:underline ${locale === lang ? 'underline' : ''}`}
              href={`/${lang}${pathname.split('/').slice(2).join('/') || '/'}`}
            >
              {lang.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
