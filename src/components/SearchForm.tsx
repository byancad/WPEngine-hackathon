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
  Flex,
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
      <Heading py={2}>Search Cowboy</Heading>

      <Center h="100px" color="white">
        <form onSubmit={handleSubmit}>
          <label>
            <input
              style={{
                color: "black",
                border: "grey solid 1px",
                backgroundColor: "white",
                padding: "20px",
                width: "32rem",
                height: "2.5rem",
                borderRadius: ".25rem",
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </label>
          <Button bgColor={"#1dc0c9"} m={2} type="submit">
            Search
          </Button>
        </form>
      </Center>
      <Stack m="6" spacing="3">
        {searchResults.map((r: any) => (
          <Card boxShadow="dark-lg">
            <CardHeader>
              <Heading size="md" textTransform="uppercase">
                {r.title}
              </Heading>
            </CardHeader>
            <CardBody>
              <Text pt="2" fontSize="md">
                {r.content}
              </Text>
            </CardBody>
            <CardFooter>
              <Link fontsize="sm" href={`${r.url}`}>
                {r.url}
              </Link>
            </CardFooter>
          </Card>
        ))}
      </Stack>
    </div>
  );
}
