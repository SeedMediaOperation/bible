'use client';

import React, { useState } from 'react'
import Image from "next/image";
import  Link  from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from "next-intl";
import Translation from './Translation';
import {routing} from "@/lib/i18n/routing";

export function getLocale(pathname: string) {
    const match = pathname.match(/^\/([a-zA-Z-]+)(\/|$)/);
    return match ? match[1] : "en";
}
  
export function getNavLinks(locale: string) {
    return [
        {
            name: 'home',
            href: `/${locale}`,
            match: "/",
        },
        {
            name: 'about',
            href: `/${locale}/about-us`,
            match: "/about-us"
        },
        {
            name: 'mission',
            href: `/${locale}/mission`,
            match: "/mission"
        },
        {
            name: 'catalogues',
            href: `/${locale}/catalogue`,
            match: "/catalogue"
        },
        {
            name: 'contact',
            href: `/${locale}/contact-us`,
            match: "/contact-us"
        },
        {
            name: 'vlogs',
            href: `/${locale}/vlogs`,
            match: "/vlogs"
        }
    ];
}

function stripLocale(path: string) {
    return path.replace(/^\/[a-zA-Z-]+/, "") || "/";
}

const Navbar = () => {
  const [isMenu, setIsMenu] = useState<boolean>(false);
  const t = useTranslations('nav');
  const pathname = usePathname();

  const locale = getLocale(pathname); 
  const navLinks = getNavLinks(locale);
  
  const handleClickOpen = () =>{
    setIsMenu(true)
  }
  const handleClickClose = () =>{
    setIsMenu(false)
  }
  
  function isActive(link: { match: string; href: string }) {
    // Special case for home
    if (
      link.match === `/${locale}` &&
      (pathname === `/${locale}` || pathname === `/${locale}`)
    ) {
      return true;
    }
    // For others, strip locale and compare
    return stripLocale(pathname.replace(/\/$/, "")) === link.match;
  }

  return (
    <nav
    className='relative w-full h-fit z-[50] xl:fixed top-0 left-0 right-0'>
        {/* Desktop && Tablet */}
        <div className='hidden xl:block w-full fixed top-[1%] left-0 right-0'>
            {/* Translate */}
            <div className='my-3'>
            <Translation />
            </div>
            <div className='w-full max-w-[1200px] mx-auto bg-white rounded-full px-10 py-3'>
                <ul className='flex justify-between items-center'>
                    <li data-aos="fade-right"
                        data-aos-anchor="#example-anchor"
                        data-aos-offset="500"
                        data-aos-duration="500"
                        >
                        <div className='flex gap-4'>
                            <Link href={`/${routing.defaultLocale}/`} className={`${!isMenu ? 'opacity-100':'opacity-0'} transition-all duration-[300] ease-in-out`}>
                                <Image 
                                    src="/logo.svg"
                                            alt="banner"
                                            width={80}
                                            height={80}
                                            quality={100}
                                            priority
                                    className={`w-[50px] h-[50px] object-contain object-center`}
                                    />
                            </Link>
                            <Link href={`/${routing.defaultLocale}/#home`} className='flex space-x-[1rem] w-fit mx-auto md:mx-0 bg-[#50bbed] rounded-full justify-between items-center ps-3 pe-2 py-1'>
                                <span className={`text-[16px] text-[#fff] text-center font-bold ms-3 ${locale === 'km' ? 'font-[krasar]':'font-[gotham]'}`}>{locale === 'km' ? 'បរិច្ចាក':'Donate'}</span>
                                <span className='w-full h-full bg-[#4FC9EE] rounded-full p-2'>
                                    <svg width="24" height="24" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_1_148)">
                                        <path d="M7.83925 5.63095C8.35246 6.06624 8.41765 6.12675 8.64351 6.32125C8.80899 6.17931 8.95098 6.05019 9.55282 5.54548C10.6574 4.61796 11.4555 3.94826 11.4555 2.95899C11.4555 2.02119 10.7666 1.28662 9.88714 1.28662C9.29638 1.28662 8.90439 1.61994 8.65827 1.95942C8.4252 1.61891 8.04623 1.28662 7.45377 1.28662C6.57433 1.28662 5.88574 2.02121 5.88574 2.95899C5.88572 3.97333 6.66289 4.63273 7.83925 5.63095Z" fill="#FEFBF8"/>
                                        <path d="M2.19469 11.4098C3.11563 10.7842 4.12329 10.5451 5.21997 10.7279L6.97748 11.0302C7.65239 11.1427 8.27098 11.1075 8.80527 10.9318C9.91057 10.5634 11.0171 9.40323 11.3103 8.96336C11.7181 8.35175 11.9421 7.68389 12.0827 7.36054C12.2163 7.05121 12.2163 6.83328 12.0757 6.70674C11.914 6.55909 11.6398 6.63642 11.4359 6.74892C11.1126 6.9317 10.769 7.45896 10.4175 7.96509C9.96058 8.62592 9.17791 9.0196 8.37646 9.0196H5.83156V8.3166H6.88607C8.75603 8.3166 9.59261 7.96509 9.59261 7.61359C9.59261 7.31836 9.00914 7.18476 8.81227 7.1426C8.04602 6.96685 6.31661 6.88249 5.13559 6.35524C4.9226 6.26205 4.68115 6.20974 4.4256 6.20759C4.02494 6.20419 3.5895 6.32902 3.17419 6.65048C3.16721 6.65048 3.16721 6.65048 3.16015 6.65751C2.88598 6.86841 2.51105 7.17773 2.00488 7.62062C1.57603 8.00022 1.16128 8.48529 0.437163 9.10396L0.184082 9.32189L1.91349 11.5996L2.19469 11.4098Z" fill="#FEFBF8"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0_1_148">
                                        <rect width="11.9979" height="11.9979" fill="white" transform="translate(0.184082 0.444336)"/>
                                        </clipPath>
                                        </defs>
                                    </svg>
                                </span>
                            </Link>
                        </div>
                    </li>
                    <li>
                        <ul className="text-[20px] text-[#000] p-3 space-x-[2.4rem] flex">
                            {navLinks && navLinks.map((link,index) => 
                                <li data-aos="fade-left"
                                    data-aos-anchor="#example-anchor"
                                    data-aos-offset="500"
                                    data-aos-duration={`${300 + index * 100}`}
                                key={index} 
                                className={`transition-all duraction-[500] ease-in-out`}>
                                    <Link
                                    href={link.href} 
                                    className={`relative before:absolute before:-bottom-9 before:w-full before:h-[4px] before:bg-[#32CDF0] before:rounded-full before:scale-x-[0] before:origin-bottom-right hover:before:scale-x-[1] hover:before:origin-bottom-left before:transition-all before:duration-[300]
                                        ${locale === 'km' ? 'font-[krasar]' : 'font-[gotham]'}
                                        ${isActive(link) ? 'text-[#32CDF0] font-bold before:scale-x-[1]' : ''}
                                    `}>
                                        {t(link.name)}
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </li>
                    <li data-aos="fade-left"
                        data-aos-anchor="#example-anchor"
                        data-aos-offset="500"
                        data-aos-duration={`600`}
                    >
                        <Link href={`/${routing.defaultLocale}/search-page`} className='w-full h-full bg-black/40 rounded-full'>
                            <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.6211 13.6851L11.9426 10.0063C12.5676 9.01126 12.9303 7.8352 12.9303 6.57307C12.9303 3.00232 10.0356 0.108032 6.46503 0.108032C2.89442 0.108032 0 3.00232 0 6.57307C0 10.1439 2.89429 13.038 6.46503 13.038C7.83856 13.038 9.1108 12.6085 10.1577 11.8789L13.7924 15.5139C14.045 15.7662 14.3761 15.8918 14.7067 15.8918C15.0378 15.8918 15.3685 15.7662 15.6215 15.5139C16.1262 15.0086 16.1262 14.1902 15.6211 13.6851ZM6.46503 10.9434C4.05162 10.9434 2.09498 8.98688 2.09498 6.57333C2.09498 4.15979 4.05162 2.20315 6.46503 2.20315C8.87858 2.20315 10.8351 4.15979 10.8351 6.57333C10.8351 8.98688 8.87858 10.9434 6.46503 10.9434Z" fill="#00AFD7"/>
                            </svg>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
        {/* Mobile */}
        {/* menu */}
        <button onClick={handleClickOpen} className='xl:hidden fixed top-[30%] left-[-1%] md:left-[-0.5%] w-fit h-fit bg-[linear-gradient(85.15deg,_rgba(30,_30,_30,_0.8)_0.43%,_rgba(7,_32,_39,_0.64)_98.29%)] backdrop-blur-[10px] hover:bg-[#32CDF0] opacity-70 hover:opacity-100 text-white rounded-box shadow-sm drop-shadow-md  transition-all duration-300 p-2 rounded-r-full'>
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-menu-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6l16 0" /><path d="M4 12l16 0" /><path d="M4 18l16 0" /></svg>
        </button>

        {/* Navbar */}
        <div className="xl:hidden absolute left-0 right-0 w-full flex items-center px-3 space-x-3">
            <div className='w-full flex justify-between items-center  my-4'>
                <Link href={`/${routing.defaultLocale}/`} className={`${!isMenu ? 'opacity-100':'opacity-0'} transition-all duration-[300] ease-in-out`}>
                        <Image 
                            src="/logo.svg"
                            alt="banner"
                            width={80}
                            height={80}
                            quality={100}
                            priority
                            className={`w-[50px] h-[50px] object-contain object-center`}
                            />
                </Link>
                <div className='flex items-center gap-2'>
                    <Link href={`/${routing.defaultLocale}/search-page`} className='w-fit h-fit hover:bg-[#FAF8F7]/40 p-3 rounded-full'>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.6211 13.6851L11.9426 10.0063C12.5676 9.01126 12.9303 7.8352 12.9303 6.57307C12.9303 3.00232 10.0356 0.108032 6.46503 0.108032C2.89442 0.108032 0 3.00232 0 6.57307C0 10.1439 2.89429 13.038 6.46503 13.038C7.83856 13.038 9.1108 12.6085 10.1577 11.8789L13.7924 15.5139C14.045 15.7662 14.3761 15.8918 14.7067 15.8918C15.0378 15.8918 15.3685 15.7662 15.6215 15.5139C16.1262 15.0086 16.1262 14.1902 15.6211 13.6851ZM6.46503 10.9434C4.05162 10.9434 2.09498 8.98688 2.09498 6.57333C2.09498 4.15979 4.05162 2.20315 6.46503 2.20315C8.87858 2.20315 10.8351 4.15979 10.8351 6.57333C10.8351 8.98688 8.87858 10.9434 6.46503 10.9434Z" fill="#00AFD7"/>
                        </svg>
                    </Link>
                    {/* translate */}
                    <div>
                        <Translation />
                    </div>
                </div>
            </div>
        </div>
        <div className={`fixed inset-0 ${!isMenu ? 'w-0' : 'w-[50%]'} xl:hidden  h-full bg-[linear-gradient(85.15deg,_rgba(30,_30,_30,_0.8)_0.43%,_rgba(7,_32,_39,_0.64)_98.29%)] shadow-sm backdrop-blur-[10px] overflow-hidden transition-all duraction-[300] ease-in-out`}>
            <div className="flex justify-between">
                <Link href={`/${routing.defaultLocale}/`} className={`${!isMenu ? 'opacity-0':'opacity-100'} transition-all duration-[300] ease-in-out`}>
                    <Image 
                    src="/logo.svg"
                    alt="banner"
                    width={80}
                    height={80}
                    quality={100}
                    priority
                    className={`w-[60px] h-[60px] object-contain object-center m-3`}
                    />
                </Link>
                <button onClick={handleClickClose} className='w-fit h-fit hover:bg-black/30 text-white rounded-bl-full hover:pb-4 hover:ps-3 pt-1 pe-1 transition-all duration-300'>
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="32"  height="32"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>          
                </button>
            </div>

            <ul className="text-[20px] font-extrabold text-white p-3 space-y-5">
                {navLinks && navLinks.map((link,index) => 
                    <li key={index} className={`${!isMenu ? 'translate-x-[-100%]':'translate-x-0'} transition-all duraction-[500] ease-in-out`}>
                        <Link href={link.href} 
                        className={`relative before:absolute before:-bottom-1 before:w-full before:h-[3px] before:bg-[#32CDF0] before:rounded-full before:scale-x-[0] before:origin-bottom-right hover:before:scale-x-[1] hover:before:origin-bottom-left before:transition-all before:duration-[300]
                             ${locale === 'km' ? 'font-[krasar]' : 'font-[gotham]'}
                        ... ${pathname === link.href ? 'text-[#32CDF0] font-bold before:scale-x-[1]' : ''}
                        `}>
                            {t(link.name)}
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    </nav>
  )
}

export default Navbar