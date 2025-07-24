import React from 'react'
import Image from 'next/image'
import Navbar from "@/app/[locale]/components/Navbar";
import Footer from "@/app/[locale]/components/Footer";

const ContactUs = () => {
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
          <div className="relative flex justify-between items-center md:max-w-[720px] xl:max-w-[1200px] mx-auto">
            <div data-aos="fade-left"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration={`${300 * 100}`}
            >
              <span className="text-[14px] md:text-[22px] text-[#4FC9EE] font-light ">សមាគមព្រះគម្ពីរកម្ពុជា</span>
              <h1 className="text-[30px] leading-[30px] md:text-[50px] md:leading-[50px] lg:text-[60px] lg:leading-[60px] xl:text-[70px] xl:leading-[70px] font-bold text-wrap text-[#ffffff]">
                The Bible Society
                in Cambodia.
              </h1>
            </div>
            <p data-aos="fade-right"
                      data-aos-anchor="#example-anchor"
                      data-aos-offset="500"
                      data-aos-duration={`${300 * 100}`}
             className="text-[14px] md:text-[24px] text-[#ffffff] font-[400]">
              GOD’S WORD
              Living Hope for All.
            </p>
        </div>
        </div>
        <Footer />
    </div>
  )
}

export default ContactUs