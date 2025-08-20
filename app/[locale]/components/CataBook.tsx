'use client';

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CataProps } from "@/types/catalogue";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { useTranslations } from "use-intl";
import toast, { Toaster } from "react-hot-toast";

export default function CataBook({ params, versions, catabook, catalogue }: CataProps) {
  const searchParams = useSearchParams();
  const version = searchParams.get('version');
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('btn');

  const BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

  const [showForm, setShowForm] = useState(false);
  const [selectedBook, setSelectedBook] = useState<{name: string, type: string} | null>(null);
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (!version && params?.slug) {
      router.push(`${params.slug}?version=standard-versions`);
    }
  }, [version, params?.slug, router]);

  const currentVersion = version || 'standard-versions';
  const catalogueIds = catalogue?.find(item => item.slug === params?.slug);

  const filteredBook = catabook.filter(
    (cata) =>
      cata.catalogueId === catalogueIds?.id &&
      cata.version === currentVersion
  );

  const sendToTelegram = async () => {
    if (!selectedBook) return;

    // Phone validation: allows optional +, 7-15 digits
    const phoneRegex = /^\+?\d{7,15}$/;
    if (!phone || !location) {
      toast.error(locale === 'km' ? 'សូមបញ្ចូលលេខទូរស័ព្ទ និងទីតាំង' : 'Please enter phone number and location');
      return;
    }
    if (!phoneRegex.test(phone)) {
      toast.error(locale === 'km' ? 'លេខទូរស័ព្ទមិនត្រឹមត្រូវ' : 'Invalid phone number');
      return;
    }

    try {
      const message = `📚 New Book Ordered:\n\nName: ${selectedBook.name} (${selectedBook.type}) \n\nPhone: ${phone}\n\nLocation: ${location}`;
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: "HTML",
        }),
      });
      toast.success(locale === 'km' ? 'បញ្ជាទិញបានជោគជ័យ!' : 'Order successfully!');
      setShowForm(false);
      setPhone('');
      setLocation('');
      setSelectedBook(null);
    } catch (error) {
      console.error("Error sending to Telegram:", error);
      toast.error(locale === 'km' ? 'បញ្ហាក្នុងការបញ្ជាទិញបានជោគជ័យ!' : 'Failed to Order.');
    }
  };

  return (
    // <div className="w-full h-fit bg-white">
    //   <Toaster position="top-right" reverseOrder={false} />

    //   <div className="w-full max-w-[340px] md:max-w-[720px] lg:max-w-[820px] xl:max-w-[1100px] mx-auto bg-[linear-gradient(85.15deg,_rgba(30,_30,_30,_0.8)_0.43%,_rgba(7,_32,_39,_0.64)_98.29%)] backdrop-blur-[10px] shadow-[0px_50px_50px_-40px_rgba(0,_0,_0,_0.25)] rounded-[30px] border-[2px] border-solid border-[#575757] translate-y-[-12%] md:translate-y-[-23%] p-4">
    //     <div className="w-full flex gap-3 pb-2 justify-center items-center">
    //       {versions?.map((vs, index) => (
    //         <Link
    //           key={index}
    //           href={`${params?.slug}?version=${vs.slug}`}
    //           className={`w-full text-center text-md md:text-xl px-2 py-[7px] md:py-[12px] rounded-full ${version === vs.slug ? 'bg-[#32CDF0] text-white' : 'bg-white text-black'} ${locale === 'km' ? 'font-krasar' : 'font-gotham'} text-nowrap`}
    //         >
    //           {locale === 'km' ? vs.name_km : vs.name_en}
    //         </Link>
    //       ))}
    //     </div>

    //     {/* Book List */}
    //     <div className="w-full h-[40vh] sm:h-[60vh] flex flex-wrap items-stretch gap-4 justify-center my-2 overflow-y-auto overflow-x-hidden">
    //       {filteredBook.length === 0 ? (
    //         <p className="text-white text-center text-sm md:text-xl">
    //           {locale === 'km' ? 'មិនមានសៀវភៅទេ។' : 'No books found.'}
    //         </p>
    //       ) : (
    //         filteredBook.map((cata, index) => {
    //           const name = locale === 'km' ? cata.name_km ?? "Unknown" : cata.name_en ?? "Unknown";
    //           const type = locale === 'km' ? cata.type_km ?? "Unknown" : cata.type_en ?? "Unknown";

    //           return (
    //             <div
    //               key={cata.id}
    //               data-aos="fade-left"
    //               data-aos-anchor="#example-anchor"
    //               data-aos-offset="500"
    //               data-aos-duration={`${300 + index * 100}`}
    //               className="w-full md:w-[48%] xl:w-[32%] bg-white shadow drop-shadow-lg p-4 rounded-[20px] flex flex-col justify-between"
    //               style={{ minHeight: '28rem' }} // same height for all cards
    //             >
    //               <div className="w-full h-fit mx-auto bg-[#E4E4E4] p-3 rounded-[20px]">
    //                 <Image
    //                   src={cata.image ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`}
    //                   alt={name}
    //                   width={1920}
    //                   height={1080}
    //                   quality={100}
    //                   sizes="100vw"
    //                   className="w-[15vh] h-[15vh] md:w-[16vh] md:h-[16vh] xl:w-[20vh] xl:h-[20vh] mx-auto object-contain object-center"
    //                 />
    //               </div>

    //               <h1 className={`text-[12px] md:text-[18px] xl:text-[20px] text-[#000] uppercase font-bold ${locale === 'km' ? 'font-krasar':'font-gotham'}`}>
    //                   {name}
    //                 </h1>

    //                 <p className={`text-[14px] md:text-[16px] ${locale === 'km' ? 'font-krasar':'font-gotham'}`}>({type})</p>
    //                 <p className={`text-[14px] md:text-[16px] ${locale === 'km' ? 'font-krasar':'font-gotham'}`}>Size: {locale === 'km' ? cata.size_km ?? "-" : cata.size_en ?? "-"}</p>
    //                 <p className={`text-[14px] md:text-[16px] ${locale === 'km' ? 'font-krasar':'font-gotham'}`}>UBS Code: {cata.code ?? "-"}</p>
    //                 <p className={`text-[14px] md:text-[16px] ${locale === 'km' ? 'font-krasar':'font-gotham'}`}>ISBN: {cata.isbn ?? "-"}</p>

    //               <button
    //                 onClick={() => { setSelectedBook({ name, type }); setShowForm(true); }}
    //                 className={`w-full px-6 py-2 bg-[#32CDF0] text-white mt-3 rounded-md ${locale === 'km' ? 'font-krasar':'font-gotham'}`}
    //               >
    //                 {t('buy_now')}
    //               </button>
    //             </div>
    //           );
    //         })
    //       )}
    //     </div>



    //     {/* Modal Form */}
    //     {showForm && selectedBook && (
    //       <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
    //         <div className={`bg-white p-6 rounded-xl w-[90%] max-w-md relative ${locale === 'km' ? 'font-krasar':'font-gotham'}`}>
    //           <h2 className="text-lg font-bold mb-4">{locale === 'km' ? 'បញ្ចូលព័ត៌មានរបស់អ្នក' : 'Enter Your Details'}</h2>

    //           {/* Show selected book info */}
    //           <div className="p-4">
    //             <p>{locale === 'km' ? 'ឈ្មោះសៀវភៅ' : 'Book Name'}</p>
    //             <p className="font-[700] mt-2">{selectedBook.name}</p>
    //             <p>({selectedBook.type})</p>
    //           </div>
            

    //           <input
    //             type="text"
    //             placeholder={locale === 'km' ? 'លេខទូរស័ព្ទ (ឧ. 012345678)' : 'Phone Number (e.g., 012345678)'}
    //             value={phone}
    //             onChange={(e) => setPhone(e.target.value)}
    //             className="w-full mb-3 p-2 border border-gray-300 rounded bg-[#fff] text-[#000]"
    //           />
    //           <input
    //             type="text"
    //             placeholder={locale === 'km' ? 'ទីតាំង (ឧ. ទួលទំពូង)' : 'Location (e.g., Toul Tompoung)'}
    //             value={location}
    //             onChange={(e) => setLocation(e.target.value)}
    //             className="w-full mb-3 p-2 border border-gray-300 rounded bg-[#fff] text-[#000]"
    //           />
    //           <div className="flex justify-end gap-2">
    //             <button
    //               onClick={() => setShowForm(false)}
    //               className="px-4 py-2 bg-gray-400 text-white rounded"
    //             >
    //               {locale === 'km' ? 'បោះបង់' : 'Cancel'}
    //             </button>
    //             <button
    //               onClick={sendToTelegram}
    //               className="px-4 py-2 bg-[#32CDF0] text-white rounded"
    //             >
    //               {locale === 'km' ? 'ដាក់ស្នើ' : 'Submit'}
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     )}


    //   </div>
    // </div>


    <div className="w-full h-fit bg-white">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="w-full min-h-[70vh] max-w-7xl mx-auto p-4 my-10">
        <div className="w-full flex gap-3 pb-2 justify-center items-center">
          {versions?.map((vs, index) => (
            <Link
              key={index}
              href={`${params?.slug}?version=${vs.slug}`}
              className={`w-full text-center text-md md:text-xl px-2 py-[7px] md:py-[12px] rounded-full ${version === vs.slug ? 'bg-[#32CDF0] text-white' : 'bg-white text-black border border-[#32CDF0]'} ${locale === 'km' ? 'font-krasar' : 'font-gotham'} text-nowrap`}
            >
              {locale === 'km' ? vs.name_km : vs.name_en}
            </Link>
          ))}
        </div>

        {/* Book List */}
        <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch gap-4 justify-center my-2">
          {filteredBook.length === 0 ? (
            <p className="text-white text-center text-sm md:text-xl">
              {locale === 'km' ? 'មិនមានសៀវភៅទេ។' : 'No books found.'}
            </p>
          ) : (
            filteredBook.map((cata, index) => {
              const name = locale === 'km' ? cata.name_km ?? "Unknown" : cata.name_en ?? "Unknown";
              const type = locale === 'km' ? cata.type_km ?? "Unknown" : cata.type_en ?? "Unknown";

              return (
                <div
                  key={cata.id}
                  data-aos="fade-left"
                  data-aos-anchor="#example-anchor"
                  data-aos-offset="500"
                  data-aos-duration={`${300 + index * 100}`}
                  className="w-full bg-white shadow drop-shadow-lg p-4 rounded-[20px] flex flex-col justify-between md:min-h-[22rem] lg:min-h-[28rem]"
                >
                  <div className="w-full h-fit mx-auto bg-[#E4E4E4] p-3 rounded-[20px]">
                    <Image
                      src={cata.image ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`}
                      alt={name}
                      width={1920}
                      height={1080}
                      quality={100}
                      sizes="100vw"
                      className="w-[15vh] h-[15vh] md:w-[16vh] md:h-[16vh] xl:w-[20vh] xl:h-[20vh] mx-auto object-contain object-center"
                    />
                  </div>

                  <h1 className={`text-[12px] md:text-[18px] xl:text-[20px] text-[#000] uppercase font-bold ${locale === 'km' ? 'font-krasar':'font-gotham'}`}>
                      {name}
                    </h1>

                    <p className={`text-[14px] md:text-[16px] ${locale === 'km' ? 'font-krasar':'font-gotham'}`}>({type})</p>
                    <p className={`text-[14px] md:text-[16px] ${locale === 'km' ? 'font-krasar':'font-gotham'}`}>Size: {locale === 'km' ? cata.size_km ?? "-" : cata.size_en ?? "-"}</p>
                    <p className={`text-[14px] md:text-[16px] ${locale === 'km' ? 'font-krasar':'font-gotham'}`}>UBS Code: {cata.code ?? "-"}</p>
                    <p className={`text-[14px] md:text-[16px] ${locale === 'km' ? 'font-krasar':'font-gotham'}`}>ISBN: {cata.isbn ?? "-"}</p>

                  <button
                    onClick={() => { setSelectedBook({ name, type }); setShowForm(true); }}
                    className={`w-full px-6 py-2 bg-[#32CDF0] text-white mt-3 rounded-md ${locale === 'km' ? 'font-krasar':'font-gotham'}`}
                  >
                    {t('buy_now')}
                  </button>
                </div>
              );
            })
          )}
        </div>



        {/* Modal Form */}
        {showForm && selectedBook && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className={`bg-white p-6 rounded-xl w-[90%] max-w-md relative ${locale === 'km' ? 'font-krasar':'font-gotham'}`}>
              <h2 className="text-lg font-bold mb-4">{locale === 'km' ? 'បញ្ចូលព័ត៌មានរបស់អ្នក' : 'Enter Your Details'}</h2>

              {/* Show selected book info */}
              <div className="p-4">
                <p>{locale === 'km' ? 'ឈ្មោះសៀវភៅ' : 'Book Name'}</p>
                <p className="font-[700] mt-2">{selectedBook.name}</p>
                <p>({selectedBook.type})</p>
              </div>
            

              <input
                type="text"
                placeholder={locale === 'km' ? 'លេខទូរស័ព្ទ (ឧ. 012345678)' : 'Phone Number (e.g., 012345678)'}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full mb-3 p-2 border border-gray-300 rounded bg-[#fff] text-[#000]"
              />
              <input
                type="text"
                placeholder={locale === 'km' ? 'ទីតាំង (ឧ. ទួលទំពូង)' : 'Location (e.g., Toul Tompoung)'}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full mb-3 p-2 border border-gray-300 rounded bg-[#fff] text-[#000]"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                >
                  {locale === 'km' ? 'បោះបង់' : 'Cancel'}
                </button>
                <button
                  onClick={sendToTelegram}
                  className="px-4 py-2 bg-[#32CDF0] text-white rounded"
                >
                  {locale === 'km' ? 'ដាក់ស្នើ' : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        )}


      </div>
    </div>
  );
}
