import Image from 'next/image'
import React from 'react'
import Navbar from "@/app/[locale]/components/Navbar";
import Footer from "@/app/[locale]/components/Footer";

const Mission = () => {
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
        <div className="relative flex justify-between items-center md:max-w-[720px] xl:max-w-[1200px]">
            <div data-aos="fade-right"
                data-aos-anchor="#example-anchor"
                data-aos-duration={`400`}
            >
              <span className="text-[14px] md:text-[22px] text-[#4FC9EE] font-light ">សមាគមព្រះគម្ពីរកម្ពុជា</span>
              <h1 className="text-[30px] leading-[30px] md:text-[50px] md:leading-[50px] lg:text-[60px] lg:leading-[60px] xl:text-[70px] xl:leading-[70px] font-bold text-wrap text-[#ffffff] capitalize">
                The Bible Society in Cambodia.
              </h1>
            </div>
            <p data-aos="fade-left"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration={`500`}
            className="text-[14px] md:text-[24px] text-[#ffffff] font-[400]">
              GOD’S WORD
              Living Hope for All.
            </p>
        </div>
      </div>

      <div className='w-full h-fit bg-[#292929] p-5'>
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
             <div className='w-[70%] md:w-[60%] pe-2'>
                <h1 data-aos="fade-left"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration={`400`}
                 className='text-[16px] md:text-[24px] text-[#4FC9EE] font-bold'>What makes us unique</h1>
                <p data-aos="fade-right"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration={`600`}
                className='text-[12px] md:text-[18px] text-pretty text-[#fff]'>
                  We are the integrated Bible agency  we translate, publish and distribute Bibles, we help people understand its message and we help to ensure the continuing credibility of the Bible in society
                  We have unprecedented global reach  we meet people’s needs for Holy Scriptures in more than 200 countries and territories
                </p>
             </div>
          </div>

          <div className='flex gap-2 md:gap-[1rem] p-3 md:max-w-[720px] xl:max-w-[1200px] mx-auto'>
            <div className='w-[70%] md:w-[60%] pe-2'>
                <h1 data-aos="fade-right"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration={`400`}
                 className='text-[16px] md:text-[24px] text-[#4FC9EE] font-bold'>What makes us unique</h1>
                <p data-aos="fade-right"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration={`600`}
                 className='text-[12px] md:text-[18px] text-pretty text-[#fff]'>
                  We are the integrated Bible agency  we translate, publish and distribute Bibles, we help people understand its message and we help to ensure the continuing credibility of the Bible in society
                  We have unprecedented global reach  we meet people’s needs for Holy Scriptures in more than 200 countries and territories
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

      <div className='w-full h-fit bg-[#446EB6]'>
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
                className='text-[16px] md:text-[24px] text-[#4FC9EE] font-bold'>What makes us unique</h1>
                <p data-aos="fade-left"
                    data-aos-anchor="#example-anchor"
                    data-aos-offset="500"
                    data-aos-duration={`600`}
                className='text-[12px] md:text-[18px] text-pretty text-[#fff]'>
                  We are the integrated Bible agency – we translate, publish and distribute Bibles, we help people understand its message and we help to ensure the continuing credibility of the Bible in society
                  We have unprecedented global reach – we meet people’s needs for Holy Scriptures in more than 200 countries and territories
                  We are inter-confessional – we work with all Christian churches
                  We are developing leading technology – we apply the best technological solutions in order to make the Bible’s message available and accessible to everyone
                </p>
             </div>
          </div>
      </div>

      <div className='w-full h-fit bg-[#fff]'>
          <div className='w-full p-4 md:max-w-[720px] xl:max-w-[1200px] mx-auto'>
              <p data-aos="fade-left"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration={`400`}
               className='text-[12px] md:text-[18px] text-pretty'>
                …I heard every creature in heaven, on earth, in the world below, and in the seas – all living beings in the universe – and they were singing: 
                To him who sits on the throne and to the Lamb, be praise and honour, glory and might, forever and ever!
              </p>
              <div className='flex items-center justify-between'>
                <span className={`text-[50px] font-[700] text-[#4FC9EE] font-instrument`}>“”</span>
                <span className='text-[16px] text-[#4FC9EE] font-bold italic'>Revelation 5:13</span>
              </div>
          </div>
      </div>
      <Footer />
    </div>
  )
}

export default Mission