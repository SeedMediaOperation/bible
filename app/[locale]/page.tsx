'use client';

import Image from "next/image";
import Donate from "./components/Donate";
import  Link  from 'next/link';
import Navbar from "@/app/[locale]/components/Navbar";
import Footer from "@/app/[locale]/components/Footer";
import {Version} from "@/types/book";
import {useEffect, useState} from "react";
import {useLocale, useTranslations} from "next-intl";
import { ReadingDate } from "@/types/reading";

export default function Home() {
    const [version, setVersion] = useState<Version[]>([]);
    const [rod, setROD] = useState<ReadingDate[]>([]);
    const t = useTranslations('home');
    const locale = useLocale();
    useEffect(() => {
        const fetchVersion = async () => {
            try {
                const res = await fetch('/api/books/versions', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch versions');
                }

                const data = await res.json();
                setVersion(data.data); // Adjust this based on your actual response structure
            } catch (error) {
                console.error('Error fetching versions:', error);
            }
        };

        const fetchDOR = async () => {
          try {
              const res = await fetch('/api/reading-date', {
                  method: 'GET',
                  headers: { 'Content-Type': 'application/json' },
              });

              if (!res.ok) {
                  throw new Error('Failed to fetch versions');
              }

              const data = await res.json();
              setROD(data.data); // Adjust this based on your actual response structure
          } catch (error) {
              console.error('Error fetching date of reading:', error);
          }
      };
        fetchDOR();
        fetchVersion();
    }, []);

  return (
    <>
      <Navbar />
      <section id="home" className="relative flex flex-col justify-center items-center w-full h-full overflow-hidden px-3 py-[6rem] md:py-[10rem] xl:py-[14rem] z-1">
        <Image
          src="/images/Banners/banner.png"
          alt="banner"
          fill
          quality={100}
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="relative flex justify-between items-center max-w-[350px] md:max-w-[720px] xl:max-w-[1200px] md:space-x-[8rem] xl:space-x-[14rem]">
            <div>
              <p data-aos="fade-right"
              data-aos-anchor="#example-anchor"
              data-aos-offset="500"
              data-aos-duration={`400`}
              className={`text-[14px] md:text-[30px] text-[#4FC9EE] font-light font-krasar`}>សមាគមព្រះគម្ពីរកម្ពុជា</p>
              <h1 data-aos="fade-right"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration={`500`}
              className={`font-bold text-wrap text-[#ffffff]
                   md:whitespace-pre-line ${locale === 'km' ? 'font-krasar text-[20px] md:text-[50px] xl:text-[5rem]':'font-gotham text-[20px] leading-[20px] md:text-[50px] md:leading-[50px]  xl:text-[5rem] xl:leading-[5rem]'}
                `}>{t('welcome')}</h1>
            </div>
            <p data-aos="fade-left"
              data-aos-anchor="#example-anchor"
              data-aos-offset="500"
              data-aos-duration={`600`}
            className={`w-fit text-[14px] xl:text-[24px] text-[#ffffff] font-[400] ${locale === 'km' ? 'font-krasar':'font-gotham'}`}>
              {t('quote')}
            </p>
        </div>
      </section>

      <div className="w-full h-fit pb-[10rem] xl:pb-[12rem]">
         <Donate />
         <div className={`w-full max-w-[350px] md:max-w-[720px] xl:max-w-[1200px] mx-auto px-3 flex flex-wrap ${locale === 'km' ? 'font-krasar':'font-gotham'}`}>
            <div className="w-full md:w-[30%]">
              <span
              >
                <Image 
                  data-aos="fade-down"
                  data-aos-offset="500"
                  data-aos-duration={`400`}
                  src="/images/icons/mission.svg"
                  alt="banner"
                  width={1920}
                  height={1080}
                  quality={100}
                  className="w-[50px] h-[50px] xl:w-[100px] xl:h-[100px] object-cover object-center p-2"
              />
              </span>
              <h1 data-aos="fade-right"
              data-aos-offset="500"
              data-aos-duration={`500`}
              className="text-[20px] md:text-[30px] xl:text-[40px] text-[#4FC9EE] font-[700] text-wrap">
                {t('sop')}
              </h1>
            </div>
            <div data-aos="fade-left"
              data-aos-offset="500"
              data-aos-duration={`500`}
            className="w-full md:w-[70%]">
                <p className="text-[10px] md:text-[14px] xl:text-[20px] text-justify text-[#000]">
                  {t('sop_content')}
                </p>
            </div>
         </div>
      </div>

      <div className="w-full h-fit bg-[linear-gradient(85.15deg,_rgba(30,_30,_30,_0.8)_0.43%,_rgba(7,_32,_39,_0.64)_98.29%)]">
        <div className="w-full max-w-[350px] md:max-w-[720px] xl:max-w-[1200px] mx-auto h-full translate-y-[-20%] md:translate-y-[-28%]">
          <div className="w-full h-fit md:h-[35vh] lg:h-[30vh] xl:h-[50vh] 2xl:h-[40vh] flex flex-col md:flex-row overflow-hidden pb-5">
              <div data-aos="fade-right"
                data-aos-offset="500"
                data-aos-duration={`200`}
               className="w-full max-sm:h-[32vh] md:w-[40%] md:h-full">
                <Image 
                  src="/images/Banners/banner_1.png"
                  alt="banner"
                  width={1920}
                  height={1080}
                  quality={100}
                  sizes="100vw"
                  className="w-full h-full object-cover object-center max-sm:rounded-t-[30px] md:rounded-l-[30px]"
                />
              </div>
              <div data-aos="fade-left"
                data-aos-offset="500"
                data-aos-duration={`400`}
              className="flex flex-col xl:flex-row w-full md:w-[60%] md:h-full gap-[1rem] bg-[linear-gradient(0deg,_#4FC9EE,_#4FC9EE)] p-5 md:p-3 max-sm:rounded-b-[30px] md:rounded-r-[30px]">
                  <div data-aos="fade-right"
                data-aos-offset="500"
                data-aos-duration={`400`}
                  className="w-[100%] xl:w-[30%] flex xl:flex-col xl:justify-between items-center xl:items-start xl:ps-5 xl:py-5">
                    <span>
                      <Image 
                        src="/images/icons/time.svg"
                        alt="banner"
                        width={1920}
                        height={1080}
                        quality={100}
                        className="w-[50px] h-[50px] xl:w-[100px] xl:h-[100px] object-cover object-center p-2"
                    />
                    </span>
                    <h1 className={`text-[16px] xl:text-[30px] text-[#000000] font-[700] text-wrap ${locale === 'km' ? 'font-krasar':'font-gotham'}`}>{t('dsr')}</h1>
                  </div>
                  <div className="w-[100%] xl:w-[70%]">
                    <ul className="text-[#fff] space-y-1">
                      {rod && rod.map((item) => 
                      <li key={item.id} data-aos="fade-left"
                        data-aos-offset="500"
                        data-aos-duration={`600`} 
                      className="text-[14px] xl:text-[23px] hover:bg-[#00AFD7]/70 py-2 px-5 xl:px-10 font-krasar rounded-full">
                        {locale === 'km' ? item.title_km : item.title_en}
                      </li>
                      )}
                    </ul>
                  </div>
              </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full max-w-[350px] md:max-w-[720px] xl:max-w-[1200px] mx-auto gap-4 pb-10 xl:pb-0 md:translate-y-[-30%] xl:translate-x-0">
          <div className={`max-sm:translate-y-[-40%] xl:w-[30%] ${locale === 'km' ? 'font-krasar':'font-gotham'}`}>
              <h1 data-aos="fade-right"
                data-aos-offset="500"
                data-aos-duration={`200`}
              className="text-[20px] xl:text-[40px] xl:w-[300px] text-[#fff] font-bold">
                {t('rkbo')}
              </h1>
              <p data-aos="fade-right"
                data-aos-offset="500"
                data-aos-duration={`300`}
              className="text-[12px] xl:text-[18px] text-[#fff]">
                {t('rkbo_content')}
              </p>
              <div className="flex gap-2 mt-2">
                <Link href="https://play.google.com/store/apps/details?id=khmerbible.khm.org&hl=en&pli=1">
                  <Image 
                  data-aos="fade-right"
                  data-aos-offset="500"
                  data-aos-duration={`500`}
                    src="/images/icons/android.png"
                    alt="banner"
                    width={500}
                    height={500}
                    quality={100}
                    sizes="100vw"
                    className="w-[10vh] h-full object-cover object-center"
                  />
                </Link>
                <Link href="https://apps.apple.com/kh/app/khmer-bible-app/id1409575588">
                  <Image 
                  data-aos="fade-right"
                  data-aos-offset="500"
                  data-aos-duration={`400`}
                    src="/images/icons/appstore.png"
                    alt="banner"
                    width={500}
                    height={500}
                    quality={100}
                    sizes="100vw"
                    className="w-[10vh] h-full object-cover object-center"
                  />
                </Link>
              </div>
          </div>
          <div className={`flex xl:w-[70%] shadow-sm drop-shadow-lg ${locale === 'km' ? 'font-krasar':'font-gotham'}`}>
            <div className="w-[60%]">
              <ul className="grid grid-cols-2 justify-center w-full h-full items-center">
                {version.map((category, index) => {
                  let bgColor = 'bg-[#71C6A5] col-span-1';

                  if (category.slug === 'you-version-app') {
                    bgColor = 'bg-[#446EB6] col-span-2';
                  } else if (category.slug === 'khmer-old-version-khov') {
                    bgColor = 'bg-[#4FC9EE] col-span-1';
                  }

                  return (
                    <li key={index} 
                    data-aos="fade-right"
                    data-aos-offset="500"
                    data-aos-duration={`${300 + index * 100}`} whitespace-pre-line
                    className={`${bgColor} w-full h-full p-3`}>
                      <div className="flex flex-col">
                        <div>
                          <h1 className="text-[16px] md:text-[14px] xl:text-[20px] text-white">
                            {locale === 'en' ? category.titleEn : category.titleKm}
                          </h1>
                        </div>
                        <Link
                          href={`${locale}/${category.slug}`}
                          className="w-fit bg-white text-[12px] xl:text-[24px] text-black rounded-full px-[15px] py-[2px] xl:px-[24px] mt-2"
                        >
                          {t('read')}
                        </Link>
                      </div>
                    </li>
                  );
                })}

              </ul>
            </div>
            <div data-aos="fade-left"
                data-aos-offset="500"
                data-aos-duration={`600`}
            className="w-[40%]">
                <Image 
                    src="/images/Banners/banner_2.png"
                    alt="banner"
                    width={500}
                    height={500}
                    quality={100}
                    sizes="100vw"
                    className="w-full h-full object-cover object-center"
                  />
            </div>
          </div>
        </div>
      </div>

      <div className={`w-full h-fit max-w-[350px] md:max-w-[720px] xl:max-w-[1200px] mx-auto py-10 px-5 ${locale === 'km' ? 'font-krasar':'font-gotham'}`}>
           <div className="flex flex-col xl:flex-row space-y-5 xl:space-x-5">
              <div className="w-full xl:w-[20%]">
                <div className="flex flex-row xl:flex-col space-x-2 justify-center items-center xl:justify-start xl:items-start">
                      <span>
                        <Image 
                        data-aos="fade-right"
                        data-aos-offset="500"
                        data-aos-duration={`300`}
                          src="/images/icons/fb.svg"
                          alt="banner"
                          width={1920}
                          height={1080}
                          quality={100}
                          className="w-[50px] h-[50px] xl:w-[150px] xl:h-[150px] object-cover object-center p-2"
                      />
                      </span>
                      <h1 data-aos="fade-right"
                data-aos-offset="500"
                data-aos-duration={`400`}
                      className="text-[16px] xl:text-[34px] text-[#4FC9EE] font-[700] text-wrap">
                         {t('ofb')}
                      </h1>
                </div>
              </div>
              <div className="w-full xl:w-[80%]">
                <ul className="grid grid-cols-2 xl:grid-cols-3 justify-center gap-4 md:gap-[3rem] text-[#000]">
                  <li data-aos="fade-left"
                data-aos-offset="500"
                data-aos-duration={`200`} 
                  className="relative w-full text-[12px] xl:text-[16px] before:absolute before:content-[''] before:left-[-10px] before:top-0 before:right-0 before:w-[3px] before:h-full before:rounded-full before:bg-[#4FC9EE] whitespace-pre-line">
                     {t('ofb_content_1')}
                  </li>
                  <li data-aos="fade-left"
                data-aos-offset="500"
                data-aos-duration={`300`} 
                  className="w-full relative text-[12px] xl:text-[16px] before:absolute before:content-[''] before:left-[-10px] before:top-0 before:right-0 before:w-[3px] before:h-full before:rounded-full before:bg-[#4FC9EE] whitespace-pre-line">
                    {t('ofb_content_2')}                  
                    </li>
                  <li data-aos="fade-left"
                data-aos-offset="500"
                data-aos-duration={`400`} 
                  className="relative w-full text-[12px] xl:text-[16px] before:absolute before:content-[''] before:left-[-10px] before:top-0 before:right-0 before:w-[3px] before:h-full before:rounded-full before:bg-[#4FC9EE] whitespace-pre-line">
                      {t('ofb_content_3')}
                  </li>
                  <li data-aos="fade-left"
                data-aos-offset="500"
                data-aos-duration={`500`} 
                  className="w-full relative text-[12px] xl:text-[16px] before:absolute before:content-[''] before:left-[-10px] before:top-0 before:right-0 before:w-[3px] before:h-full before:rounded-full before:bg-[#4FC9EE] whitespace-pre-line">
                      {t('ofb_content_4')}
                      </li>
                  <li data-aos="fade-left"
                data-aos-offset="500"
                data-aos-duration={`600`} 
                  className="relative w-full text-[12px] xl:text-[16px] before:absolute before:content-[''] before:left-[-10px] before:top-0 before:right-0 before:w-[3px] before:h-full before:rounded-full before:bg-[#4FC9EE] whitespace-pre-line">
                      {t('ofb_content_5')}
                      </li>
                  <li data-aos="fade-left"
                data-aos-offset="500"
                data-aos-duration={`700`} 
                  className="w-full relative text-[12px] xl:text-[16px] before:absolute before:content-[''] before:left-[-10px] before:top-0 before:right-0 before:w-[3px] before:h-full before:rounded-full before:bg-[#4FC9EE] whitespace-pre-line">
                      {t('ofb_content_6')}
                      </li>
                </ul>
              </div>
           </div>
      </div>

       <div className={`w-full h-fit max-w-[350px] md:max-w-[720px] xl:max-w-[1200px] mx-auto my-[1.5rem] px-3 py-[2rem] overflow-hidden ${locale === 'km' ? 'font-krasar':'font-gotham'}`}>
          <div className="flex flex-col xl:flex-row gap-5 w-full h-full overflow-hidden">
              <div className="flex flex-col gap-5 w-full xl:w-[60%]">
                <div className="w-full h-full">
                  <div className="w-full h-full flex flex-col md:flex-row">
                      <Image 
                        data-aos="fade-right"
                        data-aos-offset="500"
                        data-aos-duration={`500`}
                          src="/images/Banners/banner_3.png"
                          alt="banner"
                          width={1920}
                          height={1080}
                          quality={100}
                          className="w-full md:w-[50%] h-full object-cover object-center"
                      />
                      <div data-aos="fade-left"
                data-aos-offset="500"
                data-aos-duration={`600`}
                      className="w-full md:w-[50%] p-4 bg-[#00AFD7] space-y-[1rem] transition-all duration-300">
                          <h1 className="text-[16px] text-[#ffffff] text-balance font-bold">
                          {t('ofb_title')}
                          </h1>
                          <div className="w-full h-[120px] md:h-[130px] xl:h-[200px] overflow-x-hidden overflow-y-auto">
                            <p className="text-[14px] text-[#ffffff] text-balance my-3">
                            {t('ofb_content_7')}
                            </p>
                          </div>
                      </div>
                  </div>
                </div>

                <div 
                className="w-full h-full">
                  <div className="w-full h-full flex flex-col md:flex-row">
                      <Image 
                          data-aos="fade-right"
                          data-aos-offset="500"
                          data-aos-duration={`500`}
                          src="/images/Banners/banner_5.png"
                          alt="banner"
                          width={1920}
                          height={1080}
                          quality={100}
                          className="w-full md:w-[50%] h-full object-cover object-center"
                      />
                      <div data-aos="fade-left"
                        data-aos-offset="500"
                        data-aos-duration={`600`}
                      className="w-full md:w-[50%] md:order-first xl:order-last p-4 bg-[#71c7a5] space-y-[1rem] transition-all duration-300">
                          <h1 className="text-[16px] text-[#ffffff] text-balance font-bold">
                          {t('ofb_title_1')}
                          </h1>
                          <div className="w-full h-[120px] md:h-[130px] xl:h-[200px] overflow-x-hidden overflow-y-auto">
                            <p className="text-[14px] text-[#ffffff] text-balance my-3">
                            {t('ofb_content_8')}
                            </p>
                          </div>
                      </div>
                  </div>
                </div>
              </div>
              <div
               className="w-full h-full xl:w-[40%]">
                <div className="w-full md:h-[30vh] xl:h-full flex flex-col md:flex-row xl:flex-col">
                    <Image 
                        data-aos="fade-down"
                        data-aos-offset="500"
                        data-aos-duration={`500`}
                        src="/images/Banners/banner_4.png"
                        alt="banner"
                        width={1920}
                        height={1080}
                        quality={100}
                         className="w-full md:w-[50%] xl:w-full h-full object-cover object-center"
                    />
                    <div data-aos="fade-up"
                          data-aos-offset="500"
                          data-aos-duration={`500`}
                     className="w-full md:w-[50%] xl:w-full h-full xl:h-[30vh] p-4 bg-[#456eb6] space-y-[1rem] transition-all duration-300">
                        <h1 className="text-[16px] text-[#ffffff] text-balance font-bold">
                        {t('ofb_title_2')}
                        </h1>
                        <div className="w-full h-[120px] md:h-[130px] xl:h-[200px] overflow-x-hidden overflow-y-auto">
                          <p className="text-[14px] text-[#ffffff] text-balance my-3">
                          {t('ofb_content_9')}
                          </p>
                        </div>
                    </div>
                </div>
              </div>
          </div>
      </div>

      <Footer />
    </>
  );
}
