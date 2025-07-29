import BreadCrumb from "@/app/[locale]/dashboard/components/BreadCrumb";
import type { Version, ApiResponseVersion, Pagination } from "@/types/book";
import { apiDelete, apiGet, apiPost, apiPut } from "@/utils/apiHelpers";
import Context from "./UI/Context";
import Link from "next/link";
import { routing } from "@/lib/i18n/routing";

const VersionPage = async () => {
  const res = await apiGet<{ data: Version[], pagination:Pagination }>("/api/books/versions?page=1&limit=7");
  const allVersions = res.data;
  const pagination = res.pagination;

  // Add or update version
  const submit = async (version: Version): Promise<{ msg: string; result: Version }> => {
    "use server";
  
    if (version.id) {
      const res = await apiPut<Version, ApiResponseVersion>(`/api/books/versions/${version.id}`, version);
      return {
        msg: res.message ?? "Successfully updated.",
        result: res.data!, // You can add a check if needed
      };
    } else {
      const res = await apiPost<Version, ApiResponseVersion>("/api/books/versions", version);
      return {
        msg: res.message ?? "Successfully added.",
        result: res.data!,
      };
    }
  };
  

  // Delete version
  const remove = async (id: string): Promise<{msg:string, result:Version}> => {
    "use server";

    const resDeleted = await apiDelete<ApiResponseVersion>(`/api/books/versions/${id}`);
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
            <div className="md:w-[15%] h-full p-2 border-r-2 border-gray-200">
              <ul>
                <li className="px-3 py-1 hover:bg-[#50c9ee] rounded-full">
                  <Link href={`/${routing.defaultLocale}/dashboard/version/books`}>
                    Books
                  </Link>
                </li>
                <li className="px-3 py-1 hover:bg-[#50c9ee] rounded-full">
                  <Link href={`/${routing.defaultLocale}/dashboard/version/books/chapter`}>
                    Chapters
                  </Link>
                </li>
              </ul>
            </div>
            <div className="md:w-[95%] px-3">
              <Context submit={submit} onDelete={remove} versions={allVersions} pagination={pagination}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VersionPage;
