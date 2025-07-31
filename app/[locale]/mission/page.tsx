import Image from 'next/image'
import Navbar from "@/app/[locale]/components/Navbar";
import Footer from "@/app/[locale]/components/Footer";
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

const Mission = () => {
  const t = useTranslations('mission');
  const locale = useLocale();
  return (
    <div>
      <Navbar />
      <div className="relative flex flex-col justify-center items-center w-full h-full overflow-hidden px-3 py-[5rem] md:py-[10rem] xl:py-[20rem] 2xl:py-[28rem] z-1">
        <Image 
          src="/images/Banners/ms_banner.png"
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
      </div>

      <div className={`w-full h-fit bg-[#292929] p-5 ${locale === 'km' ? 'font-krasar':'font-gotham'}`}>
          <div className='flex gap-2 md:gap-[1rem] p-3 md:max-w-[720px] xl:max-w-[1200px] mx-auto'>
             <div className='w-[30%] md:w-[40%]'>
              <Image 
                data-aos="fade-right"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration={`400`}
                  src="/images/Banners/ms.png"
                  alt="banner"
                  width={1920}
                  height={1080}
                  quality={100}
                  sizes="100vw"
                  className="w-[30vh] h-[20vh] md:w-full md:h-full object-cover object-center"
                />
             </div>
             <div data-tip="Scroll For Read More" className='tooltip w-[70%] md:w-[60%] pe-2'>
                <h1 data-aos="fade-left"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration={`400`}
                 className='text-[16px] md:text-[24px] text-[#4FC9EE] font-bold'>{t('title')}</h1>
                <p data-aos="fade-right"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration={`600`}
                className='text-[12px] md:text-[18px] text-pretty text-[#fff] whitespace-pre-line w-full h-[14vh] lg:h-[20vh] overflow-y-auto'>
                  {t('content')}
                </p>
             </div>
          </div>

          <div className='flex gap-2 md:gap-[1rem] p-3 md:max-w-[720px] xl:max-w-[1200px] mx-auto'>
            <div  data-tip="Scroll For Read More" className='tooltip w-[70%] md:w-[60%] pe-2'>
                <h1 data-aos="fade-right"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration={`400`}
                 className='text-[16px] md:text-[24px] text-[#4FC9EE] font-bold'>{t('title_1')}</h1>
                <p data-aos="fade-right"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration={`600`}
                
                 className='text-[12px] md:text-[18px] text-pretty text-[#fff] whitespace-pre-line w-full h-[14vh] lg:h-[20vh] overflow-y-auto'>
                  {t('content_1')}
                </p>
             </div>
             <div className='w-[30%] md:w-[40%]'>
              <Image 
                  data-aos="fade-left"
                  data-aos-anchor="#example-anchor"
                  data-aos-offset="500"
                  data-aos-duration={`400`}
                  src="/images/Banners/ms_1.png"
                  alt="banner"
                  width={1920}
                  height={1080}
                  quality={100}
                  sizes="100vw"
                  className="w-[30vh] h-[20vh] md:w-full md:h-full object-cover object-center"
                />
             </div>
          </div>
      </div>

      <div className={`w-full h-fit bg-[#446EB6] ${locale === 'km' ? 'font-krasar':'font-gotham'}`}>
          <div className='flex flex-col md:flex-row'>
             <div data-aos="fade-right"
                  data-aos-anchor="#example-anchor"
                  data-aos-offset="500"
                  data-aos-duration={`400`}
             className='w-full md:w-[50%]'>
              <Image 
                  src="/images/Banners/ms_2.png"
                  alt="banner"
                  width={1920}
                  height={1080}
                  quality={100}
                  sizes="100vw"
                  className="w-full h-full object-cover object-center"
                />
             </div>
             <div className='w-full md:w-[50%] p-4 md:max-w-[720px] xl:max-w-[1200px] mx-auto'>
                <h1 data-aos="fade-right"
                    data-aos-anchor="#example-anchor"
                    data-aos-offset="500"
                    data-aos-duration={`400`}
                className='text-[16px] md:text-[24px] text-[#4FC9EE] font-bold'>{t('title_2')}</h1>
                <p data-aos="fade-left"
                    data-aos-anchor="#example-anchor"
                    data-aos-offset="500"
                    data-aos-duration={`600`}
                className='text-[12px] md:text-[18px] text-pretty text-[#fff] whitespace-pre-line'>
                  {t('content_2')}
                </p>
             </div>
          </div>
      </div>

      <div className={`w-full h-fit bg-[#fff] ${locale === 'km' ? 'font-krasar':'font-gotham'}`}>
          <div className='w-full p-4 md:max-w-[720px] xl:max-w-[1200px] mx-auto'>
              <p data-aos="fade-left"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration={`400`}
               className='text-[12px] md:text-[18px] text-pretty'>
                 {t('content_3')}
              </p>
              <div className='flex items-center justify-between'>
                <span className={`text-[50px] font-[700] text-[#4FC9EE] font-instrument`}>“”</span>
                <span className='text-[16px] text-[#4FC9EE] font-bold italic'>{t('Revelation')} 5:13</span>
              </div>
          </div>
      </div>
      <Footer />
    </div>
  )
}

export default Mission