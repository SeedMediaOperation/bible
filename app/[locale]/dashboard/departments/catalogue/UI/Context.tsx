'use client';

import { alertService } from "@/lib/alertServices";
import { CatalogueBook, CataProps } from "@/types/catalogue";
import { CloudinaryUploadWidgetResults,CldUploadWidget } from "next-cloudinary";
import { Version } from '@/app/[locale]/data/version';

import Image from "next/image";
import React, {
    useRef,
    useState,
    useEffect
} from "react";

type SortType = 'latest' | 'oldest' | '';
const ITEMS_PER_PAGE = 5;
export default function Context({ catabook,catalogue, pagination:initialPagination, onDelete, submit }: CataProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [mode, setMode] = useState<'add' | 'edit'>('add');
    const [form, setForm] = useState<CatalogueBook>({
        id:"",
        catalogueId:'',
        version:'',
        name_en: '',
        name_km: '',
        type_en:'',
        type_km:'',
        size_en:'',
        size_km:'',
        code:'',
        isbn:'',
        image: ''
    });

    const [search, setSearch] = useState('');
    const [pagination, setPagination] = useState(initialPagination);
    const [sort, setSort] = useState<SortType>('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [confirmDeleteUserId, setConfirmDeleteUserId] = useState<string | null>(null);
    const [localData, setLocalData] = useState<CatalogueBook[]>(catabook);
    const [filteredData, setFilteredData] = useState<CatalogueBook[]>(catabook);
 
    const handleOpenModal = (type: 'add' | 'edit', data?: CatalogueBook) => {
        setMode(type);
        setForm(data || {
            id:"",
            catalogueId:'',
            version:'',
            name_en: '',
            name_km: '',
            type_en:'',
            type_km:'',
            size_en:'',
            size_km:'',
            code:'',
            isbn:'',
            image: ''
        });
        dialogRef.current?.showModal();
    };

    const handleCloseModal = () => {
        dialogRef.current?.close();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

    // Upload Image

    const handleImageUpload = async (result: CloudinaryUploadWidgetResults) => {
        if(typeof result.info !== 'string'){
            const imageUrl = result.info?.secure_url;
            if(imageUrl){
                setForm((prev) => ({
                    ...prev,
                    image: imageUrl
                }));
                alertService.success('Image uploaded successfully!');
                dialogRef.current?.showModal();
            }
        }
    }

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
                item.name_en?.toLowerCase().includes(lowerSearch) ||
                item.name_km?.toLowerCase().includes(lowerSearch) ||
                item.name_en?.toUpperCase().includes(upperSearch) ||
                item.name_km?.toUpperCase().includes(upperSearch)
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
                const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
                const start = (page - 1) * ITEMS_PER_PAGE;
                const end = start + ITEMS_PER_PAGE;
                const paginated = data.slice(start, end);

                setFilteredData(paginated);
                setPagination({
                    currentPage: page,
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
                        className="grow text-black dark:text-white"
                        placeholder="Search Data..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
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

            <div className="hidden md:block">
                <table className="table w-full text-sm md:text-base">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th className="hidden sm:table-cell">Image</th>
                            <th className="hidden lg:table-cell">Catalogue Name</th>
                            <th className="hidden lg:table-cell">Version</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="text-center py-4">Loading...</td>
                            </tr>
                        ) : filteredData.length > 0 ? (
                            filteredData.map((item, index) => 
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td className="hidden sm:table-cell">
                                            <Image
                                                src={item.image ?? '/logo.svg'}
                                                alt={`Media ${index + 1}`}
                                                width={500}
                                                height={500}
                                                className="w-[60px] h-full object-cover"
                                            />
                                        </td>
                                        <td className="hidden lg:table-cell">{item.name_en}</td>
                                        <td className="hidden lg:table-cell capitalize">{item.version?.split('-').join(' ')}</td>
                                        <td className={`dropdown ${catabook.length > 10 ? 'dropdown-top dropdown-end' : 'dropdown-end'}`}>
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
                            )
                        ) : (
                            <tr>
                                <td colSpan={4} className="text-center py-4">No record found.</td>
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
                    filteredData.map((item) => (
                        <div key={item.id} className="bg-gray-900 p-4 rounded shadow text-white">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="avatar">
                                    <div className="mask mask-squircle h-12 w-12">
                                        <Image
                                            width={400}
                                            height={400}
                                            priority
                                            src={item.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name_en ?? '')}`}
                                            alt={item.name_en ?? ''}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold">{item.name_en}</div>
                                    <div className="text-sm opacity-50">{item.name_km}</div>
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
                    ))
                ) : (
                    <p>No record found.</p>
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

            <dialog ref={dialogRef} className="modal text-black dark:text-white">
                <div className="modal-box">
                    <form method="dialog">
                        <button onClick={handleCloseModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                    </form>
                    <h3 className="font-bold text-lg mb-4">
                        {mode === 'add' ? 'Add New Catalogue Book' : 'Edit Catalogue Book'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                          {/* Catalogue Select */}
                        <select 
                            name="catalogueId" 
                            value={form.catalogueId || ""} 
                            onChange={handleChange} 
                            className="w-full select"
                            required
                        >
                            <option value="" disabled>Select Departments</option>
                            {catalogue?.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name_en}
                            </option>
                            ))}
                        </select>

                        {/* Version Select */}
                        <select 
                            name="version" 
                            value={form.version || ""} 
                            onChange={handleChange} 
                            className="w-full select"
                            required
                        >
                            <option value="" disabled>Select Versions</option>
                            {Version?.map((item) => (
                            <option key={item.id} value={item.slug}>
                                {item.name_en}
                            </option>
                            ))}
                        </select>

                        {/* Input Fields */}
                        <div className="flex gap-2">
                            <input
                            name="name_en"
                            type="text"
                            required
                            value={form.name_en}
                            onChange={handleChange}
                            
                            placeholder="Name in English"
                            className="input input-bordered w-full"
                            disabled={loading}
                            />
                            <input
                            name="name_km"
                            type="text"
                            required
                            value={form.name_km}
                            onChange={handleChange}
                            
                            placeholder="Name Khmer"
                            className="input input-bordered w-full"
                            disabled={loading}
                            />
                        </div>
                        <div className="flex gap-2">
                            <input
                                name="type_en"
                                type="text"
                                required
                                value={form.type_en}
                                onChange={handleChange}
                                
                                placeholder="Type in English"
                                className={`input input-bordered w-full`}
                                disabled={loading}
                            />

                            <input
                                name="type_km"
                                type="text"
                                required
                                value={form.type_km}
                                onChange={handleChange}
                                
                                placeholder="Type in Khmer"
                                className={`input input-bordered w-full`}
                                disabled={loading}
                            />
                        </div>
                        <div className="flex gap-2">
                            <input
                                name="size_en"
                                type="text"
                                required
                                value={form.size_en}
                                onChange={handleChange}
                                
                                placeholder="Size in English"
                                className={`input input-bordered w-full`}
                                disabled={loading}
                            />

                            <input
                                name="size_km"
                                type="text"
                                required
                                value={form.size_km}
                                onChange={handleChange}
                                
                                placeholder="Size in Khmer"
                                className={`input input-bordered w-full`}
                                disabled={loading}
                            />
                        </div>
                        <div className="flex gap-2">
                            <input
                                name="code"
                                type="text"
                                required
                                value={form.code}
                                onChange={handleChange}
                                
                                placeholder="Code"
                                className={`input input-bordered w-full`}
                                disabled={loading}
                            />

                            <input
                                name="isbn"
                                type="text"
                                required
                                value={form.isbn}
                                onChange={handleChange}
                                
                                placeholder="ISBN in Khmer"
                                className={`input input-bordered w-full`}
                                disabled={loading}
                            />
                        </div>
                         {/* Upload Widget */}
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
          dialogRef.current?.close();
          setTimeout(() => {
            open();
          }, 100);
        }}
        className="btn btn-outline w-full"
      >
        {form.image ? "Change Profile Image" : "Upload Profile Image"}
      </button>
    )}
  </CldUploadWidget>

  {form.image && (
    <div className="text-center">
      <Image
        width={1920}
        height={1080}
        src={form.image}
        alt="Catalogue Preview"
        className="w-[200px] h-full mx-auto mt-2 object-contain"
      />
    </div>
  )}

  {/* Submit */}
  <button type="submit" className="btn btn-info w-full" disabled={loading}>
    {loading ? 'Saving...' : mode === 'add' ? 'Create Book' : 'Update Book'}
  </button>
                    </form>
                </div>
            </dialog>

            {/* Delete Confirmation Dialog */}
                {confirmDeleteUserId && (
                    <dialog open className="modal text-black dark:text-white">
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
