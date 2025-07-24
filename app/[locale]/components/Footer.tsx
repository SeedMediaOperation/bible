'use client';

import React from 'react'
import Image from 'next/image'
import  Link  from 'next/link';
import { getLocale } from './Navbar';
import { getNavLinks } from './Navbar';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {routing} from "@/lib/i18n/routing";
const Footer = () => {
    const pathname = usePathname();
    const locale = getLocale(pathname); 
    const navLinks = getNavLinks(locale);
    const t = useTranslations('nav');
  return (
    <footer className='w-full bg-[#4FC9EE] p-0'>
        <div className='w-full max-w-[350px] md:max-w-[720px] xl:max-w-[1200px] mx-auto'>
          <ul className="grid grid-col-1 md:grid-cols-2 xl:grid-cols-4 xl:justify-center xl:items-start xl:gap-[1vw] list-none py-5">
            <li className='space-y-3'>
                <Image 
                    src="/images/icons/logo_black.svg"
                    alt="logo"
                    width={500}
                    height={500}
                    className="w-[100px] h-[100px] mx-auto "
                />
                <h1 className="text-[20px] text-[#ffffff] text-center font-bold my-1">Act Now</h1>
                <Link href={`/${routing.defaultLocale}/#home`} className='flex space-x-[3rem] w-fit mx-auto  bg-[#ffffff] rounded-full justify-between items-center ps-3 pe-2 py-1'>
                    <span className='text-[16px] text-[#4FC9EE] text-center font-bold ms-3'>Donate</span>
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
            </li>
            <li className='space-y-2'>
                <h1 className="text-[20px] text-[#000] text-start font-bold my-1">Bible Society Office</h1>
                <p className="text-[14px] text-[#fff]">
                    ផ្ទះលេខ 34 ផ្លូវ 104P6, សង្កាត់ភ្នំពេញថ្មី ខ័ណ្ឌសែនសុខ (ភ្នំពេញ)
                    34, Street 104P6,  Phnom Penh Thmey, Khan Sen Sok 
                    Phnom Penh
                </p>
                <p className="text-[14px] text-[#fff]">
                    ម៉ោងធ្វើការ Office Hours: ថ្ងៃច័ន្ទ - សុក្រ: ម៉ោង ៨:០០ - ១៦:៣០ MON - FRI : 08:00 - 16:30
                    ថ្ងៃសៅរ៍:​សូមទូរស័ព្ទណាត់ពេលទុកជាមុន​
                    Saturday: by appointment only
                </p>
                <Link href="https://biblecambodia.org/id.html" className='text-[12px] underline'>ព័ន្ធកិច្ចរបស់សមាគមព្រះគម្ពីរនៅព្រះរាជាណាចក្រកម្ពុជា</Link>
            </li>
            <li className='space-y-2 list-none'>
            <h1 className="text-[20px] text-[#000] text-start font-bold my-1">Infomation</h1>
                <ul className='flex flex-col space-y-3 text-white'>
                    { navLinks.map((link,index)=>
                        <li key={index}>
                            <Link href={link.href}>
                                {t(link.name)}
                            </Link>
                        </li>
                    )}
                </ul>
                <h1 className="text-[20px] text-[#000] text-start font-bold my-1">Follow Us</h1>
                <ul className='flex space-x-2 py-5'>
                    <li>
                        <Link href="/" className="shadow-sm drop-shadow-lg">
                            <Image 
                                src="/images/icons/facebook.svg"
                                alt="logo"
                                width={500}
                                height={500}
                                    className="w-[24px] h-[24px] mx-auto"
                                />
                        </Link>
                    </li>
                    <li>
                        <Link href="/" className="shadow-sm drop-shadow-lg">
                            <Image 
                                src="/images/icons/linkin.svg"
                                alt="logo"
                                width={500}
                                height={500}
                                    className="w-[24px] h-[24px] mx-auto"
                                />
                        </Link>
                    </li>
                    <li>
                        <Link href="/" className="shadow-sm drop-shadow-lg">
                            <Image 
                                src="/images/icons/x.svg"
                                alt="logo"
                                width={500}
                                height={500}
                                    className="w-[24px] h-[24px] mx-auto"
                                />
                        </Link>
                    </li>
                    <li>
                        <Link href="/" className="shadow-sm drop-shadow-lg">
                            <Image 
                                src="/images/icons/ing.svg"
                                alt="logo"
                                width={500}
                                height={500}
                                    className="w-[24px] h-[24px] mx-auto"
                                />
                        </Link>
                    </li>
                    <li>
                        <Link href="/" className="shadow-sm drop-shadow-lg">
                            <Image 
                                src="/images/icons/telegram.svg"
                                alt="logo"
                                width={500}
                                height={500}
                                    className="w-[24px] h-[24px] mx-auto"
                                />
                        </Link>
                    </li>
                </ul>
            </li>
            <li className="space-y-[1rem] list-none py-5 xl:py-0">
                <h1 className="text-[20px] text-[#000] text-start font-bold my-1">Infomation</h1>   
                <ul className="space-y-[1rem]">
                    <li className="text-[#fff]">
                        <p>www.biblecambodia.org</p>
                        <p>Email: info@biblecambodia.org</p>
                    </li>
                    <li className="text-[#fff]">
                        <p className="text-[16px] font-bold">Siem Reap Branch</p>
                        <p>Salakanseng Village, Sangakat Svay Dangkum- SIEM REAP 
                        Tel: 014- 73 74 59 / 069- 73 74 59</p>
                    </li>
                    <li className="text-[#fff]">
                        <p className="text-[16px] font-bold">Bible Distribution Center</p>
                        <p>
                            Ecumenical Diakonia Center 
                            No 19-21, Steet 330 Beung Keng Kang (opposit Tuol Sleng Museum) 
                            023-220 475
                        </p>
                    </li>
                </ul>
            </li>
          </ul>
        </div>
        <div className="w-full bg-[#292929] py-3">
        <h1 className="text-[14px] text-white text-center">
            © Bible Society in Cambodia {new Date().getFullYear()}
        </h1>
        </div>
    </footer>
  )
}

export default Footer