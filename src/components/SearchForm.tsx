"use client";

import { getGuruCard, submitSearch } from "@/app/actions";
import SearchButton from "./SearchButton";
import { useSearchParams } from "../../node_modules/next/navigation";
import { FormEvent } from "react";
import { useState } from "react";
import {
  Card,
  CardHeader,
  Center,
  Container,
  CardBody,
  Button,
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
      <Center h="100px" color="white">
        <form onSubmit={handleSubmit}>
          <label>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </label>
          <Button type="submit">Search</Button>
        </form>
      </Center>
      <Card>
        {searchResults.map((r: any) => {
          return (
            <Text color="tomato" fontSize="px">
              {r.highlightedBodyContent}
            </Text>
          );
        })}
      </Card>
    </div>
  );
}
