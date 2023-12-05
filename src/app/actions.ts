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
    `https://api.getguru.com/api/v1/search/query?searchTerms=${query}&queryType=cards&showArchived=false&maxResults=1&includeCardAttributes=true`,
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
