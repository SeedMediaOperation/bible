'use client';

import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import { UserProps, UserProfile } from "@/types/auth";
import { alertService } from "@/lib/alertServices";
import { CldUploadWidget, CloudinaryUploadWidgetResults } from "next-cloudinary";

type SortType = 'latest' | 'oldest' | '';
const ITEMS_PER_PAGE = 5;
export default function Context({ users , pagination:initialPagination, submit, onDelete }: UserProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [confirmDeleteUserId, setConfirmDeleteUserId] = useState<string | null>(null);
    const [mode, setMode] = useState<'add' | 'edit'>('add');

    // States
    const [user, setUser] = useState<UserProfile>({ username: '', email: '', profile:'', role:'USER', password:''});
    const [search, setSearch] = useState('');
    const [pagination, setPagination] = useState(initialPagination);
    const [sort, setSort] = useState<SortType>('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [localData, setLocalData] = useState<UserProfile[]>(users);
    const [filteredData, setFilteredData] = useState<UserProfile[]>(users);

    const handleOpenModal = (type: 'add' | 'edit', data?: UserProfile) => {
        setMode(type);
        setUser(data || { username: '', email: '', profile:'', role:'USER', password:''});
        dialogRef.current?.showModal();
    };

    const handleCloseModal = () => {
        dialogRef.current?.close();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!submit) {
            alertService.error('Submit function is not provided.');
            return;
        }

        setLoading(true);

        try {
            const result = await submit(user);
            if (mode === 'add') {
                // Simulate ID if not returned
                setLocalData(prev => [...prev, result.result]);
            } else {
                setLocalData(prev => prev.map(v => (v.id === result.result.id ? result.result : v)));
            }
            dialogRef.current?.close();
            alertService.success(result.msg);
        } catch (error:unknown) {
            if (error instanceof Error) {
                alertService.error(error.message);
            } else {
                alertService.error('Something went wrong!');
            }            
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const onPageChange = (newPage: number) => {
        if (newPage !== page && newPage >= 1 && newPage <= (pagination?.totalPages || 1)) {
            setPage(newPage);
        }
    };

    const handleImageUpload = async (result: CloudinaryUploadWidgetResults) => {
        if(typeof result.info !== 'string'){
            const imageUrl = result.info?.secure_url;
            if(imageUrl){
                setUser((prev) => ({
                    ...prev,
                    profile: imageUrl
                }));
                alertService.success('Image uploaded successfully!');
                dialogRef.current?.showModal();
            }
        }
    }

    const handleDelete = async (id: string) => {
        if (!onDelete) {
            alertService.error('Submit function is not provided.');
            return;
        }
        try {
            setLoading(true);
            const msg = await onDelete(id);
            setLocalData(prev => prev.filter(v => v.id !== id));
            alertService.success(msg ?? "Successfully deleted.");
        } catch (error:unknown) {
            if (error instanceof Error) {
                alertService.error(error.message);
            } else {
                alertService.error('Something went wrong!');
            }            
            console.log(error);
        } finally {
            setLoading(false);
            setConfirmDeleteUserId(null);// Close confirmation dialog after action
        }
    };

    useEffect(() => {
        setLoading(true);
      
        const timeout = setTimeout(() => {
          let data = [...localData];
      
          // Filter
          if (search) {
            const lowerSearch = search.toLowerCase();
            data = data.filter((item) =>
              item.username?.toLowerCase().includes(lowerSearch)
            );
          }
      
          // Sort
          if (sort === 'latest') {
            data.sort((a, b) => {
              const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
              const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
              return dateB - dateA;
            });
          } else if (sort === 'oldest') {
            data.sort((a, b) => {
              const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
              const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
              return dateA - dateB;
            });
          }
      
          // Pagination
          const currentPage = data.length;
          const totalPages = Math.ceil(currentPage / ITEMS_PER_PAGE);
          const start = (page - 1) * ITEMS_PER_PAGE;
          const end = start + ITEMS_PER_PAGE;
          const paginated = data.slice(start, end);
      
          setFilteredData(paginated);
          setPagination({
            currentPage,
            totalPages,
            hasNextPage: page < totalPages,
          });
          setLoading(false);
        }, 300); // debounce delay
      
        return () => clearTimeout(timeout);
      }, [search, localData, page, sort]);
      

    return (
        <>
            {/* Controls and Table (unchanged) */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                {/* Search, Sort, Add New */}
                {/* ... */}
                <label className="input input-bordered flex items-center gap-2 w-full md:w-auto">
                    {/* Search icon */}
                    <input
                        type="search"
                        className="grow text-black dark:text-white"
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => {
                            setPage(1);
                            setSearch(e.target.value);
                        }}
                    />
                </label>
                <div className="flex items-center gap-2">
                    <select
                        className="select select-bordered text-black dark:text-white"
                        value={sort}
                        onChange={(e) => {
                            setPage(1);
                            setSort(e.target.value as SortType);
                        }}
                    >
                        <option value="" disabled>Sort</option>
                        <option value="latest">Latest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                    <button onClick={() => handleOpenModal('add')} className="btn btn-info">
                        Add New
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="hidden md:block ">
                <table className="table w-full text-sm md:text-base">
                    <thead>
                        <tr>
                            <th className="text-white">Name</th>
                            <th className="hidden sm:table-cell text-white">Email</th>
                            <th className="hidden lg:table-cell text-white">Verify Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="text-center py-4">Loading...</td>
                            </tr>
                        ) : filteredData.length > 0 ? (
                            filteredData.map((user) => (
                                <tr key={user.id}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                        <Image
                                                        width={400}
                                                        height={400}
                                                        priority
                                                        src={
                                                            user.profile ||
                                                            `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&format=png`
                                                        }
                                                        alt={user.username}
                                                        className="rounded-full"
                                                        />

                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{user.username}</div>
                                                <div className="text-sm opacity-50">{user.role}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="hidden sm:table-cell">{user.email}</td>
                                    <td className="hidden lg:table-cell">
                                        <span className={`w-fit px-5 py-1 rounded-full ${!user.isVerifyEmail ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-600'}`}>
                                            {user.isVerifyEmail ? 'Yes' : 'No'}
                                        </span>
                                    </td>
                                    <td className={`dropdown ${users.length > 10 ? 'dropdown-top dropdown-end' : 'dropdown-end'}`}>
                                        <button tabIndex={0} role="button" className="btn btn-ghost btn-xs">Details</button>
                                        <ul tabIndex={0} className="dropdown-content menu bg-gray-900 rounded-box z-1 w-52 p-2 shadow-sm">
                                            <li className="w-full">
                                                <button
                                                    onClick={() => handleOpenModal('edit', user)}
                                                    className="w-full inline-flex text-green-600"
                                                >
                                                    Edit
                                                </button>
                                            </li>
                                            <li className="w-full">
                                                <button
                                                    onClick={() => setConfirmDeleteUserId(user.id!)}
                                                    className="w-full inline-flex text-red-600"
                                                >
                                                    Delete
                                                </button>
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="text-center py-4">No users found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
                {loading ? (
                    <p>Loading...</p>
                ) : filteredData.length > 0 ? (
                    filteredData.map((user) => (
                        <div key={user.id} className="bg-gray-900 p-4 rounded shadow text-white">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="avatar">
                                    <div className="mask mask-squircle h-12 w-12">
                                        <Image
                                            width={400}
                                            height={400}
                                            priority
                                            src={user.profile || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}`}
                                            alt={user.username}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold">{user.username}</div>
                                    <div className="text-sm opacity-50">{user.role}</div>
                                </div>
                            </div>
                            <p className="text-sm">Email: {user.email}</p>
                            <p className="text-sm">
                                Verify Email:{' '}
                                <span className={`w-fit px-5 py-1 rounded-full ${!user.isVerifyEmail ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-600'}`}>
                                    {user.isVerifyEmail ? 'Yes' : 'No'}
                                </span>
                            </p>
                            <div className="text-right mt-2 dropdown dropdown-start dropdown-top">
                                <button tabIndex={0} role="button" className="btn btn-xs btn-outline btn-info">
                                    Details
                                </button>
                                <ul tabIndex={0} className="dropdown-content menu bg-gray-900 rounded-box z-1 w-52 p-2 shadow-sm">
                                    <li className="w-full">
                                        <button
                                            onClick={() => handleOpenModal('edit', user)}
                                            className="w-full inline-flex text-green-600"
                                        >
                                            Edit
                                        </button>
                                    </li>
                                    <li className="w-full">
                                        <button
                                            onClick={() => setConfirmDeleteUserId(user.id!)}
                                            className="w-full inline-flex text-red-600"
                                        >
                                            Delete
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No users found.</p>
                )}
            </div>

            {/* Pagination */}
            <div className="join w-full inline-flex justify-end mt-4">
                <button className="join-item btn text-white" disabled={page === 1} onClick={() => onPageChange(page - 1)}>Prev</button>

                {Array.from({ length: pagination?.totalPages || 1 }).map((_, i) => {
                    const pageNumber = i + 1;
                    return (
                        <button
                            key={pageNumber}
                            className={`join-item btn ${pageNumber === page ? 'btn-active' : ''}`}
                            onClick={() => onPageChange(pageNumber)}
                        >
                            {pageNumber}
                        </button>
                    );
                })}

                <button className="join-item btn text-white" disabled={!pagination?.hasNextPage} onClick={() => onPageChange(page + 1)}>Next</button>
            </div>

            {/* Modal */}
            <dialog ref={dialogRef} className="modal text-black dark:bg-white">
                <div className="modal-box">
                    <form method="dialog">
                        <button onClick={handleCloseModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                    </form>
                    <h3 className="font-bold text-lg mb-4">
                        {mode === 'add' ? 'Add New User' : `Edit User`}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            name="username"
                            type="text"
                            required
                            value={user.username}
                            onChange={handleChange}
                            placeholder="Username"
                            className="input input-bordered w-full"
                            pattern="[A-Za-z][A-Za-z0-9\-]*"
                            minLength={3}
                            maxLength={30}
                            title="Only letters, numbers or dash"
                        />

                        <input
                            name="email"
                            type="email"
                            required
                            value={user.email}
                            onChange={handleChange}
                            placeholder="mail@site.com"
                            className="input input-bordered w-full"
                        />

                        {mode === 'add' && (
                            <input
                                name="password"
                                type="password"
                                required
                                value={user.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="input input-bordered w-full"
                            />
                        )}

                        <select
                            name="role"
                            value={user.role}
                            onChange={handleChange}
                            className="select w-full"
                        >
                            <option disabled>Pick a Role</option>
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>

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
                                <button
                                    type="button"
                                    onClick={() => {
                                        // ✅ Close the modal first
                                        dialogRef.current?.close();

                                        // ✅ Delay a bit to ensure modal is gone
                                        setTimeout(() => {
                                            open();
                                        }, 100); // 100ms delay
                                    }}
                                    className="btn btn-outline w-full"
                                >
                                    {user.profile ? "Change Profile Image" : "Upload Profile Image"}
                                </button>
                            )}
                        </CldUploadWidget>


                        {user.profile && (
                            <div className="text-center">
                                <Image width={1920} height={1080}
                                    src={user.profile}
                                    alt="Profile Preview"
                                    className="w-24 h-24 rounded-full mx-auto mt-2 object-cover"
                                />
                            </div>
                        )}

                        <button type="submit" className="btn btn-primary w-full">
                            {loading ? 'Saving...' : mode === 'add' ? 'Create User' : 'Update User'}
                        </button>
                    </form>
                </div>
            </dialog>
            {/* Delete Confirmation Dialog */}
            {confirmDeleteUserId && (
                <div role="alert" className="alert alert-vertical sm:alert-horizontal fixed top-2 right-5 z-50 bg-gray-900 p-4 rounded shadow-lg">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="stroke-info h-6 w-6 shrink-0"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                    </svg>
                    <span className="ml-2">Are you sure you want to delete this record?</span>
                    <div className="mt-3 space-x-2">
                        <button
                            className="btn btn-sm"
                            onClick={() => setConfirmDeleteUserId(null)}
                        >
                            Deny
                        </button>
                        <button
                            className="btn btn-sm btn-primary"
                            onClick={() => handleDelete(confirmDeleteUserId!)}
                        >
                            {loading ? 'Saving...' : 'Accept'}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
