import BreadCrumb from "@/app/[locale]/dashboard/components/BreadCrumb";
import { ApiResponseChapter, Book, Chapters, Pagination } from "@/types/book";
import { apiGet,apiPut,apiPost,apiDelete } from "@/utils/apiHelpers";
import Context from "./UI/Context";

const Chapter = async () => {
    const res = await apiGet<{data: Chapters[], pagination:Pagination}>('/api/books/chapters?page=1&limit=8');
    const resBook = await apiGet<{data: Book[]}>('/api/books');
    const allChapters = res.data;
    const allBooks = resBook.data;
    const pagination = res.pagination;
    // ✅ Add or update
    const submit = async (chapter: Chapters): Promise<{msg?:string,result?:Chapters}> => {
        'use server';

        if (chapter.id) {
            const resUpdate = await apiPut<Chapters,ApiResponseChapter>(`/api/books/chapters/${chapter.id}`, chapter);
            return {
                msg:resUpdate.message ?? 'Successfully updated.',
                result:resUpdate.data!
            };
        } else {
            const resAdd = await apiPost<Chapters,ApiResponseChapter>('/api/books/chapters', chapter);
            return {
                msg:resAdd.message ?? 'Successfully created.',
                result:resAdd.data!
            };
        }
    };

    // ✅ Delete version
    const remove = async (id: string): Promise<{msg?:string, result:Chapters}> => {
        'use server';

        const resDeleted = await apiDelete<ApiResponseChapter>(`/api/books/chapters/${id}`);
         return {
            msg:resDeleted.message ?? 'Successfully deleted.',
            result:resDeleted.data!
        };
    };

    return (
        <div className="p-4">
            <div className="flex w-full flex-col lg:flex-row">
                <div className="card bg-base-300 rounded-box grow text-white p-5">
                    <div className="mb-4">
                        <BreadCrumb />
                    </div>
                    <div className="flex flex-row">
                        <div className="w-full px-3">
                            <Context books={allBooks} chapters={allChapters} submit={submit} onDelete={remove} pagination={pagination}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chapter;