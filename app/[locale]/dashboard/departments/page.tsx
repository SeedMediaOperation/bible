import BreadCrumb from "@/app/[locale]/dashboard/components/BreadCrumb";
import { apiDelete, apiGet, apiPost, apiPut } from "@/utils/apiHelpers";
import Context from "./UI/Context";
import { apiResCatalogue, Catalogue, Pagination } from "@/types/catalogue";
import Link from "next/link";
import { routing } from "@/lib/i18n/routing";

const CataloguePage = async () => {
    const res = await apiGet<{ data: Catalogue[]; pagination: Pagination }>('/api/catalogues?page=1&limit=8');
    const allCatalogue = res.data;
    const pagination = res.pagination;

    // ✅ Add or update
    const submit = async (catalogue: Catalogue): Promise<{msg:string, result:Catalogue}> => {
        'use server';

        if (catalogue.id) {
            const resUpdate = await apiPut<Catalogue, apiResCatalogue>(`/api/catalogues/${catalogue.id}`, catalogue);
            return {
                msg:resUpdate.message ?? 'Successfully updated.',
                result:resUpdate.data
            };
        } else {
            const resAdd = await apiPost<Catalogue, apiResCatalogue>('/api/catalogues', catalogue);
            return {
                msg:resAdd.message ?? 'Successfully added.',
                result: resAdd.data
            };
        }
    };

    // ✅ Delete version
    const remove = async (id: string): Promise<string> => {
        'use server';

        const resDeleted = await apiDelete<Catalogue>(`/api/catalogues/${id}`);
        return resDeleted.message ?? 'Successfully deleted.';
    };

    return (
        <div className="p-4">
            <div className="flex w-full flex-col lg:flex-row">
                <div className="card bg-base-300 rounded-box grow text-white p-5">
                    <div className="mb-4">
                        <BreadCrumb />
                    </div>
                    <div className="flex flex-col md:flex-row">
                    <div className="md:w-[20%] h-full p-2 border-r-2 border-gray-200">
                            <ul>
                                <li className="px-3 py-1 hover:bg-[#50c9ee] rounded-full">
                                    <Link href={`/${routing.defaultLocale}/dashboard/departments/catalogue`}> 
                                        Catalogue Book
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="md:w-[80%] px-3">
                            <Context submit={submit} onDelete={remove} catalogue={allCatalogue} pagination={pagination}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CataloguePage;
