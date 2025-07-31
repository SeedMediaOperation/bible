'use server';

import React from 'react'
import Image from 'next/image'
import VlogsCard from '../components/VlogsCard'
import Navbar from "@/app/[locale]/components/Navbar";
import Footer from "@/app/[locale]/components/Footer";
import {apiGet} from "@/utils/apiHelpers";
import {Vlog} from "@/types/vlog";
import { getLocale } from 'next-intl/server';

const Vlogs = async () => {
    const res = await apiGet<{data:Vlog[]}>('/api/vlogs');
    const data = res.data;
    const locale = await getLocale();
  return (
    <div>
      <Navbar />
      <div className="relative flex flex-col justify-center w-full h-full overflow-hidden px-3 py-[5rem] md:py-[14rem] xl:py-[15rem] z-1">
          <Image 
            src="/images/Banners/read_banner.png"
            alt="banner"
            fill
            quality={100}
            sizes="100vw"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="relative flex justify-between items-center ">
            <div className='w-full max-w-[350px] md:max-w-[720px] xl:max-w-[1200px] mx-auto'>
              <h1 data-aos="fade-right"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration={`${300 * 100}`}
               className={`text-[30px] leading-[30px] md:text-[50px] md:leading-[50px] font-bold text-wrap text-[#ffffff] ${locale === 'km' ? 'font-krasar':'font-gotham'}`}>
                {locale === 'km' ? 'វីដេអូ​':'Vlogs'}
              </h1>
            </div>
        </div>
        </div>

      <div>
        <VlogsCard vlog={data}/>
      </div>
      <Footer />
    </div>
  )
}

export default Vlogs