import ReadingPage from '@/app/[locale]/components/ReadingPage';
import Image from 'next/image';
import Navbar from "@/app/[locale]/components/Navbar";
import Footer from "@/app/[locale]/components/Footer";
import MediaCard from "@/app/[locale]/components/MediaCard";
import {apiGet} from "@/utils/apiHelpers";

import type {Book, Chapters, Media, Version} from "@/types/book";
import { getLocale } from 'next-intl/server';

interface Props {
  params: { book: string };
}

const Book = async ({ params }: Props) => {
    // Version
    const res = await apiGet<{ data:Version[] }>('/api/books/versions');
    const versions = res.data;
    const locale = await getLocale();
  // Book
    const resBook = await apiGet<{ data:Book[] }>(`/api/books`);
    const allBooks =  resBook.data;
    // VersionID
    const singleVersion = versions.find((item) => {
      return item.slug === params.book;
    })
    // Filtered books
    const books = allBooks.filter(book => {
        return book.versionId === params.book;
    });
    // Get Book ID
    const bookIds = books.map(book => book.id);
    // Chapter
    const resChap = await apiGet<{ data:Chapters[] }>(`/api/books/chapters`);
    const allChapters = resChap.data;
    // Filtered chapters
    const chapters = allChapters.filter(chapter => bookIds.includes(String(chapter.bookId)));
    
    // Get Media
    const resMedia = await apiGet<{ data:Media[] }>(`/api/medias`);
    const medias = resMedia.data;

  return (
    <div>
      <Navbar />
      {/* Banner */}
      <div className="relative flex flex-col justify-center w-full h-fit overflow-hidden py-[6rem] md:py-[12rem] px-10 z-1">
        <Image
          src="/images/Banners/read_banner.png"
          alt="banner"
          fill
          quality={100}
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute w-full h-full inset-0 bg-black/60" />
        <div className="relative z-10">
          <h1 data-aos="fade-right"
              data-aos-offset="500"
              data-aos-duration={`500`}
          className={`font-bold text-white ${locale === 'km' ? 'font-krasar w-[250px] text-[30px] md:text-[40px]  xl:text-[3rem]':'font-gotham w-[150px] text-[30px] leading-[30px] md:text-[40px] md:leading-[40px]  xl:text-[3rem] xl:leading-[3rem]'}`}>
            {locale === "km" ? singleVersion?.titleKm : singleVersion?.titleEn}
          </h1>
        </div>
      </div>

      {/* Reading Page */}
      <div className="w-full max-w-[350px] md:max-w-[520px] lg:max-w-[820px]  mx-auto">
        <ReadingPage
            versions={versions}
            singleVersion={singleVersion}
            books={books}
            chapters={chapters}
            params={params.book}
        />
      </div>

      {/* Swiper Section */}
      <div className="relative max-w-[1200px] mx-auto px-4  translate-y-[-7%]">
          {/* Navigation Buttons */}
        <div className="swiper-button-prev-custom absolute top-[50%] -left-1 xl:-left-12 -translate-y-1/2  p-2 rounded-full z-10 cursor-pointer text-gray-400">
          <svg  xmlns="http://www.w3.org/2000/svg"  width="60"  height="60"  viewBox="0 0 24 24"  fill="currentColor"  className="icon icon-tabler icons-tabler-filled icon-tabler-caret-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13.883 5.007l.058 -.005h.118l.058 .005l.06 .009l.052 .01l.108 .032l.067 .027l.132 .07l.09 .065l.081 .073l.083 .094l.054 .077l.054 .096l.017 .036l.027 .067l.032 .108l.01 .053l.01 .06l.004 .057l.002 .059v12c0 .852 -.986 1.297 -1.623 .783l-.084 -.076l-6 -6a1 1 0 0 1 -.083 -1.32l.083 -.094l6 -6l.094 -.083l.077 -.054l.096 -.054l.036 -.017l.067 -.027l.108 -.032l.053 -.01l.06 -.01z" /></svg>
        </div>
        <div className="swiper-button-next-custom absolute top-[50%] -right-1 xl:-right-12 -translate-y-1/2  p-2 rounded-full z-10 cursor-pointer text-gray-400">
          <svg  xmlns="http://www.w3.org/2000/svg"  width="60"  height="60"  viewBox="0 0 24 24"  fill="currentColor"  className="icon icon-tabler icons-tabler-filled icon-tabler-caret-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6c0 -.852 .986 -1.297 1.623 -.783l.084 .076l6 6a1 1 0 0 1 .083 1.32l-.083 .094l-6 6l-.094 .083l-.077 .054l-.096 .054l-.036 .017l-.067 .027l-.108 .032l-.053 .01l-.06 .01l-.057 .004l-.059 .002l-.059 -.002l-.058 -.005l-.06 -.009l-.052 -.01l-.108 -.032l-.067 -.027l-.132 -.07l-.09 -.065l-.081 -.073l-.083 -.094l-.054 -.077l-.054 -.096l-.017 -.036l-.027 -.067l-.032 -.108l-.01 -.053l-.01 -.06l-.004 -.057l-.002 -12.059z" /></svg>
        </div>
        
        <MediaCard medias={medias}/>
      </div>
      <Footer />
    </div>
  );
};

export default Book;
