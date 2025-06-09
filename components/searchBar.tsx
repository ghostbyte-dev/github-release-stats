"use client"
import { useState } from "react";
import Input from "./input";
import type { Search } from "@/types/search";

interface SearchBarProps {
  onSubmit: (search: Search) => void;
}

const SearchBar = (props: SearchBarProps) => {
    const [user, setUser] = useState<string>("")
    const [repo, setRepo] = useState<string>("")

    return (
        <div className="flex flex-col">
            <Input value={user} onChange={setUser}/>
            <Input value={repo} onChange={setRepo}/>
            <button type="button" onClick={() => props.onSubmit({user, repo})}>Search</button>
        </div>
    )
}

export default SearchBar;