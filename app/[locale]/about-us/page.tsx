import Image from 'next/image';
import Navbar from "@/app/[locale]/components/Navbar";
import Footer from "@/app/[locale]/components/Footer";
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

const Experience = [
  {id:1,year:'1975_1992', content:'1975_1992_content'},
  {id:2,year:'1968', content:'1968_content'},
  {id:3,year:'1962', content:'1962_content'},
  {id:4,year:'1955', content:'1955_content'},
  {id:5,year:'1954', content:'1954_content'},
  {id:6,year:'1923', content:'1923_content'},
  {id:7,year:'1899', content:'1899_content'},
  {id:8,year:'1892', content:'1892_content'},
  {id:9,year:'1804', content:'1804_content'},
]

export default function AboutUs () {
  const t = useTranslations('about_us');
  const locale = useLocale();
  return (
    <div>
      <Navbar />
      <div className="relative flex flex-col justify-center items-center w-full h-full overflow-hidden px-3 py-[6rem] md:py-[10rem] xl:py-[14rem]">
        <Image 
          src="/images/Banners/aboutus.png"
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

      <div className={`w-full max-w-[420px] md:max-w-[720px] xl:max-w-[1200px] mx-auto h-full translate-y-[-15%] xl:translate-y-[-30%] shadow-sm drop-shadow-md ${locale === 'km' ? 'font-krasar':'font-gotham'}`}>
          <div className="w-full h-full md:h-[36vh] xl:h-[60vh] 2xl:h-[50vh] flex flex-col md:flex-row overflow-hidden">
              <div className="w-full md:w-[50%] h-[25vh] md:h-full">
                <Image 
                    data-aos="fade-right"
                    data-aos-anchor="#example-anchor"
                    data-aos-duration={`400`}
                  src="/images/Banners/about_1.png"
                  alt="banner"
                  width={1920}
                  height={1080}
                  quality={100}
                  sizes="100vw"
                  className="w-full h-full object-cover object-center max-sm:rounded-t-[30px] md:rounded-l-[30px]"
                />
              </div>
              <div data-aos="fade-left"
                    data-aos-anchor="#example-anchor"
                    data-aos-duration={`600`}
              className="flex flex-col w-full md:w-[50%] h-full gap-[1rem] bg-[linear-gradient(0deg,_#4FC9EE,_#4FC9EE)] p-5 max-sm:rounded-b-[30px] md:rounded-r-[30px]">
                  <h1 className="text-[16px] md:text-[18px] xl:text-[32px] text-[#000000] font-[700] text-wrap">
                    {t('about_us_title')}
                  </h1>
                  <p className="text-[12px] md:text-[16px]">
                    {t('about_us_content')}                  
                  </p>
              </div>
          </div>
      </div>

      <div className='w-full max-w-[420px] md:max-w-[720px] xl:max-w-[1200px] mx-auto h-full pb-10'>
        <ul className={`space-y-[1rem] md:space-y-0 md:flex gap-5 flex-wrap items-start ${locale === 'km' ? 'font-krasar':'font-gotham'}`}>
          {Experience.map((items, index) =>
            <li key={index} 
            className={`flex flex-col xl:flex-row gap-2 w-full md:w-[48%] ${locale === 'km' ? 'font-krasar':'font-gotham'}`}>
              <h1 className='text-[#3cc2f8] text-[18px] font-bold text-nowrap w-[20%] text-end'>{t(items.year)}</h1>
              <p className='text-[14px] text-balance whitespace-pre-line w-[80%]'>
                  {t(items.content)}
              </p>
            </li>
          )}
        </ul>
      </div>

      <div className='w-full md:h-full flex flex-col md:flex-row'>
          <div className='w-full md:w-[40%]'>
              <Image 
                  data-aos="fade-right"
                  data-aos-anchor="#example-anchor"
                  data-aos-duration={`400`}
                  src="/images/Banners/about_2.png"
                  alt="banner"
                  width={1920}
                  height={1080}
                  quality={100}
                  sizes="100vw"
                  className="w-full h-full object-cover object-center"
                />
          </div>
          <div className='w-full md:w-[60%] h-full bg-[#50c9ee]'>
              <div className='flex flex-col gap-3 xl:gap-[5rem] p-3 md:p-10 xl:p-28'>
                <div className='w-full h-full xl:flex xl:gap-3'>
                  <span className='w-[20%] 2xl:w-[10%] mx-auto xl:mx-0'>
                  <Image 
                    data-aos="fade-right"
                    data-aos-anchor="#example-anchor"
                    data-aos-offset="500"
                    data-aos-duration={`400`}
                    src="/images/icons/ms.svg"
                    alt="banner"
                    width={1920}
                    height={1080}
                    quality={100}
                    sizes="100vw"
                    className="w-[46px] h-[46px] mx-auto xl:mx-0 lg:w-[64px] lg:h-[64px] object-cover object-center"
                  />
                  </span>
                  <ul className={`${locale === 'km' ? 'font-krasar':'font-gotham'}`}>
                      <li data-aos="fade-left"
                    data-aos-anchor="#example-anchor"
                    data-aos-offset="500"
                    data-aos-duration={`500`}>
                        <h1 className='text-[16px] md:text-[20px] xl:text-[32px] font-bold text-center xl:text-start'>
                            {t('our_mission')}
                        </h1>
                        <p className='text-[14px] md:text-[16px] xl:text-[20px] text-[#fff] text-center xl:text-start'>
                            {t('our_mission_content')}
                        </p>
                      </li>
                  </ul>
                </div>
                <div className='w-full h-full xl:flex xl:gap-3'>
                  <span className={`w-[20%] ${locale === 'km' ? 'lg:w-[42%] 2xl:w-[20%]':'lg:w-[58%] 2xl:w-[30%]'} mx-auto  xl:mx-0`}>
                  <Image 
                  data-aos="fade-left"
                  data-aos-anchor="#example-anchor"
                  data-aos-offset="500"
                  data-aos-duration={`400`}
                    src="/images/icons/vision.svg"
                    alt="banner"
                    width={1920}
                    height={1080}
                    quality={100}
                    sizes="100vw"
                    className="w-[46px] h-[46px] mx-auto xl:mx-0 lg:w-[64px] lg:h-[64px] object-cover object-center"
                  />
                  </span>
                  <ul className={`${locale === 'km' ? 'font-krasar':'font-gotham'}`}>
                      <li data-aos="fade-left"
                    data-aos-anchor="#example-anchor"
                    data-aos-offset="500"
                    data-aos-duration={`500`}
                      >
                        <h1 className='text-[16px] md:text-[20px] xl:text-[32px] font-bold text-center xl:text-start'>
                        {t('our_vision')}
                        </h1>
                        <p className='text-[14px] md:text-[16px] xl:text-[20px] text-[#fff] text-center xl:text-start'>
                          {t('our_vision_content')}
                        </p>
                      </li>
                  </ul>
                </div>
              </div>
          </div>
      </div>

      <div className={`w-full bg-gradient-to-r from-[#1E1E1E] to-[#413F3F] p-3 shadow drop-shadow-2xl ${locale === 'km' ? 'font-krasar':'font-gotham'}`}>
          <div className='p-3'>
            <span>
                    <Image 
                    data-aos="fade-right"
                    data-aos-anchor="#example-anchor"
                    data-aos-offset="500"
                    data-aos-duration={`400`}
                      src="/images/icons/core.svg"
                      alt="banner"
                      width={1920}
                      height={1080}
                      quality={100}
                      sizes="100vw"
                      className="w-[40px] mx-auto h-[40px] xl:w-[52px] xl:h-[52px] object-cover object-center"
                    />
              </span>
            <h1 data-aos="fade-left"
                    data-aos-anchor="#example-anchor"
                    data-aos-offset="500"
                    data-aos-duration={`500`}
            className='text-[18px] xl:text-[32px] text-[#4FC9EE] font-bold text-center'>
              {t('our_core_value')}
            </h1>
          </div>
          <ul className="w-full max-w-[520px] md:max-w-[720px] xl:max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-[1vw] justify-center p-10">
            <li data-aos="fade-right"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration={`400`} 
            >
              <h1 className='text-[20px] xl:text-[30px] font-bold text-[#575757]'>
                  {t('ocv_01')}
              </h1>
              <p className='text-[14px] xl:text-[20px] text-[#fff]'>
                {t('ocv_01_content')}
              </p>
            </li>
            <li data-aos="fade-right"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration={`500`}
            >
              <h1 className='text-[20px] xl:text-[30px] font-bold text-[#575757]'>
                {t('ocv_02')}
              </h1>
              <p className='text-[14px] xl:text-[20px] text-[#fff]'>
                {t('ocv_02_content')}
              </p>
            </li>
            <li data-aos="fade-right"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration={`600`} 
            >
              <h1 className='text-[20px] xl:text-[30px] font-bold text-[#575757]'>
                {t('ocv_03')}
              </h1>
              <p className='text-[14px] xl:text-[20px] text-[#fff]'>
                {t('ocv_03_content')}
              </p>
            </li>
            <li  data-aos="fade-right"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration={`700`}
            >
              <h1 className='text-[20px] xl:text-[30px] font-bold text-[#575757]'>
              {t('ocv_04')}
              </h1>
              <p className='text-[14px] xl:text-[20px] text-[#fff]'>
              {t('ocv_04_content')}
              </p>
            </li>
          </ul>
      </div>

      <div className={`w-full max-w-[420px] md:max-w-[720px] xl:max-w-[1200px] mx-auto p-3 md:p-8 ${locale === 'km' ? 'font-krasar':'font-gotham'}`}>
          <h1 data-aos="fade-right"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration={`400`}
          className='text-[18px] md:text-[24px] text-[#4FC9EE] font-bold capitalize'>
              {t('our_staff')}
            </h1>
          <p data-aos="fade-left"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration={`500`}
          className='text-[14px] md:text-[20px]'>
              {t('our_staff_content')}
          </p>
      </div>

      <div className='w-full'>
        <Image 
            src="/images/Banners/about_4.png"
          alt="banner"
          width={1920}
          height={1080}
          quality={100}
          sizes="100vw"
          className="w-full h-full object-cover object-center"
          />  
      </div>

      <div className={`w-full max-w-[420px] md:max-w-[720px] xl:max-w-[1200px] mx-auto p-3 md:p-8 ${locale === 'km' ? 'font-krasar':'font-gotham'}`}>
          <h1 data-aos="fade-right"
              data-aos-anchor="#example-anchor"
              data-aos-offset="500"
              data-aos-duration={`400`}
          className='text-[18px] md:text-[24px] text-[#4FC9EE] font-bold capitalize'>
            {t('our_board')}
          </h1>
          <p data-aos="fade-left"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration={`500`}
          className='text-[14px] md:text-[20px] whitespace-pre-line'>
            {t('our_board_content')}
          </p>
      </div>

      <div className='w-full'>
        <Image 
            src="/images/Banners/about_3.png"
          alt="banner"
          width={1920}
          height={1080}
          quality={100}
          sizes="100vw"
          className="w-full h-full object-cover object-center"
          />  
      </div>
      <Footer />
    </div>
  )
}