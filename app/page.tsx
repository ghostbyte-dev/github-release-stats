"use client";

import Card from "@/components/card";
import SearchBar from "@/components/searchBar";
import type { Release } from "@/types/release";
import type { Search } from "@/types/search";
import { useMutation } from "@tanstack/react-query";

export default function Home() {
  const releases = useMutation({
    mutationFn: (search: Search) => fetchReleases(search),
    onSuccess(data) {
      console.log(data);
    },
  });

  const fetchReleases = async (search: Search): Promise<Release[]> => {
    const response = await fetch(
      `/api/releases?user=${search.user}&repo=${search.repo}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    console.log("response ok");
    return response.json();
  };

  const search = (search: Search) => {
    releases.mutate(search);
  };

  return (
    <div>
      <SearchBar
        onSubmit={search}
      />
      <button
        type="submit"
        className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
        <span className="sr-only">Search</span>
      </button>
      {releases.data ? (
        <div>
          {releases.data.map((release: Release) => {
            return <div key={release.url}>{release.name}</div>;
          })}
        </div>
      ) : (
        <></>
      )}

      {releases.data && (
        <div className="grid grid-cols-3 gap-4">
          <Card releases={releases.data} />
        </div>
      )}
    </div>
  );
}
