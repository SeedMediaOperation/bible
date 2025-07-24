import BreadCrumb from "@/app/[locale]/dashboard/components/BreadCrumb";
import type { ApiResponseMedia, Media, Pagination, Version } from "@/types/book";
import { apiDelete, apiGet, apiPost, apiPut } from "@/utils/apiHelpers";
import Context from "./UI/Context";

const Version = async () => {
    const res = await apiGet<{ data: Media[]; pagination: Pagination }>('/api/medias?page=1&limit=8');
    const allMedia = res.data;
    const pagination = res.pagination;

    // ✅ Add or update
    const submit = async (media: Media): Promise<{msg:string, result:Media}> => {
        'use server';

        if (media.id) {
            const resUpdate = await apiPut<Media,ApiResponseMedia>(`/api/medias/${media.id}`, media);
            return {
                msg:resUpdate.message ?? 'Successfully updated.',
                result:resUpdate.data!
            };
        } else {
            const resAdd = await apiPost<Media,ApiResponseMedia>('/api/medias', media);
            return {
                msg:resAdd.message ?? 'Successfully created.',
                result:resAdd.data!
            };
        }
    };

    // ✅ Delete version
    const remove = async (id: string): Promise<string> => {
        'use server';

        const resDeleted = await apiDelete<Media>(`/api/medias/${id}`);
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
                            <Context submit={submit} onDelete={remove} medias={allMedia} pagination={pagination}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Version;
