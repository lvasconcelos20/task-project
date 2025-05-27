"use client";

import React, { JSX, useEffect } from "react";

import { useRouter } from "next/navigation";

import LoadingComponent from "@/components/atoms/Loading/loading";
import useAuth from "@/source/hooks/useAuth";
import FetchAuthState from "@/components/templates/FetchAuth/fetchAuth";

interface Props {
  children: JSX.Element;
}

function PublicOnlyFeature({ children }: Props): JSX.Element {
  const { userUid } = useAuth();
  console.log(userUid)
  const router = useRouter();

  useEffect(() => {
    if (userUid !== "") {
      router.replace(`/home`);
    }
  }, [userUid, router]);

  if (userUid === "") {
    return children;
  }
  return <LoadingComponent />;
}

export default function PublicOnlyFeatureWrapper({
  children
}: Props): JSX.Element {
  return (
    <FetchAuthState>
      <PublicOnlyFeature>{children}</PublicOnlyFeature>
    </FetchAuthState>
  );
}
