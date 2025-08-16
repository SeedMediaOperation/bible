"use client";

import { alertService } from "@/lib/alertServices";
import { ChapterProps, Chapters } from "@/types/book";
import React, { useRef, useState, useEffect } from "react";

const ITEMS_PER_PAGE = 5;

export default function Context({
  books,
  chapters,
  versions,
  pagination: initialPagination,
  onDelete,
  submit,
}: ChapterProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [form, setForm] = useState<Chapters>({
    id: "",
    nameEn: "",
    nameKm: "",
    titleEn: "",
    titleKm: "",
    paragraphEn: [],
    paragraphKm: [],
    bookId: "",
    versionId: versions?.[0]?.slug || "",
  });

  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState(initialPagination);
  const [selectedBookId, setSelectedBookId] = useState<string>("");
  const [selectedVersionId, setSelectedVersionId] = useState<string>(versions?.[0]?.slug || "");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [confirmDeleteUserId, setConfirmDeleteUserId] = useState<string | null>(null);
  const [localData, setLocalData] = useState<Chapters[]>(chapters);
  const [filteredData, setFilteredData] = useState<Chapters[]>(chapters);

  // Modal open
  const handleOpenModal = (type: "add" | "edit", data?: Chapters) => {
    setMode(type);

    // Filter books by selected version
    const modalBooks = selectedVersionId
      ? books.filter((b) => b.versionId === selectedVersionId)
      : books;

    setForm(
      data || {
        id: "",
        nameEn: "",
        nameKm: "",
        titleEn: "",
        titleKm: "",
        paragraphEn: [],
        paragraphKm: [],
        bookId: modalBooks[0]?.id || "",
        versionId: selectedVersionId || "",
      }
    );
    dialogRef.current?.showModal();
  };

  const handleCloseModal = () => dialogRef.current?.close();

  // Form change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!submit) return alertService.error("Submit function is not provided.");
    setLoading(true);
    try {
      const result = await submit(form);
      if (mode === "add") setLocalData((prev) => [...prev, result.result!]);
      else
        setLocalData((prev) =>
          prev.map((v) => (v.id === result.result!.id ? result.result! : v))
        );
      dialogRef.current?.close();
      alertService.success(result.msg!);
    } catch (error: unknown) {
      alertService.error(error instanceof Error ? error.message : "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Delete
  const handleDelete = async (id: string) => {
    if (!onDelete) return alertService.error("Delete function is not provided.");
    try {
      setLoading(true);
      const result = await onDelete(id);
      setLocalData((prev) => prev.filter((v) => v.id !== id));
      alertService.success(result.msg ?? "Successfully deleted.");
    } catch (error: unknown) {
      alertService.error(error instanceof Error ? error.message : "Something went wrong!");
    } finally {
      setLoading(false);
      setConfirmDeleteUserId(null);
    }
  };

  // Paragraph management
  const addParagraph = (field: "paragraphEn" | "paragraphKm") =>
    setForm((prev) => ({ ...prev, [field]: [...prev[field], ""] }));

  const removeParagraph = (field: "paragraphEn" | "paragraphKm", index: number) =>
    setForm((prev) => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));

  const handleParagraphChange = (field: "paragraphEn" | "paragraphKm", index: number, value: string) => {
    const updated = [...form[field]];
    updated[index] = value;
    setForm((prev) => ({ ...prev, [field]: updated }));
  };

  const moveParagraph = (field: "paragraphEn" | "paragraphKm", fromIndex: number, direction: "up" | "down") => {
    setForm((prev) => {
      const updated = [...prev[field]];
      const toIndex = direction === "up" ? fromIndex - 1 : fromIndex + 1;
      if (toIndex < 0 || toIndex >= updated.length) return prev;
      [updated[fromIndex], updated[toIndex]] = [updated[toIndex], updated[fromIndex]];
      return { ...prev, [field]: updated };
    });
  };

  // Pagination & filtering
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      let data = [...localData];

      if (selectedVersionId) {
        data = data.filter((chapter) => {
          const book = books.find((b) => b.id === chapter.bookId);
          return book?.versionId === selectedVersionId;
        });
      }

      if (selectedBookId) data = data.filter((chapter) => chapter.bookId === selectedBookId);

      if (search) {
        const lowerSearch = search.toLowerCase();
        data = data.filter(
          (v) => v.nameEn?.toLowerCase().includes(lowerSearch) || v.nameKm?.toLowerCase().includes(lowerSearch)
        );
      }

      data.sort((a, b) => {
        const aNum = parseInt(a.nameEn, 10);
        const bNum = parseInt(b.nameEn, 10);
        return (isNaN(aNum) ? 0 : aNum) - (isNaN(bNum) ? 0 : bNum);
      });

      const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE) || 1;
      const start = (page - 1) * ITEMS_PER_PAGE;
      setFilteredData(data.slice(start, start + ITEMS_PER_PAGE));
      setPagination({ currentPage: page, totalPages, hasNextPage: page < totalPages });
      setLoading(false);
    }, 200);
    return () => clearTimeout(timeout);
  }, [search, localData, page, selectedBookId, selectedVersionId, books]);

  const filteredBooks = selectedVersionId
    ? books.filter((b) => b.versionId === selectedVersionId)
    : books;

  const changePage = (newPage: number) => {
    if (newPage >= 1 && newPage <= (pagination?.totalPages || 1)) setPage(newPage);
  };

  return (
    <>
      {/* Filters & Add */}
      <div className="flex flex-row justify-between items-start md:items-center gap-4 mb-6">
        <input
          type="search"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered hidden lg:flex w-fit"
        />
        <div className="flex gap-2 items-center">
          <select
            value={selectedVersionId}
            onChange={(e) => { setSelectedVersionId(e.target.value); setSelectedBookId(""); setPage(1); }}
            className="select select-bordered w-[50%] lg:w-fit hidden md:block dark:text-[#fff] text-[#000]"
          >
            <option value="">All Versions</option>
            {versions?.map(v => <option key={v.slug} value={v.slug}>{v.titleEn} ({v.titleKm})</option>)}
          </select>

          <select
            value={selectedVersionId}
            onChange={(e) => { setSelectedVersionId(e.target.value); setSelectedBookId(""); setPage(1); }}
            className="select select-bordered w-[70%] md:w-fit md:hidden dark:text-[#fff] text-[#000]"
          >
            <option value="">All Versions</option>
            {versions?.map(v => <option key={v.slug} value={v.slug}>{v.titleKm}</option>)}
          </select>
          <select
            value={selectedBookId}
            onChange={(e) => { setSelectedBookId(e.target.value); setPage(1); }}
            className="select select-bordered w-[70%] md:w-fit dark:text-[#fff] text-[#000]"
          >
            <option value="">All Books</option>
            {filteredBooks.map(b => <option key={b.id} value={b.id}>{b.nameEn} ({b.nameKm})</option>)}
          </select>
          <button onClick={() => handleOpenModal("add")} className="btn btn-info">Add New</button>
        </div>
      </div>

      {/* Table */}
      <div className="hidden md:block">
        <table className="table w-full text-sm md:text-base">
          <thead>
            <tr>
              <th>#</th>
              <th className="hidden sm:table-cell text-white">Verse Number</th>
              <th className="hidden lg:table-cell text-white">Title</th>
              <th className="hidden lg:table-cell text-white">Books</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="text-center py-4">Loading...</td></tr>
            ) : filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={item.id}>
                  <td>{(page - 1) * ITEMS_PER_PAGE + index + 1}</td>
                  <td className="hidden sm:table-cell">{item.nameEn}</td>
                  <td className="hidden lg:table-cell">{item.titleEn}</td>
                  <td className="hidden lg:table-cell">{books.find((b) => b.id === item.bookId)?.nameEn || "Unknown"}</td>
                  <td className={`dropdown ${books.length > 10 ? "dropdown-top dropdown-end" : "dropdown-end"}`}>
                    <button tabIndex={0} role="button" className="btn btn-ghost btn-xs">Details</button>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                      <li><button onClick={() => handleOpenModal("edit", item)} className="w-full text-green-600">Edit</button></li>
                      <li><button onClick={() => setConfirmDeleteUserId(item.id ?? null)} className="w-full text-red-600">Delete</button></li>
                    </ul>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={5} className="text-center py-4">No record found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {loading ? <p>Loading...</p> :
          filteredData.length > 0 ? filteredData.map((item) => (
            <div key={item.id} className="bg-gray-900 p-0 lg:p-4 rounded shadow text-white">
              <div className="flex items-center gap-3 mb-2">
                <div>
                  <div className="font-bold">{item.nameEn}</div>
                  <div className="text-sm opacity-50">{item.titleEn}</div>
                </div>
              </div>
              <div className="text-right mt-2 dropdown dropdown-start dropdown-top">
                <button tabIndex={0} role="button" className="btn btn-xs btn-outline btn-info">Details</button>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                  <li><button onClick={() => handleOpenModal("edit", item)} className="w-full text-green-600">Edit</button></li>
                  <li><button onClick={() => setConfirmDeleteUserId(item.id ?? null)} className="w-full text-red-600">Delete</button></li>
                </ul>
              </div>
            </div>
          )) : <p>No record found.</p>}
      </div>

      {/* Pagination */}
      <div className="join w-full inline-flex justify-end mt-4">
        <button className="join-item btn text-white" disabled={page === 1} onClick={() => changePage(page - 1)}>Prev</button>
        {(() => {
          const totalPages = pagination?.totalPages || 1;
          const pages: (number | string)[] = [];
          pages.push(1);
          if (page > 4) pages.push("...");
          for (let i = page - 1; i <= page + 1; i++) if (i > 1 && i < totalPages) pages.push(i);
          if (totalPages > 1) pages.push(totalPages);

          return pages.map((p, index) =>
            typeof p === "number" ? (
              <button key={index} className={`join-item btn ${p === page ? "btn-active" : ""}`} onClick={() => changePage(p)}>{p}</button>
            ) : (
              <span key={index} className="join-item btn btn-disabled">{p}</span>
            )
          );
        })()}
        <button className="join-item btn text-white" disabled={!pagination?.hasNextPage} onClick={() => changePage(page + 1)}>Next</button>
      </div>

      {/* Modal */}
      <dialog ref={dialogRef} className="modal text-black dark:text-white">
        <div className="modal-box py-10 md:my-0">
          <form method="dialog">
            <button onClick={handleCloseModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-10 sm:top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg mb-4">{mode === "add" ? "Add New Verse Number" : `Edit Verse Number: ${form.nameEn}`}</h3>
          <form onSubmit={handleSubmit} className="space-y-4 ">
            <select name="bookId" value={form.bookId} onChange={handleChange} className="w-full select">
              <option value="" disabled>Select Book</option>
              {filteredBooks.map((b) => <option key={b.id} value={b.id}>{b.nameEn}</option>)}
            </select>
            <input name="nameEn" type="text" value={form.nameEn} onChange={handleChange} placeholder="Verse Number English" className="input input-bordered w-full" disabled={loading}/>
            <input name="nameKm" type="text" value={form.nameKm} onChange={handleChange} placeholder="Verse Number Khmer" className="input input-bordered w-full font-krasar" disabled={loading}/>
            <textarea name="titleEn" value={form.titleEn} onChange={handleChange} placeholder="Title English" className="textarea textarea-bordered w-full" disabled={loading}/>
            <textarea name="titleKm" value={form.titleKm} onChange={handleChange} placeholder="Title Khmer" className="textarea textarea-bordered w-full" disabled={loading}/>

            {["paragraphEn", "paragraphKm"].map((field) => (
              <div key={field} className="mt-4">
                <label className="block font-semibold mb-2">{field === "paragraphEn" ? "Verses (English)" : "Verses (Khmer)"}</label>
                {(form[field as "paragraphEn" | "paragraphKm"] as string[]).map((text, index) => (
                  <div key={index} className="flex gap-2 mb-2 items-start">
                    <textarea value={text} rows={4} onChange={(e) => handleParagraphChange(field as "paragraphEn" | "paragraphKm", index, e.target.value)} className="textarea textarea-bordered w-full" disabled={loading} placeholder={`${field === "paragraphEn" ? "Verse" : "បទ"} ${index + 1}`} />
                    <div className="flex flex-col gap-1">
                      <button type="button" className="btn btn-sm" disabled={index === 0} onClick={() => moveParagraph(field as "paragraphEn" | "paragraphKm", index, "up")}>↑</button>
                      <button type="button" className="btn btn-sm" disabled={index === (form[field as "paragraphEn" | "paragraphKm"] as string[]).length - 1} onClick={() => moveParagraph(field as "paragraphEn" | "paragraphKm", index, "down")}>↓</button>
                      <button type="button" className="btn btn-error btn-sm" onClick={() => removeParagraph(field as "paragraphEn" | "paragraphKm", index)}>✕</button>
                    </div>
                  </div>
                ))}
                <button type="button" className="btn btn-outline btn-sm mt-1" onClick={() => addParagraph(field as "paragraphEn" | "paragraphKm")}>+ Add Verse</button>
              </div>
            ))}

            <button type="submit" className="btn btn-info w-full mb-20 md:mb-0" disabled={loading}>
              {loading ? "Saving..." : mode === "add" ? "Create Book" : "Update Book"}
            </button>
          </form>
        </div>
      </dialog>

      {/* Delete Confirmation */}
      {confirmDeleteUserId && (
        <dialog open className="modal text-black dark:text-white">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Deletion</h3>
            <p className="py-4">Are you sure you want to delete this record?</p>
            <div className="modal-action">
              <form method="dialog" className="space-x-2">
                <button className="btn btn-error" onClick={() => handleDelete(confirmDeleteUserId)} disabled={loading}>
                  {loading ? "Deleting..." : "Yes, Delete"}
                </button>
                <button type="button" className="btn" onClick={() => setConfirmDeleteUserId(null)}>Cancel</button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}
