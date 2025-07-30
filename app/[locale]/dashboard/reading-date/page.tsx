import BreadCrumb from "@/app/[locale]/dashboard/components/BreadCrumb";
import { apiDelete, apiGet, apiPost, apiPut } from "@/utils/apiHelpers";
import Context from "./UI/Context";
import { apiResReadingDate, ReadingDate,Pagination } from "@/types/reading";

const Version = async () => {
    const res = await apiGet<{ data: ReadingDate[]; pagination: Pagination }>('/api/reading-date');
    const allVlog = res.data;
    const pagination = res.pagination;

    // ✅ Add or update
    const submit = async (readingDate: ReadingDate): Promise<{ msg:string, result:ReadingDate}> => {
        'use server';

        if (readingDate.id) {
            const resUpdate = await apiPut<ReadingDate, apiResReadingDate>(`/api/reading-date/${readingDate.id}`, readingDate);
            return {
                msg:resUpdate.message ?? 'Successfully updated.',
                result:resUpdate.data
            };
        } else {
            const resAdd = await apiPost<ReadingDate,apiResReadingDate>('/api/reading-date', readingDate);
            return {
                msg:resAdd.message ?? 'Successfully added.',
                result:resAdd.data
            };
        }
    };

    // ✅ Delete version
    const remove = async (id: string): Promise<string> => {
        'use server';

        const resDeleted = await apiDelete<apiResReadingDate>(`/api/reading-date/${id}`);
        return resDeleted.message ?? 'Successfully deleted.';
    };

    return (
        <div className="p-4">
            <div className="flex w-full flex-col lg:flex-row">
                <div className="card bg-gray-900 rounded-box grow text-white p-5">
                    <div className="mb-4">
                        <BreadCrumb />
                    </div>
                    <div className="flex flex-row">
                        <div className="w-full px-3">
                            <Context submit={submit} onDelete={remove} readingDate={allVlog} pagination={pagination}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Version;
