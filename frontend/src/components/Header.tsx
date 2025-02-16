'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/i18n/client';
import Image from 'next/image';

export default function Header({ lng }: { lng: string }) {
  const { t } = useTranslation(lng, 'header');
  const pathname = usePathname();
  
  const navLinks = [
    { href: '/', key: 'home' },
    { href: '/projects', key: 'projects' },
    { href: '/what-we-do', key: 'whatWeDo' },
    { href: '/contacts', key: 'contacts' },
  ];

  return (
    <div className="navbar bg-base-100 px-4 sm:px-8">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52">
            {navLinks.map((link) => (
              <li key={link.key}>
                <Link href={`/${lng}${link.href}`} className={pathname === `/${lng}${link.href}` ? 'underline' : ''}>
                  {t(`nav.${link.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Link href={`/${lng}`} className="btn btn-ghost h-auto p-2">
          <Image src="/images/logo.svg" alt="Logo" width={40} height={40} />
        </Link>
      </div>
      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {navLinks.map((link) => (
            <li key={link.key}>
              <Link 
                href={`/${lng}${link.href}`} 
                className={`text-lg ${pathname === `/${lng}${link.href}` ? 'underline' : ''}`}
              >
                {t(`nav.${link.key}`)}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end gap-4">
        <div className="hidden lg:flex gap-2">
          {['en', 'pl', 'uk'].map((lang) => (
            <Link 
              key={lang}
              href={`/${lang}${pathname?.split('/').slice(2).join('/') || '/'}`}
              className={lng === lang ? 'overline' : ''}
            >
              {lang.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
