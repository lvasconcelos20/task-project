"use client";

import React, { JSX, useEffect } from "react";

import FetchAuthState from "@/components/templates/FetchAuth/fetchAuth";
import useAuth from "@/source/hooks/useAuth";
import { useRouter } from "next/navigation";
import LoadingComponent from "@/components/atoms/Loading/loading";

interface Props {
  children: JSX.Element;
}

function AuthenticatedOnlyFeature({ children }: Props): JSX.Element {
  const { userUid} = useAuth()
  console.log("id do user:", userUid)
  const router = useRouter()

  useEffect(() => {
    if(!userUid) {
      router.replace("/login")
    }
  }, [userUid])
  if (!userUid || userUid === "") {
  return <LoadingComponent />;
}

  return children

}

export default function AuthenticatedOnlyFeatureWrapper({
  children
}: Props): JSX.Element {
  return (
    <FetchAuthState>
      <AuthenticatedOnlyFeature>{children}</AuthenticatedOnlyFeature>
    </FetchAuthState>
  );
}
