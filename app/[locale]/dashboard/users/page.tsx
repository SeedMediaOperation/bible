import BreadCrumb from "@/app/[locale]/dashboard/components/BreadCrumb";
import Context from "@/app/[locale]/dashboard/users/UI/Context";
import { apiAuth, apiDelete, apiGet, apiPut } from "@/utils/apiHelpers";
import { UserProfile, Pagination, apiResProfile } from "@/types/auth";

const User = async () => {
    const response = await apiGet<{ data: UserProfile[]; pagination: Pagination }>(
        "/api/auth/users?page=1&limit=8"
    );
    const users = response.data;
    const pagination = response.pagination;

     // ✅ Add or update
     const submit = async (user: UserProfile): Promise<{msg:string, result:UserProfile}> => {
        'use server';

        if (user.id) {
            const resUpdate = await apiPut<UserProfile, apiResProfile>(`/api/auth/users/${user.id}`, user);
            return {
                msg:resUpdate.message ?? 'Successfully updated.',
                result:resUpdate.data
            };
        } else {
            const resAdd = await apiAuth<apiResProfile, UserProfile>('/api/auth/users', user);
            return {
                msg: resAdd.message ?? 'Successfully added.',
                result: resAdd.data
            };
        }
    };

    // ✅ Delete version
    const remove = async (id: string): Promise<string> => {
        'use server';

        const resDeleted = await apiDelete<apiResProfile>(`/api/auth/users/${id}`);
        return resDeleted.message ?? 'Successfully deleted.';
    };

    return (
        <div className="p-4">
            <div className="flex w-full flex-col lg:flex-row">
                <div className="card bg-base-300 rounded-box grow text-white p-5">
                    <div className="mb-4">
                        <BreadCrumb />
                    </div>
                    <Context users={users} submit={submit} onDelete={remove} pagination={pagination} />
                </div>
            </div>
        </div>
    );
};

export default User;