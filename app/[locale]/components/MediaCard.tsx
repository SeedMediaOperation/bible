'use client';

import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {MediaProps} from "@/types/book";
import Link from "next/link";
import { useLocale } from "next-intl";

export default function MediaCard({medias}:MediaProps) {
    const locale = useLocale();
    const getYoutubeVideoId = (url: string) => {
        try {
            const parsed = new URL(url);
            if (parsed.hostname === 'youtu.be') {
                return parsed.pathname.slice(1); // removes leading "/"
            }
            // Handle regular youtube.com/watch?v=...
            if (parsed.hostname.includes('youtube.com')) {
                return parsed.searchParams.get('v');
            }
            return null;
        } catch {
            return null;
        }
    };
    return (
        <Swiper
            slidesPerView={1}
            grid={{ rows: 2, fill: 'row' }}
            spaceBetween={12}
            navigation={{
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
            }}
            modules={[Grid, Pagination, Navigation]}
            breakpoints={{
                640: { slidesPerView: 1, spaceBetween: 12 },
                768: { slidesPerView: 2, spaceBetween: 18 },
                1024: { slidesPerView: 2, spaceBetween: 18 },
            }}
            className="mySwiper"
        >
            {medias.map((services, index) => {
                const videoId = services.video_url ? getYoutubeVideoId(services.video_url) : null;
                const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : `${process.env.NEXT_PUBLIC_BASE_URL}/logo.svg`;
                return (
                    <SwiperSlide
                        key={index}
                        className="!h-full">
                        <div
                            className="bg-white overflow-hidden h-full shadow transition-all duration-500"
                        >
                            <div className="h-[260px] md:h-[216px] lg:h-[320px] overflow-hidden">
                                <Link href={services.video_url ?? ''} className='relative w-full h-full' target={'_blank'} rel={'noopener noreferrer'}>
                                    <Image
                                        src={thumbnailUrl ?? `${process.env.NEXT_PUBLIC_BASE_URL}/logo.svg`}
                                        alt={`Service ${index + 1}`}
                                        width={300}
                                        height={200}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className='absolute bottom-0 left-0 right-0 w-full h-[50px] bg-[#4FC9EE] shadow drop-shadow-lg'>
                                        <h1 className={`font-bold px-2 mt-3 ${locale === 'km' ? 'font-[krasar]':'font-[gotham]'}`}>{locale ? services.pro_name_Km : services.pro_name_En}</h1>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ) })}
        </Swiper>
    )
}