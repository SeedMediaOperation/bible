'use client';

import Image from "next/image";
import React, {useEffect} from "react";
import {CataProps} from "@/types/catalogue";
import Link from "next/link";
import {useRouter, useSearchParams} from "next/navigation";
import { useLocale } from "next-intl";

export default function CataBook({params, versions,catabook, catalogue}:CataProps) {
    const searchParams = useSearchParams();
    const version = searchParams.get('version');
    const router = useRouter();
    const locale = useLocale();
    
    // ✅ Redirect if no versions query
    useEffect(() => {
        if (!version && params?.slug) {
            router.push(`${params.slug}?version=standard-versions`);
          }
    }, [version, params?.slug, router]);

    // Fallback versions if you don't present yet (to avoid undefined errors)
    const currentVersion = version || 'standard-versions';
    const catalogueIds = catalogue?.find((item) => item.slug === params?.slug);
    
    
    const filteredBook = catabook.filter(
        (catabook) =>
            catabook.catalogueId === catalogueIds?.id &&
            catabook.version === currentVersion
    );

    return (
        <div className="w-full h-fit bg-white">
        <div className="w-full max-w-[340px] md:max-w-[720px] lg:max-w-[820px] xl:max-w-[1100px] mx-auto bg-[linear-gradient(85.15deg,_rgba(30,_30,_30,_0.8)_0.43%,_rgba(7,_32,_39,_0.64)_98.29%)] backdrop-blur-[10px] shadow-[0px_50px_50px_-40px_rgba(0,_0,_0,_0.25)] rounded-[30px] border-[2px] border-solid border-[#575757] translate-y-[-12%] md:translate-y-[-23%] p-4">
            <div className="w-full flex gap-3 pb-2">
                {versions && versions.map((vs,index) => (
                    <Link
                        key={index}
                        href={`${params?.slug}?version=${vs.slug}`}
                        className={`w-full text-center text-md md:text-xl px-2 py-[7px] md:py-[12px] rounded-full ${
                            version === vs.slug
                                ? 'bg-[#32CDF0] text-white'
                                : 'bg-white text-black'
                        } ${locale === 'km' ? 'font-krasar':'font-gotham'}`}
                    >
                        {locale === 'km'? vs.name_km : vs.name_en}
                    </Link>
                ))}
            </div>

            <div className="w-full h-[40vh] xl:h-[58vh] 2xl:h-[50vh] flex flex-wrap gap-4 justify-center mt-2 overflow-y-auto overflow-x-hidden">
                {filteredBook.length === 0 ? (
                    <p className="text-white text-center text-sm md:text-xl">No books found.</p>
                ) : (
                    filteredBook.map((cata, index) => (
                        <div key={cata.id}
                             data-aos="fade-left"
                             data-aos-anchor="#example-anchor"
                             data-aos-offset="500"
                             data-aos-duration={`${300 + index * 100}`}
                             className="w-full md:w-[48%] xl:w-[32%] h-full  bg-white shadow drop-shadow-lg p-4 rounded-[20px]">
                            <div className="w-full h-fit mx-auto bg-[#E4E4E4] p-3 rounded-[20px]">
                                <Image
                                    src={cata.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(cata.name_en ?? '')}`}
                                    alt={cata.name_en ?? ''}
                                    width={1920}
                                    height={1080}
                                    quality={100}
                                    sizes="100vw"
                                    className="w-[15vh] h-[15vh] md:w-[16vh] md:h-[16vh] xl:w-[20vh] xl:h-[20vh] mx-auto object-contain object-center"
                                />
                            </div>
                            <h1 className={`w-fit text-[12px] md:text-[18px] xl:text-[20px] text-[#000] uppercase text-wrap font-bold my-2 ${locale === 'km' ? 'font-krasar':'font-gotham'}`}>
                                {locale === 'km' ? cata.name_km : cata.name_en}
                            </h1>
                            <p className={`text-[14px] md:text-[16px] ${locale === 'km' ? 'font-krasar':'font-gotham'}`}>({locale === 'km' ? cata.type_km :cata.type_en})</p>
                            <p className={`text-[14px] md:text-[16px] ${locale === 'km' ? 'font-krasar':'font-gotham'}`}>Size: {locale === 'km' ? cata.size_km :cata.size_en}</p>
                            <p className={`text-[14px] md:text-[16px] ${locale === 'km' ? 'font-krasar':'font-gotham'}`}>UBS Code: {locale === 'km' ? cata.code :cata.code}</p>
                            <p className={`text-[14px] md:text-[16px] ${locale === 'km' ? 'font-krasar':'font-gotham'}`}>ISBN: {locale === 'km' ? cata.isbn :cata.isbn}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    </div>
    )
}