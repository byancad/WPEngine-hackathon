"use client";

import { getGuruCard, submitSearch } from "@/app/actions";
import SearchButton from "./SearchButton";
import { useSearchParams } from "../../node_modules/next/navigation";
import { FormEvent } from "react";
import { useState } from "react";
import {
  Card,
  CardHeader,
  Container,
  CardBody,
  CardFooter,
  Text,
} from "@chakra-ui/react";

export default function SearchForm() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const results = await getGuruCard(searchQuery);
    setSearchResults(results);
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
        <Card h={"300px"} color="white">
          <Text>Yes</Text>
          {searchResults.map((r: any) => {
            return (
              <Text color="tomato" fontSize="50px">
                {r.content}
              </Text>
            );
          })}
        </Card>
      </form>
    </div>
  );
}
