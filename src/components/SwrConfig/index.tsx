"use client";
import { ReactNode } from "react";

import { SWRConfig } from "swr";
import { PublicConfiguration } from "swr/_internal";

export type SwrConfigProps = {
  children: ReactNode;
  value: Pick<PublicConfiguration, "fetcher" | "fallbackData">;
};

function SwrConfig({ children, value }: SwrConfigProps): JSX.Element {
  return <SWRConfig value={value}>{children}</SWRConfig>;
}

export default SwrConfig;
