"use client";

import React, { ReactNode, useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { routing } from '@/lib/i18n/routing';
import { UserProfile } from "@/types/auth";

interface Props {
    children: ReactNode;
    profile: UserProfile;
}

const AdminLayout = ({ children, profile }: Props) => {
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/auth/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
            router.push(`/${routing.defaultLocale}/auth/login`);
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="w-full min-h-screen flex flex-col bg-base-100">
            {/* Header */}
            <header className="w-full bg-base-300 border-b border-[#575757] z-50 sticky top-0">
                <div className="flex justify-between items-center gap-3 px-4 py-2">
                    <div className="flex items-center gap-2">
                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden text-white"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

                        <Link href="/" className="transition-all duration-300 ease-in-out">
                            <Image
                                src="/logo.svg"
                                alt="Logo"
                                width={60}
                                height={60}
                                priority
                                className="object-contain"
                            />
                        </Link>
                        <h1 className="text-white text-xl font-bold hidden sm:block">Bible Admin Panel</h1>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <Image
                                        width={40}
                                        height={40}
                                        alt="User Avatar"
                                        src={
                                            profile.profile ||
                                            `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.username)}`
                                        }
                                    />
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-[#000] text-white rounded-box mt-3 w-52 p-2 shadow">
                                <li>
                                    <Link href={`/${routing.defaultLocale}/dashboard/profile`}>
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout}>Logout</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>

            {/* Layout Container */}
            <div className="flex flex-1 flex-col lg:flex-row relative">
                {/* Sidebar (mobile drawer or static) */}
                <aside
                    className={`fixed lg:static top-0 left-0 h-full min-h-screen z-40 bg-base-300 text-white w-64 p-5 transform transition-transform duration-300 ease-in-out ${
                        isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                    }`}
                >
                    <ul className="menu space-y-2">
                        <li><Link href={`/${routing.defaultLocale}/dashboard`}>Dashboard</Link></li>
                        <li><Link href={`/${routing.defaultLocale}/dashboard/users`}>Users</Link></li>
                        <li><Link href={`/${routing.defaultLocale}/dashboard/version`}>Versions</Link></li>
                        <li><Link href={`/${routing.defaultLocale}/dashboard/media`}>Medias</Link></li>
                        <li><Link href={`/${routing.defaultLocale}/dashboard/departments`}>Departments</Link></li>
                        <li><Link href={`/${routing.defaultLocale}/dashboard/vlogs`}>Vlogs</Link></li>
                    </ul>
                </aside>

                {/* Overlay for mobile sidebar */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Main content */}
                <main className="flex-1 p-5">{children}</main>
            </div>

            {/* Footer */}
            <footer className="w-full py-4 bg-gray-100 text-center text-sm">
                &copy; {new Date().getFullYear()} Bible Admin Panel
            </footer>
        </div>
    );
};

export default AdminLayout;
