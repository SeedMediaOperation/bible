"use client";

import React, { useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { alertService } from "@/lib/alertServices";
import AlertContainer from "./AlertContainer";
import {Chapters, ReadingProps} from "@/types/book";
import {useRouter} from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";

const Color = [
    {id:1, name: 'rgba(242, 255, 0, 0.61)'},
    {id:2, name: 'rgba(102, 69, 137, 0.47)'},
    {id:3, name: 'rgba(138, 79, 131, 0.56)'},
]

// Load from localStorage initially (optional)
const getInitialHighlights = (): { [key: string]: string } => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("highlights");
      try {
        return stored ? JSON.parse(stored) : {};
      } catch (e) {
        console.error("Failed to parse localStorage highlights:", e);
        return {};
      }
    }
    return {};
  };


const ReadingPage = ({versions, books, chapters,singleVersion}:ReadingProps) => {
    const locale = useLocale();
    const [showBookPopup, setShowBookPopup] = useState(false);
    const [showChapPopup, setShowChapPopup] = useState(false);
    const [showVersionPopup, setShowVersionPopup] = useState(false);
    const [showChapterPopup, setShowChapterPopup] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Chapters[] | null>(null);
    const [selectedBookName, setSelectedBookName] = useState<string | null>(null);
    const [selectedVersionName, setSelectedVersionName] = useState<string | null>(locale === 'km' ? singleVersion?.titleKm ?? null : singleVersion?.titleEn ?? null);
    const [selectedBookId, setSelectedBookId] = useState<string>();
    // Load highlightedLines from localStorage on mount
    const [highlightedLines, setHighlightedLines] = useState<{ [key: string]: string }>(getInitialHighlights);
    console.log(selectedBookName);
    const [activeChapterIndex, setActiveChapterIndex] = useState(0);
    const router = useRouter();
    const [search, setSearch] = useState<string>('');
    const currentChapter = chapters[activeChapterIndex];
    const currentBook = books.find(
        b => {
          return  b.id === currentChapter?.bookId
        }
    );
    const [selectedLines, setSelectedLines] = useState<{ [key: string]: boolean }>({});
    const [highlightPopup, setHighlightPopup] = useState(false);
    const [selectedHighlightTarget, setSelectedHighlightTarget] = useState<{ chapterId: string; lineIndex: number } | null>(null);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const query = searchParams.toString();
    const fullPath = query ? `${pathname}?${query}` : pathname;

    // Persist highlight changes to localStorage
    useEffect(() => {
        if (typeof window !== "undefined") {
        localStorage.setItem("highlights", JSON.stringify(highlightedLines));
        }
    }, [highlightedLines]);

    const handleSelectBook = (chapter: Chapters) => {
        setShowBookPopup(false);
        const bookChapters = chapters.filter(chap => chap.id === chapter.id);

        setSelectedBook(bookChapters);
        if (bookChapters.length > 0) {
            const chapterIndex = chapters.findIndex(chap => chap.id === bookChapters[0].id);
            if (chapterIndex !== -1) {
                setActiveChapterIndex(chapterIndex);
            }
        }
    }

    const handleSlideChange = (swiper: SwiperClass) => {
        setActiveChapterIndex(swiper.activeIndex);
    };

    const handleShare = () => {
        const textToShare = selectedHighlightTarget
          ? `${selectedBookName} ${selectedHighlightTarget.chapterId}:${selectedHighlightTarget.lineIndex + 1} - "${getSelectedVerseText()}"`
          : "Check out this verse!";
      
        if (navigator.share) {
          navigator.share({
            title: 'Bible Verse',
            text: textToShare,
            url: window.location.href,
          }).catch(console.error);
        } else {
          navigator.clipboard.writeText(textToShare)
            .then(() => alert("Verse copied to clipboard!"))
            .catch(() => alert("Failed to copy!"));
        }
    };

    const handleCopy = () => {
        if (!selectedHighlightTarget) {
          alertService.warning('No verse selected to copy!');
          return;
        }
        const chapter = chapters.find(ch => ch.id === selectedHighlightTarget.chapterId);
        if (!chapter) {
            alertService.warning("Chapter data not found!");
            return;
        }
        const verseText = chapter.paragraphEn[selectedHighlightTarget.lineIndex];
        if (!verseText) {
            alertService.warning("Verse text not found!");
            return;
        }
        const textToCopy = `${selectedBookName} ${activeChapterIndex + 1}:${selectedHighlightTarget.lineIndex + 1} - ${verseText} url: ${process.env.NEXT_PUBLIC_BASE_URL}${fullPath}`;

        navigator.clipboard.writeText(textToCopy)
          .then(() => alertService.success("Copied to clipboard!"))
          .catch(() => alertService.error("Failed to copy!"));
    };

    function getSelectedVerseText() {
        if (!selectedHighlightTarget) return '';
        const chapter = chapters.find(ch => ch.id === selectedHighlightTarget.chapterId);
        if (!chapter) return '';
        return chapter.paragraphEn[selectedHighlightTarget.lineIndex] || '';
    }

    const filteredBook = selectedBook
        ? selectedBook.filter((item: Chapters) => item.bookId === selectedBookId)
        : chapters;

    const filteredBookBtn = books.filter((book) => 
        book.nameEn?.toLowerCase().includes(search.toLowerCase()) ||
        book.nameKm?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
        <AlertContainer />
        <div className="w-full h-fit translate-y-[-14%] md:translate-y-[-25%]">
            {/* Version Button */}
            <button data-aos="fade-right"
                data-aos-duration={`${300}`}
                onClick={() => setShowVersionPopup(true)} className="flex justify-between items-center w-full bg-[#4FC9EE] text-[#ffffff] rounded-full px-3 py-2 my-3 space-x-2">
                <span className={`${locale === 'km' ? 'font-krasar':'font-gotham'}`}>{selectedVersionName}</span>
                <span>
                    <svg width="12" height="12" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.73205 12C8.96225 13.3333 7.03775 13.3333 6.26795 12L1.0718 3C0.301995 1.66667 1.26424 1.46309e-06 2.80384 1.32849e-06L13.1961 4.19966e-07C14.7358 2.8537e-07 15.698 1.66667 14.9282 3L9.73205 12Z" fill="#00AFD7"/>
                    </svg>
                </span>
            </button>
            <div className="w-full h-[50vh] md:h-fit bg-[rgba(30,_30,_30,_0.95)] border-[1px_solid_#575757] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-[40px] overflow-y-hidden">
                <div className="flex space-x-2 p-5">
                    {/* Book and Chapter */}
                    <button
                        onClick={() => setShowBookPopup(true)}
                        className="flex justify-between items-center w-full bg-[#fff] text-[#4FC9EE] rounded-full px-3 py-1 space-x-2"
                    >
                        <span className={`text-[12px] md:text-[16px] ${locale === 'km' ? 'font-krasar':'font-gotham'}`}>
                        {currentBook ? `${locale === 'km' ? currentBook.nameKm : currentBook.nameEn} ${locale === 'km' ? currentChapter?.nameKm : currentChapter?.nameEn}` : `Chapter ${activeChapterIndex + 1}`}
                        </span>

                        <span>
                        <svg width="12" height="12" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.73205 12C8.96225 13.3333 7.03775 13.3333 6.26795 12L1.0718 3C0.301995 1.66667 1.26424 1.46309e-06 2.80384 1.32849e-06L13.1961 4.19966e-07C14.7358 2.8537e-07 15.698 1.66667 14.9282 3L9.73205 12Z"
                                fill="#00AFD7"
                            />
                        </svg>
                        </span>
                    </button>
                    {/* Chapter */}
                    <button
                        disabled={!showChapterPopup}
                        onClick={() => setShowChapPopup(true)} className={`flex justify-between items-center w-full bg-[#000]/40 text-[#4FC9EE] rounded-full px-3 py-1 space-x-2 ${!showChapterPopup ? 'cursor-not-allowed':'cursor-pointer'}`}>
                        <span className={`text-[12px] md:text-[16px] ${locale === 'km' ? 'font-krasar':'font-gotham'}`}>{locale === 'km' ? 'ផ្លាស់ប្តូរជំពូក' :'Change Chapters'}</span>
                        <span>
                            <svg width="12" height="12" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.73205 12C8.96225 13.3333 7.03775 13.3333 6.26795 12L1.0718 3C0.301995 1.66667 1.26424 1.46309e-06 2.80384 1.32849e-06L13.1961 4.19966e-07C14.7358 2.8537e-07 15.698 1.66667 14.9282 3L9.73205 12Z" fill="#00AFD7"/>
                            </svg>
                        </span>
                    </button>
                </div>
                <div className="h-[40vh] text-[#fff] px-5 pb-10  overflow-y-auto">
                    {/* Navigation Buttons */}
                    <div className="swiper-button-prev-custom-read absolute top-1/2 -left-1 -translate-y-[10%] md:-translate-y-[15%] lg:-translate-y-[20%] xl:-translate-y-[10%] -translate-x-[70%] p-2 rounded-full z-10 cursor-pointer text-gray-400">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="60"  height="60"  viewBox="0 0 24 24"  fill="currentColor"  className="icon icon-tabler icons-tabler-filled icon-tabler-caret-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13.883 5.007l.058 -.005h.118l.058 .005l.06 .009l.052 .01l.108 .032l.067 .027l.132 .07l.09 .065l.081 .073l.083 .094l.054 .077l.054 .096l.017 .036l.027 .067l.032 .108l.01 .053l.01 .06l.004 .057l.002 .059v12c0 .852 -.986 1.297 -1.623 .783l-.084 -.076l-6 -6a1 1 0 0 1 -.083 -1.32l.083 -.094l6 -6l.094 -.083l.077 -.054l.096 -.054l.036 -.017l.067 -.027l.108 -.032l.053 -.01l.06 -.01z" /></svg>
                    </div>
                    <div className="swiper-button-next-custom-read absolute top-1/2 -right-1 -translate-y-[10%] md:-translate-y-[15%] lg:-translate-y-[20%] xl:-translate-y-[10%] translate-x-[70%] p-2 rounded-full z-10 cursor-pointer text-gray-400">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="60"  height="60"  viewBox="0 0 24 24"  fill="currentColor"  className="icon icon-tabler icons-tabler-filled icon-tabler-caret-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6c0 -.852 .986 -1.297 1.623 -.783l.084 .076l6 6a1 1 0 0 1 .083 1.32l-.083 .094l-6 6l-.094 .083l-.077 .054l-.096 .054l-.036 -.017l-.067 -.027l-.108 -.032l-.053 -.01l-.06 -.01l-.057 .004l-.059 .002l-.059 -.002l-.058 -.005l-.06 -.009l-.052 -.01l-.108 -.032l-.067 -.027l-.132 -.07l-.09 -.065l-.081 -.073l-.083 -.094l-.054 -.077l-.054 -.096l-.017 -.036l-.027 -.067l-.032 -.108l-.01 -.053l-.01 -.06l-.004 -.057l-.002 -12.059z" /></svg>
                    </div>
                    <Swiper
                        navigation={{
                            nextEl: ".swiper-button-next-custom-read",
                            prevEl: ".swiper-button-prev-custom-read",
                        }}
                        modules={[Navigation]}
                        className="mySwiper"
                        onSlideChange={handleSlideChange}
                        >
                        {filteredBook
                        .slice() 
                        .sort((a, b) => Number(a.nameEn) - Number(b.nameEn))
                        .map((p, chapterIndex) => {
                            const matchedBook = books.find((item) => item.id === p.bookId);
                            if (!matchedBook) return null;

                            const matchedBookName = locale === 'km' ? matchedBook.nameKm : matchedBook.nameEn;
                            const currentChapterName = locale === 'km' ? currentChapter?.nameKm : currentChapter?.nameEn;

                            return (
                            <SwiperSlide key={chapterIndex}>
                                <h1 className={`text-[14px] md:text-[20px] text-center font-bold my-2 ${locale === 'km' ? 'font-krasar' : 'font-gotham'}`}>
                                {matchedBookName} {currentChapterName}
                                </h1>

                                <h1 className={`text-[16px] md:text-[20px] font-[600] my-2 text-balance me-[10rem] mb-5 ${locale === 'km' ? 'font-krasar' : 'font-gotham'} whitespace-pre-line`}>
                                    {locale === 'km' ? p.titleKm : p.titleEn}
                                </h1>

                                {(locale === 'km' ? p.paragraphKm : p.paragraphEn).map((line, index) => {
                                const key = `${p.id}-${index}`;
                                const isSelected = selectedLines[key];
                                const isHighlighted = highlightedLines[key];

                                const handleClick = () => {
                                    setSelectedLines((prev) => ({
                                    ...prev,
                                    [key]: !prev[key],
                                    }));
                                    setSelectedHighlightTarget({ chapterId: p.id ?? '', lineIndex: index });
                                    setSelectedBookName(matchedBookName ?? ''); // ✅ Fix: set book name
                                    setActiveChapterIndex(chapterIndex);   // ✅ Fix: set chapter index
                                    setHighlightPopup(true);
                                };

                                const handleCopy = async () => {
                                    try {
                                    await navigator.clipboard.writeText(line);
                                    alert("Text copied to clipboard!");
                                    } catch (err) {
                                    console.error("Copy failed", err);
                                    }
                                };
                                const parts = line.split(' ');
                                const verseNumber = parts[0];
                                const verseText = parts.slice(1).join(' ');
                                return (
                                    <span
                                    key={index}
                                    onClick={handleClick}
                                    onDoubleClick={handleCopy}
                                    style={{
                                        backgroundColor: isHighlighted ? highlightedLines[key] : "transparent",
                                        textDecoration: isSelected ? 'underline' : 'none',
                                        textDecorationStyle: isSelected ? 'dotted' : undefined,
                                    }}
                                    className={`text-[14px] md:text-[18px] mb-1 cursor-pointer
                                        hover:underline hover:decoration-dotted
                                        focus:underline focus:decoration-dotted
                                        active:underline active:decoration-dotted
                                        outline-none ${locale === 'km' ? 'font-krasar' : 'font-gotham'}
                                        whitespace-pre-line
                                        `}
                                    tabIndex={0}
                                    >
                                      <span className="text-[#50c9ee] mr-1">{verseNumber}</span>
                                      {verseText}
                                    </span>
                                );
                                })}
                            </SwiperSlide>
                            );
                        })}
                        </Swiper>

                </div>
            </div>
            {/* Book Popup */}
            {showBookPopup && (
                <div className={`fixed z-10 inset-0 w-full md:w-[50%] md:translate-x-[-47%] translate-y-[10%] mx-auto h-full flex items-center justify-center 
                            transition-all duration-500 ease-in-out overflow-hidden
                            ${showBookPopup ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
                    <div className="bg-black/80 backdrop-blur-[50px] rounded-[20px] p-4 shadow-lg w-full h-full overflo-y-hidden">
                        <div className="flex justify-between items-center">
                            {!showChapterPopup ?
                                <h2 className="text-lg font-bold mb-4 text-[#fff]">{locale === 'km' ? 'គម្ពីរ' : 'Book'}</h2>
                                :
                                <button onClick={() => {
                                    setShowBookPopup(true);
                                    setShowChapterPopup(false);
                                    }} className="text-[#fff] mb-4">
                                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M5 12l6 6" /><path d="M5 12l6 -6" /></svg>
                                </button>
                            }
                            <button onClick={() => {setShowBookPopup(false); setShowChapterPopup(false);}} className="text-[#fff] mb-4">
                                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <div className={`w-full inline-flex justify-center`}>
                            <ul className={`w-full !h-[44vh] ${!showChapterPopup ? '!translate-0 opacity-100' : '!-translate-x-[120%] opacity-0 !w-0'} transition-all duration-500 ease-in-out space-y-2 overflow-y-auto`}>
                                <li>
                                <label className="input w-full">
                                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <g
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                        strokeWidth="2.5"
                                        fill="none"
                                        stroke="currentColor"
                                        >
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <path d="m21 21-4.3-4.3"></path>
                                        </g>
                                    </svg>
                                    <input
                                        type="search"
                                        name="search"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="grow text-white"
                                        placeholder="Search"
                                        />                                    
                                    </label>
                                </li>
                                {!search ?
                                filteredBookBtn.map((item)=>
                                <li key={item.id}>
                                    <button
                                       onClick={() => {
                                        if (locale === 'km' && item.nameKm) {
                                          setSelectedBookName(item.nameKm);
                                        } else if (item.nameEn) {
                                          setSelectedBookName(item.nameEn);
                                        }
                                        setSelectedBookId(item.id);
                                        setShowChapterPopup(true);
                                      }}                                      
                                    className={`w-full bg-[#32CDF0]/30 hover:bg-[#32CDF0] text-white px-4 py-2 rounded-[10px] ${locale === 'km' ? 'font-krasar':'font-gotham'}`}
                                    >
                                    {locale === 'km' ? item.nameKm:item.nameEn}
                                    </button>
                                </li>): 
                                <li className="text-white text-center">
                                    No Data record.
                                </li>
                                }
                            </ul>
                            <ul className={`w-full h-fit flex flex-wrap gap-2 justify-center ${showChapterPopup ? '!translate-x-0 opacity-100' : '!translate-x-[120%] opacity-0 !w-0'}
transition-all duration-500 ease-in-out overflow-y-auto`}>
                                {chapters
                                .slice() // clone array to avoid mutating original state
                                .sort((a, b) => Number(a.nameEn) - Number(b.nameEn))
                                .map((item) =>
                                    selectedBookId === item.bookId ?
                                    <li key={item.id}>
                                        <button
                                        onClick={() => handleSelectBook(item)}
                                        className={`w-full h-full bg-[#000]/60 backdrop-blur-[50px] hover:bg-[#32CDF0] text-white px-4 py-2 rounded-[10px] ${locale === 'km' ? 'font-krasar':'font-gotham'}`}
                                        >
                                        {locale === 'km' ? item.nameKm : item.nameEn }
                                        </button>
                                    </li>
                                : null
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
            {/* Version Popup */}
            {showVersionPopup && (
                <div className={`fixed z-10 inset-0 w-full mx-auto h-full flex items-center justify-center 
                    transition-all duration-500 ease-in-out 
                    ${showVersionPopup ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>

                    <div className="bg-black/80 backdrop-blur-[50px] rounded-[20px] p-4 shadow-lg w-full h-full overflow-hidden">
                        <div className="flex justify-between items-center">
                            {!showChapterPopup ?
                                <h2 className={`text-lg font-bold mb-4 text-[#fff] ${locale === 'km' ? 'font-krasar':'font-gotham'}`}>{locale === 'km'? 'កំណែ' : 'Version'}</h2>
                                :
                                <button onClick={() => {
                                    setShowVersionPopup(true)
                                    setShowChapterPopup(false);
                                    }} className="text-[#fff] mb-4">
                                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M5 12l6 6" /><path d="M5 12l6 -6" /></svg>
                                </button>
                            }
                            <button onClick={() => {setShowVersionPopup(false);}} className="text-[#fff] mb-4">
                                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <div className={`w-full inline-flex justify-center`}>
                            <ul className={`w-full !h-[44vh] transition-all duration-500 ease-in-out space-y-2 overflow-y-auto`}>
                                {versions.map((item)=>
                                <li key={item.id}>
                                    <button
                                        onClick={async () => {
                                            if(locale === 'km'){
                                                setSelectedVersionName(item.titleKm!);
                                            }else{
                                                setSelectedVersionName(item.titleEn!);
                                            }
                                            await router.replace(`/${locale}/${encodeURIComponent(item.slug!)}`);
                                        }}
                                    className={`w-full bg-[#32CDF0]/30 hover:bg-[#32CDF0] text-white px-4 py-2 rounded-[10px] ${locale === 'km' ? 'font-krasar':'font-gotham'}`}
                                    >
                                        {locale === "km" ? item.titleKm : item.titleEn}
                                    </button>
                                </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
            {/* Chapter Popup */}
            {showChapPopup && (
                <div className={`fixed z-10 inset-0 translate-x-[47%] translate-y-[10%] w-[50%] mx-auto h-full flex items-center justify-center 
                    transition-all duration-500 ease-in-out 
                    ${showChapPopup ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>

                    <div className="bg-black/80 backdrop-blur-[50px] rounded-[20px] p-4 shadow-lg w-full h-full overflow-hidden">
                        <div className="flex justify-between items-center">
                            <h2 className={`text-lg font-bold mb-4 text-[#fff] ${locale === 'km' ? 'font-krasar':'font-gotham'}`}>{locale === 'km' ? 'ជំពូក' : 'Chapter'}</h2>
                            <button onClick={() => {setShowChapPopup(false);}} className="text-[#fff] mb-4">
                                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <div className={`w-full inline-flex justify-center`}>
                            <ul className={`w-full ${chapters.length < 38 ? '!h-fit':'!h-[44vh'} flex flex-wrap gap-2 justify-center
transition-all duration-500 ease-in-out overflow-y-auto`}>
                                {chapters
                                .slice() // clone array to avoid mutating original state
                                .sort((a, b) => Number(a.nameEn) - Number(b.nameEn))
                                .map((item)=>
                                    selectedBookId === item.bookId ?
                                        <li key={item.id}>
                                            <button
                                                onClick={() => {
                                                    handleSelectBook({...item, id:item.id ?? ''});
                                                    setShowChapPopup(false);
                                                }}
                                                className={`w-full h-full bg-[#000]/60 backdrop-blur-[50px] hover:bg-[#32CDF0] text-white px-4 py-2 rounded-[10px] ${locale === 'km' ? 'font-krasar':'font-gotham'}`}
                                            >
                                                {locale === 'km' ? item.nameKm : item.nameEn }
                                            </button>
                                        </li>
                                        : null
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
        {/* Highlight Popup */}
        {highlightPopup && 
            <div className="fixed left-0 right-0 bottom-0 w-[340px] mx-auto h-[28vh] bg-white z-[2] rounded-t-[30px] shadow-sm drop-shadow-lg transition-all duration-[500]">
                <button onClick={() => setHighlightPopup(false)} className="w-fit h-fit bg-black/30 p-4 float-end rounded-bl-[50%] rounded-tr-[54%] text-white">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                </button>
                <h1 className={`text-[16px] p-5 font-bold ${locale === 'km' ? 'font-krasar':'font-gotham'}`}>
                {selectedBookName && selectedHighlightTarget ? (
                    `${selectedBookName} ${activeChapterIndex + 1} : ${selectedHighlightTarget.lineIndex + 1}`
                    ) : (
                    "No line selected"
                    )}
                </h1>
                <ul className="space-y-4">
                    <li className="flex items-center w-full overflow-hidden px-3">
                        <div className="flex gap-2 items-center overflow-hidden">
                            <span>
                                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>
                            </span>
                            <span className={`${locale === 'km' ? 'font-krasar':'font-gotham'}`}>{locale === 'km' ? 'កត់សម្គាល់':'Highlight'}</span>
                        </div>
                        <div className="flex flex-row w-[200px] gap-1 mx-auto overflow-x-auto overflow-y-hidden scrollbar-hide">
                            <div className="flex flex-row min-w-max gap-1">
                            {Color.map((key) =>
                                <button
                                    key={key.id}
                                    onClick={() => {
                                        if (selectedHighlightTarget && currentBook) {
                                            const chapterId = selectedHighlightTarget.chapterId;
                                            const lineIndex = selectedHighlightTarget.lineIndex;
                                            setHighlightedLines((prev) => {
                                                const highlightKey = `${chapterId}-${lineIndex}`;
                                                const updated = { ...prev };
                                              
                                                if (updated[highlightKey] === key.name) {
                                                  delete updated[highlightKey]; // remove highlight if already set to same
                                                } else {
                                                  updated[highlightKey] = key.name;
                                                }
                                              
                                                return updated;
                                              });
                                            setHighlightPopup(false);
                                        }
                                    }}
                                    className="w-[30px] h-[30px] rounded-full shrink-0"
                                    style={{ backgroundColor: key.name }}
                                ></button>
                            )}
                            </div>
                        </div>
                    </li>
                    <li className="flex items-center w-full overflow-hidden px-3">
                        <button onClick={handleShare} className="flex gap-2 items-center overflow-hidden">
                            <span>
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-share-3"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13 4v4c-6.575 1.028 -9.02 6.788 -10 12c-.037 .206 5.384 -5.962 10 -6v4l8 -7l-8 -7z" /></svg>
                            </span>
                            <span className={`${locale === 'km' ? 'font-krasar':'font-gotham'}`}>{locale === 'km' ? 'ចែករំលែក':'Share'}</span>
                        </button>
                    </li>
                    <li className="flex items-center w-full overflow-hidden px-3">
                        <button onClick={handleCopy} className="flex gap-2 items-center overflow-hidden">
                            <span>
                            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-copy"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" /><path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" /></svg>
                            </span>
                            <span className={`${locale === 'km' ? 'font-krasar':'font-gotham'}`}>{locale === 'km' ? 'ចម្លង':'Copy'}</span>
                        </button>
                    </li>
                </ul>
            </div>
        }
        </>
    )
}

export default ReadingPage