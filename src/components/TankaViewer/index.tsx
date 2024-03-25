"use client";
import localFont from "next/font/local";
import Link from "next/link";

import { CustomTanka } from "@/types";

import styles from "./style.module.scss";

const myFont = localFont({
  src: "../../app/YujiSyuku-Regular.ttf",
  display: "swap",
});

type TankaViewerProps = {
  tanka: CustomTanka;
  isActiveLink: boolean;
};

function TankaViewer({ tanka, isActiveLink }: TankaViewerProps) {
  return (
    <div className={`${styles["tanka"]}`}>
      <div className={styles["theme"]}>
        <p>{tanka.theme}</p>
      </div>
      <div className={`${styles["ku"]}`}>
        <p className={myFont.className}>{tanka.ku1}</p>
        <p className={myFont.className}>{tanka.ku2}</p>
        <p className={myFont.className}>{tanka.ku3}</p>
        <p className={myFont.className}>{tanka.ku4}</p>
        <p className={myFont.className}>{tanka.ku5}</p>
      </div>
      {isActiveLink ? (
        <div className={styles["userName"]}>
          作者：
          <Link href={`${process.env.NEXT_PUBLIC_URL}/profile/${tanka.userId}`}>
            <span className={styles["userName__link"]}>{tanka.user?.name}</span>
          </Link>
        </div>
      ) : (
        <div className={styles["userName"]}>作者：{tanka.user?.name}</div>
      )}
    </div>
  );
}

export default TankaViewer;
