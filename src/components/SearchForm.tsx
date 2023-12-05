"use client";

import { getGuruCard, getJiraCard } from "@/app/actions";
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
  Stack,
  Heading,
  Link,
  Text,
} from "@chakra-ui/react";

export default function SearchForm() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const guruResults = await getGuruCard(searchQuery);
    const jiraResults = await getJiraCard(searchQuery);

    const formattedGuruResults = guruResults.map((r: any) => {
      return {
        content: r.highlightedBodyContent,
        slug: r.slug,
        title: r.preferredPhrase,
      };
    });
    console.log({ formattedGuruResults });
    const formattedJiraResults = jiraResults.sections[0].issues.map(
      (r: any) => {
        return { content: r.summary, slug: r.key, title: r.summaryText };
      }
    );
    console.log({ formattedJiraResults });

    setSearchResults(formattedJiraResults.concat(formattedGuruResults));
  };

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

      <Stack spacing="4">
        {searchResults.map((r: any) => (
          <Card>
            <CardHeader>
              <Heading size="md">{r.content}</Heading>
            </CardHeader>
            <CardBody>
              <Text>{r.title}</Text>
            </CardBody>
            <CardFooter>
              <Link href={`https://app.getguru.com/card/${r.slug}`}>
                Guru Link
              </Link>
            </CardFooter>
          </Card>
        ))}
      </Stack>
    </div>
  );
}
