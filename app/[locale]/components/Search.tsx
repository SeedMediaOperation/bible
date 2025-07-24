'use client';

import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { routing } from "@/lib/i18n/routing";
import { CatalogueBook, SearchProps } from "@/types/catalogue";
import { Vlog } from "@/types/vlog";

const ITEMS_PER_PAGE = 10;

// Define combined item type with discriminant property "type"
type CombinedItem =
  | (CatalogueBook & { type: "book" })
  | (Vlog & { type: "vlog" });

export default function Search({ catabook = [], vlog = [] }: SearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState('');
  const [filteredItems, setFilteredItems] = useState<CombinedItem[]>([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);

  // Extract YouTube video ID helper
  const getYoutubeVideoId = (url: string): string | null => {
    try {
      const parsed = new URL(url);
      if (parsed.hostname === 'youtu.be') return parsed.pathname.slice(1);
      if (parsed.hostname.includes('youtube.com')) return parsed.searchParams.get('v');
      return null;
    } catch {
      return null;
    }
  };

  // Filtering with simulated delay
  const simulateFilter = useCallback((text: string, list: CombinedItem[]) => {
    setIsLoading(true);
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      const result = list.filter(item => {
        if (item.type === "book") {
          return item.name_en?.toLowerCase().includes(lowerText);
        } else if (item.type === "vlog") {
          return item.title_en.toLowerCase().includes(lowerText);
        }
        return false;
      });
      setFilteredItems(result);
      setVisibleCount(ITEMS_PER_PAGE);
      setIsLoading(false);
    }, 300);
  }, []);

  // On mount or search param change: combine lists & filter
  useEffect(() => {
    const allItems: CombinedItem[] = [
      ...catabook.map(item => ({ ...item, type: "book" as const })),
      ...vlog.map(item => ({ ...item, type: "vlog" as const })),
    ];
  
    const query = searchParams.get("search") || '';
    setSearch(query);
  
    if (query) {
      simulateFilter(query, allItems);
    } else {
      setFilteredItems(allItems);
      setVisibleCount(ITEMS_PER_PAGE);
    }
  }, [searchParams, catabook, vlog, simulateFilter]);
  
  // Input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // Search submit handler (update URL query param)
  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    router.replace(`${pathname}?${params.toString()}`);
    // No manual simulateFilter here — rely on useEffect reacting to URL change
  };

  // Infinite scroll IntersectionObserver
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setVisibleCount(prev => prev + ITEMS_PER_PAGE);
    }
  }, []);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(handleObserver);
    if (loadMoreRef.current) observer.current.observe(loadMoreRef.current);
    return () => observer.current?.disconnect();
  }, [handleObserver]);

  return (
    <div className='p-5'>
      {/* Search Box */}
      <label className='flex justify-between items-center w-full bg-[#dad9d9] py-1 px-3 md:py-3'>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleChange}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className='w-full bg-transparent outline-none'
        />
        <button onClick={handleSearch}>🔍</button>
      </label>

      {/* Loading State */}
      {isLoading ? (
        <ul className="space-y-5 mt-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <li key={idx} className="flex gap-4 w-full">
              <div className="bg-gray-300 w-[100px] h-[100px] rounded" />
              <div className="flex flex-col gap-3 flex-1">
                <div className="bg-gray-300 h-5 w-1/2" />
                <div className="bg-gray-300 h-4 w-full" />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <ul className="my-[1rem] space-y-5">
            {filteredItems.slice(0, visibleCount).map(item => {
              if (item.type === "vlog") {
                const videoId = item.video_Url ? getYoutubeVideoId(item.video_Url) : null;
                const thumbnail = videoId
                  ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                  : "/images/default-thumbnail.jpg";

                return (
                  <Link
                    href={item.video_Url || "#"}
                    key={`vlog-${item.id}`}
                    target="_blank"
                    className="block"
                  >
                    <li className="flex items-start gap-4 border-b border-gray-400 pb-3">
                      <Image
                        src={thumbnail}
                        alt={item.title_en}
                        width={100}
                        height={100}
                        className="rounded object-contain"
                      />
                      <div>
                        <h1 className="text-base font-bold">{item.title_en}</h1>
                        <p className="text-sm text-gray-600">{item.paragraph_en}</p>
                      </div>
                    </li>
                  </Link>
                );
              } else {
                // book type
                return (
                  <Link
                    key={`book-${item.id}`}
                    href={`/${routing.defaultLocale}/catalogue/${item.catalogueId}?version=${item.version}`}
                    className="block"
                  >
                    <li className="flex items-start gap-4 border-b border-gray-400 pb-3">
                      <Image
                        src={item.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name_en ?? '')}`}
                        alt={item.name_en ?? ''}
                        width={100}
                        height={100}
                        className="rounded object-contain"
                      />
                      <div>
                        <h1 className="text-base font-bold">{item.name_en}</h1>
                        <p className="text-sm text-gray-600">({item.type})</p>
                        <p className="text-sm text-gray-500">Size: {item.size_en}</p>
                        <p className="text-sm text-gray-500">UBS Code: {item.code}</p>
                        <p className="text-sm text-gray-500">ISBN: {item.isbn}</p>
                      </div>
                    </li>
                  </Link>
                );
              }
            })}
          </ul>

          {/* Infinite Scroll Trigger */}
          {visibleCount < filteredItems.length && (
            <div ref={loadMoreRef} className="h-10" />
          )}
        </>
      )}
    </div>
  );
}
