"use client";

import { alertService } from "@/lib/alertServices";
import { ChapterProps, Chapters } from "@/types/book";
import React, { useRef, useState, useEffect } from "react";
type SortType = "latest" | "oldest" | "";
const ITEMS_PER_PAGE = 5;
export default function Context({
  books,
  chapters,
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
  });

  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState(initialPagination);
  const [sort, setSort] = useState<SortType>("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [confirmDeleteUserId, setConfirmDeleteUserId] = useState<string | null>(
    null
  );
  const [localData, setLocalData] = useState<Chapters[]>(chapters);
  const [filteredData, setFilteredData] = useState<Chapters[]>(chapters);

  const handleOpenModal = (type: "add" | "edit", data?: Chapters) => {
    setMode(type);
    setForm(
      data || {
        nameEn: "",
        nameKm: "",
        titleEn: "",
        titleKm: "",
        paragraphEn: [],
        paragraphKm: [],
        bookId: "",
      }
    );
    dialogRef.current?.showModal();
  };

  const handleCloseModal = () => {
    dialogRef.current?.close();
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!submit) {
      alertService.error("Submit function is not provided.");
      return;
    }

    setLoading(true);

    try {
      const result = await submit(form);
      if (mode === "add") {
        // Simulate ID if not returned
        setLocalData((prev) => [...prev, result.result!]);
      } else {
        setLocalData((prev) =>
          prev.map((v) => (v.id === result.result!.id ? result.result! : v))
        );
      }
      dialogRef.current?.close();
      alertService.success(result.msg!);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alertService.error(error.message);
      } else {
        alertService.error("Something went wrong!");
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!onDelete) {
      alertService.error("Submit function is not provided.");
      return;
    }
    try {
      setLoading(true);
      const result = await onDelete(id);
      setLocalData((prev) => prev.filter((v) => v.id !== id));
      alertService.success(result.msg ?? "Successfully deleted.");
    } catch (error: unknown) {
      if (error instanceof Error) {
        alertService.error(error.message);
      } else {
        alertService.error("Something went wrong!");
      }
      console.log(error);
    } finally {
      setLoading(false);
      setConfirmDeleteUserId(null); // Close confirmation dialog after action
    }
  };

  // Pragraphs
  const addParagraph = (field: "paragraphEn" | "paragraphKm") => {
    setForm((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeParagraph = (
    field: "paragraphEn" | "paragraphKm",
    index: number
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleParagraphChange = (
    field: "paragraphEn" | "paragraphKm",
    index: number,
    value: string
  ) => {
    const updated = [...form[field]];
    updated[index] = value;
    setForm((prev) => ({
      ...prev,
      [field]: updated,
    }));
  };

  const onPageChange = (newPage: number) => {
    if (
      newPage !== page &&
      newPage >= 1 &&
      newPage <= (pagination?.totalPages || 1)
    ) {
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
        data = data.filter(
          (item) =>
            item.nameEn?.toLowerCase().includes(lowerSearch) ||
            item.nameKm?.toLowerCase().includes(lowerSearch) ||
            item.nameEn?.toUpperCase().includes(upperSearch) ||
            item.nameKm?.toUpperCase().includes(upperSearch)
        );
      }

      // Sort
      if (sort === "latest") {
        data.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
      } else if (sort === "oldest") {
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
    }, 300); // optional debounce

    return () => clearTimeout(timeout);
  }, [search, localData, page, sort]);

  const moveParagraph = (
    field: "paragraphEn" | "paragraphKm",
    fromIndex: number,
    direction: "up" | "down"
  ) => {
    setForm((prev) => {
      const updated = [...prev[field]];
      const toIndex = direction === "up" ? fromIndex - 1 : fromIndex + 1;

      // prevent invalid index
      if (toIndex < 0 || toIndex >= updated.length) return prev;

      // swap items
      [updated[fromIndex], updated[toIndex]] = [
        updated[toIndex],
        updated[fromIndex],
      ];

      return { ...prev, [field]: updated };
    });
  };

  return (
    <>
      <div className="flex flex-row justify-between items-start md:items-center gap-4 mb-6">
        <label className="input input-bordered flex items-center gap-2 w-fit md:w-auto">
          <input
            type="search"
            className="grow text-black dark:text-white"
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <div className="flex items-center gap-2">
          <select
            className="select select-bordered text-black dark:text-white w-fit"
            value={sort}
            onChange={(e) => {
              setPage(1);
              setSort(e.target.value as SortType);
            }}
          >
            <option value="" disabled>
              Sort
            </option>
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
          <button
            onClick={() => handleOpenModal("add")}
            className="btn btn-info"
          >
            Add New
          </button>
        </div>
      </div>

      <div className="hidden md:block">
        <table className="table w-full text-sm md:text-base">
          <thead>
            <tr>
              <th>#</th>
              <th className="hidden sm:table-cell text-white">Verse Number</th>
              <th className="hidden lg:table-cell text-white">Title</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
  {loading ? (
    <tr>
      <td colSpan={4} className="text-center py-4">Loading...</td>
    </tr>
  ) : filteredData.length > 0 ? (
    // Sort filteredData by nameEn ascending before mapping
    filteredData
      .slice() // clone array to avoid mutating original state
      .sort((a, b) => Number(a.nameEn) - Number(b.nameEn))
      .map((item, index) => (
        <tr key={item.id}>
          <td>{index + 1}</td>
          <td className="hidden sm:table-cell">{item.nameEn}</td>
          <td className="hidden lg:table-cell">{item.titleEn}</td>
          <td
            className={`dropdown ${
              books.length > 10 ? "dropdown-top dropdown-end" : "dropdown-end"
            }`}
          >
            <button tabIndex={0} role="button" className="btn btn-ghost btn-xs">
              Details
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li className="w-full">
                <button
                  onClick={() => handleOpenModal("edit", item)}
                  className="w-full inline-flex text-green-600"
                >
                  Edit
                </button>
              </li>
              <li className="w-full">
                <button
                  onClick={() => setConfirmDeleteUserId(item.id ?? "")}
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
      <td colSpan={4} className="text-center py-4">
        No Verse Number found.
      </td>
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
          filteredData
          .slice() 
          .sort((a, b) => Number(a.nameEn) - Number(b.nameEn))
          .map((item) => (
            <div
              key={item.id}
              className="bg-gray-900 p-4 rounded shadow text-white"
            >
              <div className="flex items-center gap-3 mb-2">
                <div>
                  <div className="font-bold">{item.nameEn}</div>
                  <div className="text-sm opacity-50">{item.titleEn}</div>
                </div>
              </div>
              <div className="text-right mt-2 dropdown dropdown-start dropdown-top">
                <button
                  tabIndex={0}
                  role="button"
                  className="btn btn-xs btn-outline btn-info"
                >
                  Details
                </button>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                >
                  <li className="w-full">
                    <button
                      onClick={() => handleOpenModal("edit", item)}
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
        <button
          className="join-item btn text-white"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          Prev
        </button>

        {(() => {
          const totalPages = pagination?.totalPages || 1;
          const pages: (number | string)[] = [];

          // Always show first page
          pages.push(1);

          if (page > 4) {
            pages.push("...");
          }

          // Pages around current
          for (let i = page - 1; i <= page + 1; i++) {
            if (i > 1 && i < totalPages) {
              pages.push(i);
            }
          }

          // Always show last page if it's not already included
          if (totalPages > 1) {
            pages.push(totalPages);
          }

          return pages.map((p, index) =>
            typeof p === "number" ? (
              <button
                key={index}
                className={`join-item btn ${p === page ? "btn-active" : ""}`}
                onClick={() => onPageChange(p)}
              >
                {p}
              </button>
            ) : (
              <span key={index} className="join-item btn btn-disabled">
                {p}
              </span>
            )
          );
        })()}

        <button
          className="join-item btn text-white"
          disabled={!pagination?.hasNextPage}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </button>
      </div>

      {/* Modal */}
      <dialog ref={dialogRef} className="modal text-black dark:text-white">
        <div className="modal-box">
          <form method="dialog">
            <button
              onClick={handleCloseModal}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-4">
            {mode === "add"
              ? "Add New Verse Number"
              : `Edit Verse Number: ${form.nameEn}`}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <select
              name="bookId"
              value={form.bookId}
              onChange={handleChange}
              className="w-full select"
            >
              <option value="" disabled>
                Select Version
              </option>
              {books &&
                books.map((items) => (
                  <option key={items.id} value={items.id}>
                    {items.nameEn}
                  </option>
                ))}
            </select>
            <input
              name="nameEn"
              type="text"
              
              value={form.nameEn}
              onChange={handleChange}
              placeholder="Verse Number English"
              className={`input input-bordered w-full`}
              disabled={loading}
            />

            <input
              name="nameKm"
              type="text"
              
              value={form.nameKm}
              onChange={handleChange}
              placeholder="Verse Number Khmer"
              className={`input input-bordered w-full font-krasar`}
              disabled={loading}
            />

            <textarea
              name="titleEn"
              
              value={form.titleEn}
              onChange={handleChange}
              placeholder="Title English"
              className="textarea textarea-bordered w-full"
              disabled={loading}
            />

            <textarea
              name="titleKm"
              
              value={form.titleKm}
              onChange={handleChange}
              placeholder="Title Khmer"
              className="textarea textarea-bordered w-full"
              disabled={loading}
            />

            {/* Paragraph English */}
            <div>
              <label className="block font-semibold mb-2">
                Verses (English)
              </label>
              {form.paragraphEn.map((text, index) => (
                <div key={index} className="flex gap-2 mb-2 items-start">
                  <textarea
                    value={text}
                    rows={4}
                    onChange={(e) =>
                      handleParagraphChange(
                        "paragraphEn",
                        index,
                        e.target.value
                      )
                    }
                    className="textarea textarea-bordered w-full"
                    disabled={loading}
                    placeholder={`Verse ${index + 1}`}
                  />
                  <div className="flex flex-col gap-1">
                    <button
                      type="button"
                      className="btn btn-sm"
                      disabled={index === 0}
                      onClick={() => moveParagraph("paragraphEn", index, "up")}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm"
                      disabled={index === form.paragraphEn.length - 1}
                      onClick={() =>
                        moveParagraph("paragraphEn", index, "down")
                      }
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      className="btn btn-error btn-sm"
                      onClick={() => removeParagraph("paragraphEn", index)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-outline btn-sm mt-1"
                onClick={() => addParagraph("paragraphEn")}
              >
                + Add Verse
              </button>
            </div>

            {/* Paragraph Khmer */}
            <div className="mt-4">
              <label className="block font-semibold mb-2">Verses (Khmer)</label>
              {form.paragraphKm.map((text, index) => (
                <div key={index} className="flex gap-2 mb-2 items-start">
                  <textarea
                    value={text}
                    rows={4}
                    onChange={(e) =>
                      handleParagraphChange(
                        "paragraphKm",
                        index,
                        e.target.value
                      )
                    }
                    className="textarea textarea-bordered w-full"
                    disabled={loading}
                    placeholder={`បទ ${index + 1}`}
                  />
                  <div className="flex flex-col gap-1">
                    <button
                      type="button"
                      className="btn btn-sm"
                      disabled={index === 0}
                      onClick={() => moveParagraph("paragraphKm", index, "up")}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm"
                      disabled={index === form.paragraphKm.length - 1}
                      onClick={() =>
                        moveParagraph("paragraphKm", index, "down")
                      }
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      className="btn btn-error btn-sm"
                      onClick={() => removeParagraph("paragraphKm", index)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-outline btn-sm mt-1"
                onClick={() => addParagraph("paragraphKm")}
              >
                + Add Verse
              </button>
            </div>

            <button
              type="submit"
              className="btn btn-info w-full"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : mode === "add"
                ? "Create Book"
                : "Update Book"}
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
                  {loading ? "Deleting..." : "Yes, Delete"}
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
