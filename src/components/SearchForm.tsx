"use client";

import { getGuruCard, submitSearch } from "@/app/actions";
import SearchButton from "./SearchButton";
import { useSearchParams } from "../../node_modules/next/navigation";
import { FormEvent } from "react";
import { useState } from "react";

export default function SearchForm() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const results = await getGuruCard(searchQuery);
    console.log(results);
  };
  console.log(searchQuery);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </label>
        <button type="submit">Search</button>
      </form>
      <div>
        {searchResults.map((r: any) => {
          return <div>{r.content}</div>;
        })}
      </div>
    </div>
  );
}
