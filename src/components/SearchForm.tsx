"use client";

import { getGuruCard, getJiraCard, getJiraDescription } from "@/app/actions";
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
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const guruResults = await getGuruCard(searchQuery);
    const jiraResults = await getJiraCard(searchQuery);

    const formattedGuruResults = guruResults.map((r: any) => {
      return {
        content: r.highlightedBodyContent,
        url: `https://app.getguru.com/card/${r.slug}`,
        title: r.preferredPhrase,
      };
    });

    const getIdFromJiraResult = await Promise.all(
      jiraResults.sections[0].issues.map((r: any) => {
        return getJiraDescription(r.key);
      })
    );

    // const formattedJiraResults = jiraResults.sections[0].issues.map(
    //   (r: any) => {
    //     return {
    //       content: r.summary,
    //       url: `https://searchcowboy.atlassian.net/browse/${r.key}`,
    //       title: r.summaryText,
    //     };
    //   }
    // );

    const formattedJiraDescription = getIdFromJiraResult.map((r: any) => {
      return {
        content: r.fields.description,
        title: r.fields.summary,
        url: `https://searchcowboy.atlassian.net/browse/${r.key}`,
      };
    });

    console.log({ formattedJiraDescription });

    setSearchResults([...formattedGuruResults, ...formattedJiraDescription]);
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
              <Heading size="md">{r.title}</Heading>
            </CardHeader>
            <CardBody>
              <Text>{r.content}</Text>
            </CardBody>
            <CardFooter>
              <Link href={`${r.url}`}>Visit Link</Link>
            </CardFooter>
          </Card>
        ))}
      </Stack>
    </div>
  );
}
