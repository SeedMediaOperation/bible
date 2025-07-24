import React from 'react'
import Image from 'next/image';
import Navbar from "@/app/[locale]/components/Navbar";
import Footer from "@/app/[locale]/components/Footer";

const Experience = [
  {id:1,year:'1892', content:'The Bible Society started its ministry in Cambodia as early as 1892 when a British & Foreign Bible Society’s missionary from Hong Kong visited the kingdom for the first time.'},
  {id:2,year:'1993', content:'The Bible Society started its ministry in Cambodia as early as 1892 when a British & Foreign Bible Society’s missionary from Hong Kong visited the kingdom for the first time.'},
  {id:3,year:'1899', content:'The Bible Society started its ministry in Cambodia as early as 1892 when a British & Foreign Bible Society’s missionary from Hong Kong visited the kingdom for the first time.'},
  {id:4,year:'1804', content:'The Bible Society started its ministry in Cambodia as early as 1892 when a British & Foreign Bible Society’s missionary from Hong Kong visited the kingdom for the first time.'},
  {id:5,year:'1923', content:'The Bible Society started its ministry in Cambodia as early as 1892 when a British & Foreign Bible Society’s missionary from Hong Kong visited the kingdom for the first time.'},
  {id:6,year:'1954', content:'The Bible Society started its ministry in Cambodia as early as 1892 when a British & Foreign Bible Society’s missionary from Hong Kong visited the kingdom for the first time.'},
  {id:7,year:'1954', content:'The Bible Society started its ministry in Cambodia as early as 1892 when a British & Foreign Bible Society’s missionary from Hong Kong visited the kingdom for the first time.'},
  {id:8,year:'1954', content:'The Bible Society started its ministry in Cambodia as early as 1892 when a British & Foreign Bible Society’s missionary from Hong Kong visited the kingdom for the first time.'},
  {id:9,year:'1962', content:'The Bible Society started its ministry in Cambodia as early as 1892 when a British & Foreign Bible Society’s missionary from Hong Kong visited the kingdom for the first time.'},
  {id:10,year:'1954', content:'The Bible Society started its ministry in Cambodia as early as 1892 when a British & Foreign Bible Society’s missionary from Hong Kong visited the kingdom for the first time.'},
  {id:11,year:'1955', content:'The Bible Society started its ministry in Cambodia as early as 1892 when a British & Foreign Bible Society’s missionary from Hong Kong visited the kingdom for the first time.'},
  {id:12,year:'1954', content:'The Bible Society started its ministry in Cambodia as early as 1892 when a British & Foreign Bible Society’s missionary from Hong Kong visited the kingdom for the first time.'},
  {id:13,year:'1968', content:'The Bible Society started its ministry in Cambodia as early as 1892 when a British & Foreign Bible Society’s missionary from Hong Kong visited the kingdom for the first time.'},
  {id:14,year:'1954', content:'The Bible Society started its ministry in Cambodia as early as 1892 when a British & Foreign Bible Society’s missionary from Hong Kong visited the kingdom for the first time.'},
  {id:15,year:'1975-1992', content:'The Bible Society started its ministry in Cambodia as early as 1892 when a British & Foreign Bible Society’s missionary from Hong Kong visited the kingdom for the first time.'},
  {id:16,year:'1954', content:'The Bible Society started its ministry in Cambodia as early as 1892 when a British & Foreign Bible Society’s missionary from Hong Kong visited the kingdom for the first time.'},
]

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <div className="relative flex flex-col justify-center items-center w-full h-full overflow-hidden px-3 md:py-[10rem] xl:py-[15rem] z-1">
        <Image 
          src="/images/Banners/aboutus.png"
          alt="banner"
          fill
          quality={100}
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="relative flex justify-between items-center max-w-[350px] md:max-w-[720px] xl:max-w-[1200px] mx-auto">
            <div data-aos="fade-right"
              data-aos-anchor="#example-anchor"
              data-aos-duration={`400`}>
              <span className="text-[14px] md:text-[20px] text-[#4FC9EE] font-light ">សមាគមព្រះគម្ពីរកម្ពុជា</span>
              <h1 className="text-[30px] leading-[30px] md:text-[50px] md:leading-[50px] xl:text-[5rem] xl:leading-[5rem] font-bold text-wrap text-[#ffffff] capitalize">
                The Bible Society in Cambodia.
              </h1>
            </div>
            <p data-aos="fade-left"
              data-aos-anchor="#example-anchor"
              data-aos-duration={`600`}
            className="text-[14px] md:text-[20px] text-[#ffffff] font-[400]">
              GOD’S WORD
              Living Hope for All.
            </p>
        </div>
      </div>

      <div className="w-full max-w-[350px] md:max-w-[720px] xl:max-w-[1200px] mx-auto h-full translate-y-[-15%] xl:translate-y-[-30%] shadow-sm drop-shadow-md">
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
                  <h1 className="text-[16px] md:text-[18px] xl:text-[32px] text-[#000000] font-[700] text-wrap">About The Bible Society
                  in Cambodia
                  </h1>
                  <p className="text-[12px] md:text-[16px] xl:text-[24px]">
                    The Bible Society in Cambodia is an organization affiliated to the United Bible Societies. The United Bible Societies is made up of Bible Societies operating in over 200 countries and territories. Together, we are the biggest translator, publisher and distributor of the Bible in the world. We are also active in areas such as literacy training, HIV and AIDS prevention and disaster relief. Bible Societies work with all Christian Churches and many international non-governmental organisations.
                  </p>
              </div>
          </div>
      </div>

      <div className='w-full max-w-[350px] md:max-w-[720px] xl:max-w-[1200px] mx-auto h-full pb-10'>
        <ul className='space-y-[1rem] md:space-y-0 md:flex gap-5 flex-wrap md:justify-center items-start'>
          {Experience.map((items, index) =>
            <li key={index} 
            className='flex flex-col md:flex-row gap-2 w-full md:w-[48%]'>
              <h1 className='text-[#3cc2f8] text-[18px] font-bold text-nowrap'>{items.year}</h1>
              <p className='text-[14px] text-balance'>
                  {items.content}
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
                <div className='md:flex md:space-x-5'>
                  <span>
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
                    className="w-[40px] md:w-[60px] mx-auto md:mx-0 xl:w-[70px] object-cover object-center"
                  />
                  </span>
                  <ul>
                      <li data-aos="fade-left"
                    data-aos-anchor="#example-anchor"
                    data-aos-offset="500"
                    data-aos-duration={`500`}>
                        <h1 className='text-[16px] md:text-[20px] xl:text-[32px] font-bold text-center md:text-start'>Our Mission</h1>
                        <p className='text-[14px] md:text-[16px] xl:text-[20px] text-[#fff] text-center md:text-start'>
                        The Bible Society exists is to equip churches to share God’s Word.
                        </p>
                      </li>
                  </ul>
                </div>
                <div className='md:flex md:space-x-5'>
                  <span>
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
                    className="w-[40px] md:w-[60px] mx-auto md:mx-0 xl:w-[70px] object-cover object-center"
                  />
                  </span>
                  <ul>
                      <li data-aos="fade-left"
                    data-aos-anchor="#example-anchor"
                    data-aos-offset="500"
                    data-aos-duration={`500`}
                      >
                        <h1 className='text-[16px] md:text-[20px] xl:text-[32px] font-bold text-center md:text-start'>Our Mission</h1>
                        <p className='text-[14px] md:text-[16px] xl:text-[20px] text-[#fff] text-center md:text-start'>
                          The Bible Society exists is to equip churches to share God’s Word.
                        </p>
                      </li>
                  </ul>
                </div>
              </div>
          </div>
      </div>

      <div className='w-full bg-gradient-to-r from-[#1E1E1E] to-[#413F3F] p-3 shadow drop-shadow-2xl'>
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
            className='text-[18px] xl:text-[32px] text-[#4FC9EE] font-bold text-center'>Our Core Values</h1>
          </div>
          <ul className="w-full max-w-[350px] md:max-w-[720px] xl:max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-[1vw] justify-center p-10">
            <li data-aos="fade-right"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration={`400`} 
            >
              <h1 className='text-[20px] xl:text-[30px] font-bold text-[#575757]'>01</h1>
              <p className='text-[14px] xl:text-[20px] text-[#fff]'>We value churches as the primary agents of God’s mission in the world</p>
            </li>
            <li data-aos="fade-right"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration={`500`}
            >
              <h1 className='text-[20px] xl:text-[30px] font-bold text-[#575757]'>02</h1>
              <p className='text-[14px] xl:text-[20px] text-[#fff]'>We value all the different media that enable us to distribute the Bible</p>
            </li>
            <li data-aos="fade-right"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration={`600`} 
            >
              <h1 className='text-[20px] xl:text-[30px] font-bold text-[#575757]'>03</h1>
              <p className='text-[14px] xl:text-[20px] text-[#fff]'>We value resources that help people to engage with the Word of God</p>
            </li>
            <li  data-aos="fade-right"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration={`700`}
            >
              <h1 className='text-[20px] xl:text-[30px] font-bold text-[#575757]'>04</h1>
              <p className='text-[14px] xl:text-[20px] text-[#fff]'>We value affordability of Scriptures for everyone</p>
            </li>
          </ul>
      </div>

      <div className='w-full max-w-[350px] md:max-w-[720px] xl:max-w-[1200px] mx-auto p-3 md:p-8'>
          <h1 data-aos="fade-right"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration={`400`}
          className='text-[18px] md:text-[24px] text-[#4FC9EE] font-bold capitalize'>
            Our Staff
          </h1>
          <p data-aos="fade-left"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration={`500`}
          className='text-[14px] md:text-[20px]'>
            Our dedicate staff members also come from different Church backgrounds working together to serve the Kingdom of God through publishing, translation, distribution and different Scripture engagement programs.
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

      <div className='w-full max-w-[350px] md:max-w-[720px] xl:max-w-[1200px] mx-auto p-3 md:p-8'>
          <h1 data-aos="fade-right"
              data-aos-anchor="#example-anchor"
              data-aos-offset="500"
              data-aos-duration={`400`}
          className='text-[18px] md:text-[24px] text-[#4FC9EE] font-bold capitalize'>
            Our Board
          </h1>
          <p data-aos="fade-left"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration={`500`}
          className='text-[14px] md:text-[20px]'>
            The Bible Society is an expression of the fellowship of God&apos;s people from different Church traditions and background working together towards the same objective: bringing the Word of hope and salvation to the Cambodian people.
            In order to meet the needs of Christian communities in Cambodia, the BSC Board of Directors and the Advisory Committee are composed of Christian representatives from almost all Church traditions: Evangelical, Methodist, Presbyterian, Anglican, Assemblies of God, Baptist, Church of Christ, Seventh Day Adventist, Roman Catholic, as well as parachurch organizations.
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

export default AboutUs