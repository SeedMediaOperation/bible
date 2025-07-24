import React from 'react'
import Image from 'next/image';
import Navbar from "@/app/[locale]/components/Navbar";
import Footer from "@/app/[locale]/components/Footer";
import Search from "@/app/[locale]/components/Search";
import {apiGet} from "@/utils/apiHelpers";
import {CatalogueBook} from "@/types/catalogue";
import {Vlog} from "@/types/vlog";

const SearchPage = async () => {
    const resCatalogueBook = await apiGet<{data:CatalogueBook[]}>('/api/catalogue-book');
    const CatalogueBook = resCatalogueBook.data;

    const resVlog = await apiGet<{data:Vlog[]}>('/api/vlogs');
    const vlog = resVlog.data;
  return (
    <div>
      <Navbar />
        <div className="relative flex flex-col justify-center items-center w-full h-full overflow-hidden px-3 py-[6rem] md:py-[10rem] xl:py-[14rem] z-1">
        <Image 
          src="/images/Banners/banner.png"
          alt="banner"
          fill
          quality={100}
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="relative flex justify-between items-center max-w-[420px] md:max-w-[720px] xl:max-w-[1200px]">
            <div data-aos="fade-right"
          data-aos-anchor="#example-anchor"
          data-aos-offset="500"
          data-aos-duration={`400`}
            >
              <span className="text-[14px] md:text-[22px] text-[#4FC9EE] font-light ">សមាគមព្រះគម្ពីរកម្ពុជា</span>
              <h1 className="text-[30px] leading-[30px] md:text-[50px] md:leading-[50px]  xl:text-[5rem] xl:leading-[5rem] font-bold text-wrap text-[#ffffff]">
                The Bible Society
              in Cambodia.
              </h1>
            </div>
            <p data-aos="fade-right"
          data-aos-anchor="#example-anchor"
          data-aos-offset="500"
          data-aos-duration={`600`}
             className="text-[14px] md:text-[24px] text-[#ffffff] font-[400]">
              GOD’S WORD
              Living Hope for All.
            </p>
        </div>
        </div>
        <div className='w-full max-w-[420px] md:max-w-[720px] xl:max-w-[1200px] mx-auto'>
            <Search catabook={CatalogueBook} vlog={vlog}/>
        </div>   
        <Footer /> 
    </div>
  )
}

export default SearchPage