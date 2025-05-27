"use client";

import PublicOnlyFeature from "@/components/templates/Public/public";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PublicOnlyFeature>
      <section>{children}</section>
    </PublicOnlyFeature>
  );
}
