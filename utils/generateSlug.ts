// utils/generateSlug.ts

/**
 * Converts a string into a URL-friendly slug
 * e.g. "Hello World!" -> "hello-world"
 */
export function generateSlug(text: string): string {
    return text
      .toString()
      .normalize("NFKD")                      // Handle diacritics
      .replace(/[\u0300-\u036F]/g, "")        // Remove accents
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")           // Remove special chars
      .replace(/\s+/g, "-")                   // Replace spaces with dashes
      .replace(/-+/g, "-");                   // Collapse multiple dashes
  }
