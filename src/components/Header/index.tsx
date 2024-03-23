"use client";
import { useMemo } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import useMenu from "@/hooks/useMenu";

import styles from "./style.module.scss";

function Header() {
  const pathname = usePathname();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const menuItems = useMenu();

  // 現在のパスに応じてスタイルを変更する
  const currentStyle = useMemo(
    () => ({
      style: {
        backgroundColor: "#42bd42",
        color: "#fff",
      },
    }),
    [],
  );

  const links = useMemo(
    () =>
      menuItems.map((item) => (
        <Link key={item.path} href={item.path}>
          <div
            className={styles["link"]}
            {...(item.path === pathname ? currentStyle : {})}
          >
            {item.name}
          </div>
        </Link>
      )),
    [currentStyle, menuItems, pathname],
  );

  return (
    <header className={styles["menu"]}>
      <div className={styles["menu__title"]}>TANKA STADIUM</div>
      <nav className={styles["menu__nav"]}>{links}</nav>
    </header>
  );
}

export default Header;
