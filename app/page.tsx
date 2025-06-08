"use client";

import SearchBar from "@/components/searchBar";
import { useState } from "react";

export default function Home() {
  const [searchString, setSearchString] = useState<string>("");

  const search = () => {};

  return (
    <div>
      <SearchBar
        onChange={(value) => setSearchString(value)}
        value={searchString}
        onSubmit={search}
      />
    </div>
  );
}
