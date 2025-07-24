'use client';

import { Profile, UserProfile } from "@/types/auth";
import Image from "next/image";
import { CldUploadWidget, CloudinaryUploadWidgetResults } from "next-cloudinary";
import { alertService } from "@/lib/alertServices";
import { useState } from "react";

export default function ProfileCard({ profile, submit }: Profile) {
    const [user, setUser] = useState<UserProfile>(profile);

    const handleImageUpload = async (result: CloudinaryUploadWidgetResults) => {
        let imageUrl: string | undefined;

        if (typeof result.info !== "string") {
            imageUrl = result.info?.secure_url;
        }

        if (!imageUrl) return;

        const res = await submit({ ...user, profile: imageUrl });
        if (res.ok) {
            setUser((prev) => ({ ...prev, profile: imageUrl }));
            alertService.success(res.message || "Profile updated successfully!");
        }
    };

    return (
        <div className="profile-page max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl text-gray-900">
            <div className="flex flex-col items-center space-y-4">
                <div className="avatar">
                    <div className="w-32 h-32 ring-4 ring-[#50c9ee] ring-offset-2 ring-offset-white rounded-full overflow-hidden">
                        <CldUploadWidget
                            uploadPreset="biblesocietycambodia"
                            options={{
                                sources: ["local"],
                                cropping: true,
                                multiple: false,
                            }}
                            onSuccess={handleImageUpload}
                        >
                            {({ open }) => (
                                <button onClick={() => open()} className="relative w-full h-full group rounded-full overflow-hidden">
                                    <Image
                                        width={128}
                                        height={128}
                                        src={
                                            user.profile ||
                                            `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}`
                                        }
                                        alt={`${user.username}'s avatar`}
                                        className="object-cover w-full h-full rounded-full"
                                    />
                                    {/* Overlay shown on hover */}
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                                        <span className="text-white font-semibold">Edit Profile</span>
                                    </div>
                                </button>

                            )}
                        </CldUploadWidget>
                    </div>
                </div>
                <div className="text-center">
                    <h1 className="text-3xl font-semibold">Welcome, {user.username}!</h1>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    {user.role && (
                        <span className="inline-block mt-2 px-3 py-1 text-sm bg-[#50c9ee] text-white rounded-full capitalize">
                            {user.role}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
