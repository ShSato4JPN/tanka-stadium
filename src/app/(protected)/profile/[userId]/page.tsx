import Profile from "@/components/Profile";

function Page({ params }: { params: { userId: string } }) {
  return <Profile userId={params.userId} />;
}

export default Page;
