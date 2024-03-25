import queryString from "query-string";

import { GetTankasData } from "@/app/api/v1/get/tanka/route";
import EntryTankas from "@/components/EntryTankas";
import SwrConfig from "@/components/SwrConfig";

async function getTankas(): Promise<GetTankasData> {
  const res = await fetch(
    queryString.stringifyUrl({
      url: `${process.env.NEXT_PUBLIC_URL}/api/v1/get/tanka`,
      query: {
        skip: 0,
        take: 20,
      },
    }),
    { cache: "no-store" },
  );

  return res.json();
}

async function Page() {
  const tankas = await getTankas();

  return (
    <SwrConfig value={{ fallbackData: [tankas] }}>
      <EntryTankas isProtectedMode={false} />
    </SwrConfig>
  );
}

export default Page;
