"use client";
import React, { useCallback, useMemo } from "react";
import InfiniteScroll, { Props } from "react-infinite-scroll-component";

import queryString from "query-string";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";

import { GetTankasData } from "@/app/api/v1/get/tanka/route";
import Loading from "@/components/Loading";
import TankaViewer from "@/components/TankaViewer";
import fetcher from "@lib/fetcher";

import styles from "./style.module.scss";

type EntryTankasProps = {
  isProtectedMode: boolean;
};

const getKey: SWRInfiniteKeyLoader<GetTankasData> = (
  pageIndex,
  previousPageData,
) => {
  return previousPageData && !previousPageData.tankas.length
    ? null
    : queryString.stringifyUrl({
        url: `${process.env.NEXT_PUBLIC_URL}/api/v1/get/tanka`,
        query: {
          skip: pageIndex * 20,
          take: 20,
        },
      });
};

function EntryTankas({ isProtectedMode }: EntryTankasProps): JSX.Element {
  const { data, size, setSize, isLoading } = useSWRInfinite<GetTankasData>(
    getKey,
    fetcher,
  );

  const items = useMemo(
    () =>
      data
        ?.map(({ tankas }) =>
          tankas.map((tanka) => (
            <div key={tanka.id} className={styles["tanka"]}>
              <TankaViewer tanka={tanka} isActiveLink={isProtectedMode} />
            </div>
          )),
        )
        .flat() || [],
    [data, isProtectedMode],
  );

  const next = useCallback<Props["next"]>(() => {
    console.log("next called");
    setSize(size + 1);
  }, [setSize, size]);

  const hasMore = useMemo<Props["hasMore"]>(
    () => items.length < (data?.at(0)?.count || 0),
    [data, items.length],
  );

  if (!data || isLoading) {
    return <Loading />;
  }

  return (
    <div className={styles["wrapper"]}>
      <InfiniteScroll
        dataLength={items.length}
        next={next}
        hasMore={hasMore}
        loader={<h1>読み込み中...</h1>}
        className={styles["container"]}
      >
        {items}
      </InfiniteScroll>
    </div>
  );
}

export default EntryTankas;
