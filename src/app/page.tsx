"use client";
import { useRouter } from "next/navigation";

import styles from "./page.module.scss";

function TankaStadium() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/public/entries");
  };

  return (
    <div className={styles["wrapper"]}>
      <main className={styles["container"]}>
        <div className={styles["top"]}>
          <div className={styles["top__header"]}>
            <h1 className={styles["title"]}>
              TANKA
              <br />
              STADIUM
            </h1>
          </div>
          <div className={styles["top__body"]}>
            <p className={styles["description"]}>
              TANKA STADIUM にエントリーするには GitHub のアカウントが必要です！
            </p>
            <button className={styles["sign-in"]} onClick={handleClick}>
              ENTRY
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TankaStadium;
