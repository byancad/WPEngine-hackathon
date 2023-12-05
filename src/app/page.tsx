import SearchForm from "@/components/SearchForm";
import Image from "next/image";
import { getGuruCard } from "./actions";
// import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <div>Search Cowboy</div>
      <SearchForm />
    </main>
  );
}
