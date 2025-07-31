import React from 'react'
import Image from 'next/image'
import Navbar from "@/app/[locale]/components/Navbar";
import Footer from "@/app/[locale]/components/Footer";
import { useLocale, useTranslations } from 'next-intl';

const ContactUs = () => {
  const t = useTranslations('contact_us');
  const locale = useLocale();
  const footer = useTranslations('footer');
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
           <div className="relative flex justify-between items-center max-w-[350px] md:max-w-[720px] xl:max-w-[1200px] md:space-x-[8rem] xl:space-x-[14rem] mx-auto">
            <div>
              <p data-aos="fade-right"
              data-aos-anchor="#example-anchor"
              data-aos-offset="500"
              data-aos-duration={`400`}
              className={`text-[14px] md:text-[30px] text-[#4FC9EE] font-light font-krasar`}>សមាគមព្រះគម្ពីរនៅកម្ពុជា</p>
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
        </div>

        <div className={`w-full max-w-[420px] md:max-w-[720px] xl:max-w-[1200px] mx-auto h-full my-[1rem] ${locale === 'km' ? 'font-krasar':'font-gotham'} flex flex-wrap gap-[1rem] justify-center`}>
            <div className='w-full lg:w-[48%]'>
              <h1 data-aos="fade-right"
                  data-aos-anchor="#example-anchor"
                  data-aos-offset="500"
                  data-aos-duration={`500`}
                className={`font-bold text-wrap text-[#50c9ee]
                    md:whitespace-pre-line ${locale === 'km' ? 'font-krasar text-[20px]':'font-gotham text-[20px] leading-[20px]'}
                  `}>{footer('siem_reap')}</h1>
                  <iframe className='w-full h-[30vh] md:h-[50vh] my-3' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5271.460803358791!2d103.8543079!3d13.376731399999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31101703918716ff%3A0x2871b10be0d842dd!2sThe%20Bible%20Society%20in%20Cambodia%2C%20Siem%20Reap!5e1!3m2!1sen!2skh!4v1753933203503!5m2!1sen!2skh"  loading="lazy"></iframe>
            </div>
            <div className='w-full lg:w-[48%]'>
              <h1 data-aos="fade-right"
                  data-aos-anchor="#example-anchor"
                  data-aos-offset="500"
                  data-aos-duration={`500`}
                className={`font-bold text-wrap text-[#50c9ee]
                    md:whitespace-pre-line ${locale === 'km' ? 'font-krasar text-[20px]':'font-gotham text-[20px] leading-[20px]'}
                  `}>{footer('Bible_Distribution_Center')}</h1>
                  <iframe className='w-full h-[30vh] md:h-[50vh] my-3' src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d663.5346877170442!2d104.8583901!3d11.574516!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951e8cd21db71%3A0xd83eb18e9b850632!2sThe%20Bible%20Society%20in%20Cambodia!5e1!3m2!1sen!2skh!4v1753933347744!5m2!1sen!2skh" loading="lazy"></iframe>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default ContactUs