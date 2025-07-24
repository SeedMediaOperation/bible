import ProfileCard from "@/app/[locale]/components/ProfileCard";
import {apiGet, apiPost} from "@/utils/apiHelpers";
import {cookies} from "next/headers";
import {UserProfile} from "@/types/auth";

export default async function ProfilePage() {
    const token = cookies().get("accessToken")?.value;
    const res = await apiGet<{ data: UserProfile }>("/api/auth/profile", token);

    if (!res || !res.data) {
        throw new Error("Failed to fetch profile");
    }

    const profile = res.data;

    return (
        <ProfileCard
            profile={profile}
            submit={async (updatedProfile: UserProfile) => {
                "use server";
                return await apiPost("/api/auth/profile/update", updatedProfile, token);
            }}
        />
    );
}
