"use client";

import SearchBar from "@/components/searchBar";
import type { Release } from "@/types/release";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function Home() {
  const [searchString, setSearchString] = useState<string>("");

  const releases = useMutation({
    mutationFn: () => fetchReleases(),
    onSuccess(data) {
      console.log(data);
    },
  });

  const fetchReleases = async (): Promise<Release[]> => {
    console.log("hallo");
    const response = await fetch(
      "/api/releases?user=ghostbyte-dev&repo=pixelix"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    console.log("response ok");
    return response.json();
  };

  const search = () => {
    console.log("hallo");
    releases.mutate();
  };

  return (
    <div>
      <SearchBar
        onChange={(value) => setSearchString(value)}
        value={searchString}
        onSubmit={search}
      />
      {releases.data ? (
        <div>
          {releases.data.map((release: Release) => {
            return <div key={release.url}>{release.url}</div>;
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
