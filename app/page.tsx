
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/source/hooks/useAuth";

export default function Home() {
  const router = useRouter();
  const { userUid } = useAuth();

  useEffect(() => {
    if (userUid) {
      router.push("/home");
    } else {
      router.push("/login");
    }
  }, [userUid]);

  return null;
}
