'use client';

import React, {useEffect,useState} from 'react'
import Image from 'next/image'
import {VlogProps} from "@/types/vlog";
import Link from 'next/link';
import { useLocale } from 'next-intl';

const VlogsCard = ({vlog}:VlogProps) => {
    const [isClient, setIsClient] = useState(false);
    const locale = useLocale();
    useEffect(() => {
      setIsClient(true);
    }, []);
    // Extract video ID from the full URL
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
    <div className='w-full h-full max-w-[386px] md:max-w-[720px] xl:max-w-[1200px] mx-auto translate-y-[-12%] md:translate-y-[-22%] lg:translate-y-[-18%] overflow-y-auto overflow-x-hidden px-3'>
        <div className='w-full h-full grid grid-cols-2 xl:grid-cols-3 gap-3 py-4'>
            {vlog.map((vlog, index) => {
                const videoId = vlog.video_Url ? getYoutubeVideoId(vlog.video_Url) : null;
                const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '/images/default-thumbnail.jpg';

                return (
                    <Link href={vlog.video_Url ?? ''} key={index} target="_blank"
                          className='w-full h-full bg-white rounded-[22px] border-[2px] border-gray-300 drop-shadow-xl p-2 hover:scale-[1.02] transition-all duration-300'>
                        <div className='relative'>
                            <Image
                                src={thumbnailUrl}
                                alt="card1"
                                width={1920}
                                height={1080}
                                sizes="100vw"
                                className='w-full h-fit object-contain object-center rounded-[5%]' />
                        </div>
                        <div className={`p-1 ${locale === 'km' ? 'font-[krasar]':'font-[gotham]'}`}>
                            <h1 className='text-[14px] font-bold'>{vlog.title_en}</h1>
                            {isClient && (
                                <div
                                className="text-[12px] whitespace-pre-line prose max-w-full"
                                dangerouslySetInnerHTML={{ __html: vlog.paragraph_en }}
                                />
                            )}
                        </div>
                    </Link>
                );
            })}
        </div>
    </div>
  )
}

export default VlogsCard
