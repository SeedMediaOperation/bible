import React, { ReactNode } from 'react'
import AdminLayout from "@/app/[locale]/components/AdminLayout";
import {cookies} from "next/headers";
import {apiGet} from "@/utils/apiHelpers";
import {UserProfile} from "@/types/auth";

interface Props {
    children: ReactNode;
}
const DashboardLayout = async ({children}:Props) => {
    const token = cookies().get("accessToken")?.value;
    const res = await apiGet<{ data: UserProfile }>("/api/auth/profile", token);

    if (!res || !res.data) {
        throw new Error("Failed to fetch profile");
    }

    const profile = res.data;
  return <AdminLayout profile={profile}>{children}</AdminLayout>;
}

export default DashboardLayout