import React from 'react'
import Image from 'next/image'
import Navbar from "@/app/[locale]/components/Navbar";
import Footer from "@/app/[locale]/components/Footer";
import { useLocale, useTranslations } from 'next-intl';

const ContactUs = () => {
  const t = useTranslations('contact_us');
  const locale = useLocale();
  return (
    <div>
      <Navbar />
       <div className="relative flex flex-col justify-center w-full h-full overflow-hidden px-3 py-[5rem] md:py-[10rem] xl:py-[20rem] z-1">
          <Image 
            src="/images/Banners/read_banner.png"
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
              className={`text-[14px] md:text-[30px] text-[#4FC9EE] font-light font-[krasar]`}>សមាគមព្រះគម្ពីរកម្ពុជា</p>
              <h1 data-aos="fade-right"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration={`500`}
              className={`font-bold text-wrap text-[#ffffff]
                  font-[gotham] md:whitespace-pre-line ${locale === 'km' ? 'font-[krasar] text-[20px] md:text-[50px] xl:text-[5rem]':'font-[gotham] text-[20px] leading-[20px] md:text-[50px] md:leading-[50px]  xl:text-[5rem] xl:leading-[5rem]'}
                `}>{t('welcome')}</h1>
            </div>
            <p data-aos="fade-left"
              data-aos-anchor="#example-anchor"
              data-aos-offset="500"
              data-aos-duration={`600`}
            className={`w-fit text-[14px] xl:text-[24px] text-[#ffffff] font-[400] ${locale === 'km' ? 'font-[krasar]':'font-[gotham]'}`}>
              {t('quote')}
            </p>
        </div>
        </div>
        <Footer />
    </div>
  )
}

export default ContactUs