"use client";

import { Button } from "@chakra-ui/react";
import { getGuruCard } from "@/app/actions";
import { useFormStatus } from "react-dom";

const SearchButton = () => {
  const { pending } = useFormStatus();

  return (
    <form action={getGuruCard}>
      <input type="text" name="field-name" />
      <button type="submit" aria-disabled={pending}>
        search
      </button>
    </form>
  );
};

export default SearchButton;
