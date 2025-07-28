'use client';

import { alertService } from "@/lib/alertServices";
import { Media, MediaProps } from "@/types/book";
import Image from "next/image";
import Link from "next/link";
import React, {
    useRef,
    useState,
    useEffect
} from "react";

type SortType = 'latest' | 'oldest' | '';
const ITEMS_PER_PAGE = 8;

export default function Context({ medias, pagination:initialPagination, onDelete, submit }: MediaProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [mode, setMode] = useState<'add' | 'edit'>('add');
    const [form, setForm] = useState<Media>({
        id:"",
        pro_name_En: '',
        pro_name_Km: '',
        video_url: ''
    });

    
    const [search, setSearch] = useState('');
    const [pagination, setPagination] = useState(initialPagination);
    const [sort, setSort] = useState<SortType>('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [localData, setLocalData] = useState<Media[]>(medias);
    const [confirmDeleteUserId, setConfirmDeleteUserId] = useState<string | null>(null);
    const [filteredData, setFilteredData] = useState<Media[]>(medias);


    const handleOpenModal = (type: 'add' | 'edit', data?: Media) => {
        setMode(type);
        setForm(data || {id:"", pro_name_En:'', pro_name_Km:'', video_url:''});
        dialogRef.current?.showModal();
    };

    const handleCloseModal = () => {
        dialogRef.current?.close();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!submit) {
            alertService.error('Submit function is not provided.');
            return;
        }

        setLoading(true);

        try {
            const result = await submit(form);
            if (mode === 'add') {
                // Simulate ID if not returned
                setLocalData(prev => [...prev, result.result]);
            } else {
                setLocalData(prev =>
                    prev.map(v => (v.id === result.result.id ? result.result : v))
                );
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

    const getYoutubeVideoId = (url: string) => {
        try {
            const parsed = new URL(url);
            if (parsed.hostname === 'youtu.be') {
                return parsed.pathname.slice(1); // removes leading "/"
            }
            // Handle regular youtube.com/watch?v=...
            if (parsed.hostname.includes('youtube.com')) {
                return parsed.searchParams.get('v');
            }
            return null;
        } catch {
            return null;
        }
    };
    
    const onPageChange = (newPage: number) => {
        if (newPage !== page && newPage >= 1 && newPage <= (pagination?.totalPages || 1)) {
            setPage(newPage);
        }
    };

    useEffect(() => {
        setLoading(true);
    
        const timeout = setTimeout(() => {
            let data = [...localData];
      
          // Filter
          if (search) {
            const lowerSearch = search.toLowerCase();
            const upperSearch = search.toUpperCase();
            data = data.filter((item) =>
                item.pro_name_En?.toLowerCase().includes(lowerSearch) ||
                item.pro_name_Km?.toLowerCase().includes(lowerSearch) || 
                item.pro_name_En?.toLowerCase().includes(upperSearch) ||
                item.pro_name_Km?.toUpperCase().includes(upperSearch)   
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
        }, 500); // optional debounce
    
        return () => clearTimeout(timeout);
    }, [search, localData, page, sort]);
    
    return (
        <>
            <div className="flex flex-row justify-between items-start md:items-center gap-4 mb-6">
                <label className="input input-bordered flex items-center gap-2 w-fit md:w-auto">
                    <input
                        type="search"
                        className="grow text-white"
                        placeholder="Search versions..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </label>
                <div className="flex items-center gap-2">
                    <select
                        className="select select-bordered text-white"
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

            <div className="hidden md:block">
                <table className="table w-full text-sm md:text-base">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th className="hidden sm:table-cell">Media</th>
                            <th className="hidden lg:table-cell">Media English</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="text-center py-4">Loading...</td>
                            </tr>
                        ) : filteredData.length > 0 ? (
                            filteredData.map((item, index) => {
                                const videoId = item.video_url ? getYoutubeVideoId(item.video_url) : null;
                                const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : `${process.env.NEXT_PUBLIC_BASE_URL}/logo.svg`;
                            
                                return (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td className="hidden sm:table-cell">
                                            <Link
                                                href={item.video_url ?? ''}
                                                className="relative w-full h-full"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Image
                                                    src={thumbnailUrl}
                                                    alt={`Service ${index + 1}`}
                                                    width={500}
                                                    height={500}
                                                    className="w-[100px] h-full object-cover"
                                                />
                                            </Link>
                                        </td>
                                        <td className="hidden lg:table-cell">{item.pro_name_En}</td>
                                        <td className={`dropdown ${medias.length > 10 ? 'dropdown-top dropdown-end' : 'dropdown-end'}`}>
                                            <button tabIndex={0} role="button" className="btn btn-ghost btn-xs">Details</button>
                                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                                <li className="w-full">
                                                    <button
                                                        onClick={() => handleOpenModal('edit', item)}
                                                        className="w-full inline-flex text-green-600"
                                                    >
                                                        Edit
                                                    </button>
                                                </li>
                                                <li className="w-full">
                                                    <button
                                                        onClick={() => setConfirmDeleteUserId(item.id ?? '')}
                                                        className="w-full inline-flex text-red-600"
                                                    >
                                                        Delete
                                                    </button>
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={4} className="text-center py-4">No versions found.</td>
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
                    filteredData.map((item) => {
                        const videoId = item.video_url ? getYoutubeVideoId(item.video_url) : null;
                        const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : `${process.env.NEXT_PUBLIC_BASE_URL}/logo.svg`;
                     
                        return(
                        <div key={item.id} className="bg-base-200 p-4 rounded shadow text-white">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="avatar">
                                    <div className="mask mask-squircle h-20 w-20">
                                        <Link
                                                href={item.video_url ?? ''}
                                                className="relative w-full h-full"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Image
                                                    src={thumbnailUrl}
                                                    alt={`${item.pro_name_En}`}
                                                    width={500}
                                                    height={500}
                                                    className="w-full h-full object-cover"
                                                />
                                        </Link>
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold">{item.pro_name_En}</div>
                                    <div className="text-sm opacity-50">{item.pro_name_Km}</div>
                                </div>
                            </div>
                            <div className="text-right mt-2 dropdown dropdown-start dropdown-top">
                                <button tabIndex={0} role="button" className="btn btn-xs btn-outline btn-info">
                                    Details
                                </button>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                    <li className="w-full">
                                        <button
                                            onClick={() => handleOpenModal('edit', item)}
                                            className="w-full inline-flex text-green-600"
                                        >
                                            Edit
                                        </button>
                                    </li>
                                    <li className="w-full">
                                        <button
                                            onClick={() => setConfirmDeleteUserId(item.id!)}
                                            className="w-full inline-flex text-red-600"
                                        >
                                            Delete
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )})
                ) : (
                    <p>No record found.</p>
                )}
            </div>

            {/* Pagination */}
            <div className="join w-full inline-flex justify-end mt-4">
                <button className="join-item btn" disabled={page === 1} onClick={() => onPageChange(page - 1)}>Prev</button>

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

                <button className="join-item btn" disabled={!pagination?.hasNextPage} onClick={() => onPageChange(page + 1)}>Next</button>
            </div>

            <dialog ref={dialogRef} className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button onClick={handleCloseModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                    </form>
                    <h3 className="font-bold text-lg mb-4">
                        {mode === 'add' ? 'Add New Media' : 'Edit Media'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            name="pro_name_En"
                            type="text"
                            required
                            value={form.pro_name_En}
                            onChange={handleChange}
                            placeholder="Title English"
                            className={`input input-bordered w-full`}
                            disabled={loading}
                        />

                        <input
                            name="pro_name_Km"
                            type="text"
                            required
                            value={form.pro_name_Km}
                            onChange={handleChange}
                            placeholder="Title Khmer"
                            className={`input input-bordered w-full`}
                            disabled={loading}
                        />

                        <label className="input validator w-full">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                                >
                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                                </g>
                            </svg>
                            <input
                                type="url"
                                required
                                name="video_url"
                                placeholder="https://"
                                value={form.video_url}
                                onChange={handleChange}
                                pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9\-].*[a-zA-Z0-9])?\.)+[a-zA-Z].*$"
                                title="Must be valid URL"
                                disabled={loading}
                            />
                        </label>
                        <p className="validator-hint">Must be valid URL</p>

                        <button type="submit" className="btn btn-info w-full" disabled={loading}>
                            {loading ? 'Saving...' : mode === 'add' ? 'Create Book' : 'Update Book'}
                        </button>
                    </form>
                </div>
            </dialog>

            {/* Delete Confirmation Dialog */}
                {confirmDeleteUserId && (
                    <dialog open className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Confirm Deletion</h3>
                            <p className="py-4">Are you sure you want to delete this record?</p>
                            <div className="modal-action">
                                <form method="dialog" className="space-x-2">
                                    <button
                                        className="btn btn-error"
                                        onClick={() => handleDelete(confirmDeleteUserId)}
                                        disabled={loading}
                                    >
                                        {loading ? 'Deleting...' : 'Yes, Delete'}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn"
                                        onClick={() => setConfirmDeleteUserId(null)}
                                    >
                                        Cancel
                                    </button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                )}

        </>
    );
}
