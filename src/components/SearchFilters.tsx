import { ChangeEvent, useCallback } from "react";
import { Filter } from "../types";
import { categories, sources } from "../constants";
import { SelectFilter } from "./SelectFilter";

interface SearchFiltersProps {
  readonly filters: Filter;
  readonly onFilterChange: (filters: Filter) => void;
  readonly authors: string[];
}

const debounce = (fn: Function, ms = 500) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
export function SearchFilters({
  filters,
  onFilterChange,
  authors,
}: SearchFiltersProps) {
  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      onFilterChange({ ...filters, search: searchTerm });
    }, 500),
    [filters, onFilterChange]
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    e.target.value = searchTerm;
    debouncedSearch(searchTerm);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      <input
        type="text"
        placeholder="Search articles..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        defaultValue={filters.search}
        onChange={handleSearchChange}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SelectFilter
          value={filters.category}
          onChange={(value) => onFilterChange({ ...filters, category: value })}
          options={categories}
          placeholder="All Categories"
        />

        <SelectFilter
          value={filters.source}
          onChange={(value) => onFilterChange({ ...filters, source: value })}
          options={Object.values(sources)}
          placeholder="All Sources"
        />

        <input
          type="date"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
          value={filters.date || ""}
          onChange={(e) => onFilterChange({ ...filters, date: e.target.value })}
        />

        <SelectFilter
          value={filters.author}
          onChange={(value) => onFilterChange({ ...filters, author: value })}
          options={authors}
          placeholder="All Authors"
        />
      </div>
    </div>
  );
}
