"use server";

import { revalidatePath } from "../../node_modules/next/cache";

export async function getGuruCard(query: string) {
  const apiKey = process.env.BASIC_AUTH;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization: `${apiKey}`,
    },
  };
  const res = await fetch(
    `https://api.getguru.com/api/v1/search/query?searchTerms=${query}&queryType=cards&showArchived=false&maxResults=2&includeCardAttributes=true`,
    options
  );
  const fact = await res.json();
  const parsedData = JSON.parse(JSON.stringify(fact));
  //   console.log(parsedData);
  return parsedData;
}

export async function submitSearch(prevState: any, formData: FormData) {
  const searchGuruCard = await getGuruCard("");
  revalidatePath("/");
  console.log(searchGuruCard);
}

export async function getJiraCard(query: string) {
  const jiraKey = process.env.JIRA_AUTH;

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${jiraKey}`,
    },
  };
  const res = await fetch(
    `https://searchcowboy.atlassian.net/rest/api/2/issue/picker?query=${query}`,
    options
  );
  const jiraResult = await res.json();
  console.log(jiraResult.sections[0].issues);
  return jiraResult;
}

export async function getJiraDescription(query: string) {
  const jiraKey = process.env.JIRA_AUTH;

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${jiraKey}`,
    },
  };
  const res = await fetch(
    `https://searchcowboy.atlassian.net/rest/api/2/issue/${query}`,
    options
  );
  const jiraDescription = await res.json();
  console.log(jiraDescription);
  return jiraDescription;
}
