import BreadCrumb from "@/app/[locale]/dashboard/components/BreadCrumb";
import { apiDelete, apiGet, apiPost, apiPut } from "@/utils/apiHelpers";
import Context from "./UI/Context";
import { apiResVlog, Vlog,Pagination } from "@/types/vlog";

const Version = async () => {
    const res = await apiGet<{ data: Vlog[]; pagination: Pagination }>('/api/vlogs');
    const allVlog = res.data;
    const pagination = res.pagination;

    // ✅ Add or update
    const submit = async (media: Vlog): Promise<{ msg:string, result:Vlog}> => {
        'use server';

        if (media.id) {
            const resUpdate = await apiPut<Vlog, apiResVlog>(`/api/vlogs/${media.id}`, media);
            return {
                msg:resUpdate.message ?? 'Successfully updated.',
                result:resUpdate.data
            };
        } else {
            const resAdd = await apiPost<Vlog,apiResVlog>('/api/vlogs', media);
            return {
                msg:resAdd.message ?? 'Successfully added.',
                result:resAdd.data
            };
        }
    };

    // ✅ Delete version
    const remove = async (id: string): Promise<string> => {
        'use server';

        const resDeleted = await apiDelete<apiResVlog>(`/api/vlogs/${id}`);
        return resDeleted.message ?? 'Successfully deleted.';
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
                            <Context submit={submit} onDelete={remove} vlog={allVlog} pagination={pagination}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Version;
