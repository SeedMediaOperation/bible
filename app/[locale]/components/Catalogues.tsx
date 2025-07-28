"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {CatalogueProps} from "@/types/catalogue";
import { useTranslations } from 'next-intl';
import { useLocale } from "next-intl";

const CatalogueCard = ({catalogue}:CatalogueProps) => {
    const t = useTranslations('catalogue');
    const locale = useLocale();
    return (
        <div className='w-full max-w-[340px] md:max-w-[520px] xl:max-w-[720px] mx-auto bg-[linear-gradient(85.15deg,_rgba(30,_30,_30,_0.8)_0.43%,_rgba(7,_32,_39,_0.64)_98.29%)] backdrop-blur-[10px] shadow-[0px_50px_50px_-40px_rgba(0,_0,_0,_0.25)] rounded-[30px] border-[2px] border-solid border-[#575757] translate-y-[-20%] md:translate-y-[-25%] xl:translate-y-[-35%] p-3 md:p-12'>
            <h1 className={`text-[16px] md:text-[24px] font-medium text-[#4FC9EE] ${locale === 'km' ? 'font-krasar':'font-gotham'}`}>{t('title')}</h1>
            <div className='w-full h-[30vh] md:h-fit flex flex-wrap justify-center gap-2 md:gap-[1rem] mt-2 overflow-y-auto overflow-x-hidden'>
                {catalogue && catalogue.map((cata, index) =>
                    <Link key={index}
                          href={`catalogue/${cata.slug}`}>
                        <div className='w-[80px] h-[70px]  md:w-[110px] md:h-[80px] xl:w-[140px] xl:h-[100px] mx-auto bg-white shadow drop-shadow-lg p-4 rounded-[20px]'>
                            <Image
                                src={cata.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(cata.name_en ?? '')}`}
                                alt={cata.name_en ?? ''}
                                width={1920}
                                height={1080}
                                quality={100}
                                sizes="100vw"
                                className="w-full h-full object-contain object-center"
                            />
                        </div>
                        <h1 className={`w-[90px] mx-auto text-center text-[12px] text-[#fff] uppercase text-wrap my-2 ${locale === 'km' ? 'font-krasar':'font-gotham'}`}>{locale === 'km'? cata.name_km : cata.name_en}</h1>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default CatalogueCard;
