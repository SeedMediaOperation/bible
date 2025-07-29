import BreadCrumb from "@/app/[locale]/dashboard/components/BreadCrumb";
import { routing } from "@/lib/i18n/routing";
import { ApiResponseBook, Book, Pagination, Version } from "@/types/book";
import { apiGet,apiPut,apiPost,apiDelete } from "@/utils/apiHelpers";
import Link from "next/link";
import Context from "./UI/Context";

const  Books = async () => {
    const res = await apiGet<{data: Book[],pagination:Pagination}>('/api/books');
    const resVersion = await apiGet<{data: Version[]}>('/api/books/versions');
    const allBooks = res.data;
    const allVersion = resVersion.data;
    const pagination = res.pagination;

    // ✅ Add or update
    const submit = async (book: Book): Promise<{msg?:string, result?:Book,success?:boolean}> => {
        'use server';

        if (book.id) {
            const resUpdate = await apiPut<Book, ApiResponseBook>(`/api/books/${book.id}`, book);

            return {
                success: resUpdate.success ?? true,
                msg:resUpdate.message ?? 'Successfully updated.',
                result:resUpdate.data!
            };
        } else {
            const resAdd = await apiPost<Book, ApiResponseBook>('/api/books', book);
            return {
                success: resAdd.success ?? true,
                msg:resAdd.message ?? 'Successfully added.',
                result:resAdd.data!
            };
        }
    };

    // ✅ Delete version
    const remove = async (id: string): Promise<{msg:string, result:Book}> => {
        'use server';

        const resDeleted = await apiDelete<ApiResponseBook>(`/api/books/${id}`);
        return {
            msg:resDeleted.message || 'Successfully added.',
            result:resDeleted.data!
        };
    };

    return (
        <div className="p-4">
            <div className="flex w-full flex-col lg:flex-row">
                <div className="card bg-gray-900 rounded-box grow text-white p-5">
                    <div className="mb-4">
                        <BreadCrumb />
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-[20%] h-full p-2 border-r-2 border-gray-200">
                            <ul>
                                <li className="px-3 py-1 hover:bg-[#50c9ee] rounded-full">
                                    <Link href={`/${routing.defaultLocale}/dashboard/version/books/chapter`}>
                                        Chapters
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="w-full md:w-[80%] py-3 px-3">
                            <Context books={allBooks} versions={allVersion} submit={submit} onDelete={remove} pagination={pagination}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Books;