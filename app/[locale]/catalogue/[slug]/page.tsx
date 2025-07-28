import Image from 'next/image';
import Navbar from "@/app/[locale]/components/Navbar";
import Footer from "@/app/[locale]/components/Footer";
import CataBook from "@/app/[locale]/components/CataBook";
import {apiGet} from "@/utils/apiHelpers";
import {Catalogue, CatalogueBook} from "@/types/catalogue";
import { Version } from "@/app/[locale]/data/version";
import { getLocale } from 'next-intl/server';

const CatalogueMore = async ({ params } : { params: { slug: string } })  => {
  const res = await apiGet<{data:CatalogueBook[]}>(`/api/catalogue-book`);
  const allCatalogueBook = res.data;
  const locale = await getLocale();
  const resCatalogue = await apiGet<{data:Catalogue[]}>(`/api/catalogues`);
  const allCatalogue = resCatalogue.data;

  const singleData = resCatalogue.data.find((item) => 
    { 
      return item.slug === params.slug
    }
  )
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
          <div className="relative flex items-center">
              <div data-aos="fade-left"
                      data-aos-anchor="#example-anchor"
                      data-aos-offset="500"
                      data-aos-duration={`${300 * 100}`}
                       className='w-full max-w-[340px] md:max-w-[720px] lg:max-w-[820px] xl:max-w-[1100px] mx-auto'>
                <span className="text-[14px] md:text-[22px] text-[#4FC9EE] font-light ">{locale === 'km' ? 'ប្រភេទ' : 'Catalogue'}</span>
                <h1 className={`text-[40px] leading-[40px] md:text-[50px] md:leading-[50px] lg:text-[60px] lg:leading-[60px] font-bold text-wrap text-[#ffffff] capitalize ${locale === 'km' ? 'font-krasar':'font-gotham'}`}>
                  {locale === 'km' ? singleData?.name_km : singleData?.name_en}
                </h1>
              </div>
          </div>
        </div>

        {/* Version & Books */}
      <CataBook  params={params ? { slug: params.slug } : undefined} 
                 versions={Version} catabook={allCatalogueBook} catalogue={allCatalogue}/>
      <Footer />
    </div>
  );
};

export default CatalogueMore;