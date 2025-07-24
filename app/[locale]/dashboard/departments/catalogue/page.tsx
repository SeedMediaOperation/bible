import BreadCrumb from "@/app/[locale]/dashboard/components/BreadCrumb";
import { apiDelete, apiGet, apiPost, apiPut } from "@/utils/apiHelpers";
import Context from "./UI/Context";
import { apiResCataBook, Catalogue, CatalogueBook, Pagination } from "@/types/catalogue";

const CataloguePage = async () => {
    const res = await apiGet<{ data: Catalogue[] }>('/api/catalogues');
    const allCatalogue = res.data;

    const resBook = await apiGet<{ data: CatalogueBook[]; pagination: Pagination }>('/api/catalogue-book?page=1&limit=8');
    const allCatalogueBook = resBook.data;
    const pagination = resBook.pagination;

    // ✅ Add or update
    const submit = async (catalogueBook: CatalogueBook): Promise<{msg:string, result:CatalogueBook}> => {
        'use server';

        if (catalogueBook.id) {
            const resUpdate = await apiPut<CatalogueBook, apiResCataBook>(`/api/catalogue-book/${catalogueBook.id}`, catalogueBook);
            return {
                msg:resUpdate.message ?? 'Successfully updated.',
                result:resUpdate.data
            };
        } else {
            const resAdd = await apiPost<CatalogueBook, apiResCataBook>('/api/catalogue-book', catalogueBook);
            return {
                msg:resAdd.message ?? 'Successfully added.',
                result:resAdd.data
            };
        }
    };

    // ✅ Delete version
    const remove = async (id: string): Promise<string> => {
        'use server';

        const resDeleted = await apiDelete<CatalogueBook>(`/api/catalogue-book/${id}`);
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
                            <Context submit={submit} onDelete={remove} catabook={allCatalogueBook} catalogue={allCatalogue} pagination={pagination}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CataloguePage;
