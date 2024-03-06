"use client";
import { ReactNode } from "react";

import { StytchProvider as ProviderActual } from "@stytch/nextjs";
import { createStytchUIClient } from "@stytch/nextjs/dist/index.ui";

const stytch = createStytchUIClient(
  process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN || "",
);

const StytchProvider = ({ children }: { children: ReactNode }) => {
  return <ProviderActual stytch={stytch}>{children}</ProviderActual>;
};

export default StytchProvider;
