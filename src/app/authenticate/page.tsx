import { Suspense } from "react";

import Authenticate from "@/components/Authenticate";
export default function Page() {
  return (
    // TODO　fallback は後で実装
    <Suspense>
      <Authenticate />
    </Suspense>
  );
}
