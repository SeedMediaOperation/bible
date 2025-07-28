"use client";

import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

const Translation = () => {
    const [isKmActive, setIsKmActive] = useState<boolean>(true);
    const pathname = usePathname();
    const router = useRouter();
    const locale = useLocale();
    const setToLocalStorage = (locale:string) => {
        localStorage.setItem("locale", locale);
      };

        // Get locale from localStorage
    const getFromLocalStorage = () => {
        return localStorage.getItem("locale") || "en"; // Default to "kh"
    };

    // Initialize locale from localStorage
    useEffect(() => {
        const savedLocale = getFromLocalStorage();
        setIsKmActive(savedLocale === "km");
    }, []);

    const triggerKmClick = () => {
      const newLocale = isKmActive ? 'en' : 'km';
    
      setToLocalStorage(newLocale);
      setIsKmActive(!isKmActive);
    
      // Replace only the first segment of the path
      const updatedPath = pathname.replace(/^\/(en|km)/, `/${newLocale}`);
    
      router.replace(updatedPath);
    };
  
  
  return (
    <div data-aos="fade-left" className='w-full max-w-[1200px] mx-auto pe-10 flex justify-end items-center gap-3'>
        <div className='w-[30px] h-[30px] rounded-full overflow-hidden'>
                            <Image 
                                src={`${isKmActive ? "/images/icons/kh-flag.png" : "/images/icons/usa-flag.png" }`}
                                alt="banner"
                                width={80}
                                height={80}
                                quality={100}
                                priority
                                className={`w-full h-full object-cover object-center rounded-full`}
                                />
        </div>
        <div className={`inline-flex space-x-2 font-normal ${locale === 'km' ? 'font-krasar':'font-gotham'}`}>
                    <button onClick={triggerKmClick} disabled={isKmActive}
                    className={!isKmActive ? 'text-gray-300' : 'text-white font-bold' }>{locale ==='km' ? 'ភាសាខ្មែរ':'Khmer'}</button>
                    <button onClick={triggerKmClick} disabled={!isKmActive}
                            className={isKmActive ? 'text-gray-300' : 'text-white font-bold' }>{locale ==='km' ? 'ភាសាអង់គ្លេស':'English'}
                    </button>
        </div>
    </div>
  )
}

export default Translation