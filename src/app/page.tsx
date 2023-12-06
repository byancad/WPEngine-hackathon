import SearchForm from "@/components/SearchForm";
import Image from "next/image";
import { getGuruCard } from "./actions";

import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Image
        width={150}
        height={48}
        src="/logo-inverted@2x.png"
        alt="wpengine"
      ></Image>

      <SearchForm />
    </main>
  );
}
