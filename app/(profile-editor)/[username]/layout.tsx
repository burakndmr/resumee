import Loading from "@/app/loading";
import { Suspense } from "react";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<Loading />}>
      <main>{children}</main>
    </Suspense>
  );
}
