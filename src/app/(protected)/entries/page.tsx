// import queryString from "query-string";

// import { GetTankasData } from "@/app/api/v1/get/tankas/route";
import EntryTankas from "@/components/EntryTankas";
// import SwrConfig from "@/components/SwrConfig";

// データ取得に時間がかかるため、プリフェッチしない（処理だけは残しておく）
// async function getTankas(): Promise<GetTankasData> {
//   const res = await fetch(
//     queryString.stringifyUrl({
//       url: `${process.env.NEXT_PUBLIC_URL}/api/v1/get/tankas`,
//       query: {
//         skip: 0,
//         take: 20,
//       },
//     }),
//     { cache: "no-store" },
//   );

//   return res.json();
// }

async function Page() {
  // const tankas = await getTankas();

  return (
    // <SwrConfig value={{ fallbackData: [tankas] }}>
    <EntryTankas isProtectedMode={true} />
    // </SwrConfig>
  );
}

export default Page;
