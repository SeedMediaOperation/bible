export function formatSplit(slug: string): string {
    const parts = slug.split("-");
    const abbreviation = parts.pop()?.toUpperCase();
    const name = parts.map(
      word => word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ");
    return `${name} (${abbreviation})`;
  }

  export function formatOnlySplit(slug: string): string {
    const parts = slug.split("-");
    const name = parts.map(
      word => word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ");
    return `${name}`;
  }