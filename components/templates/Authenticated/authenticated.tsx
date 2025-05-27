"use client";

import React, { JSX } from "react";

import FetchAuthState from "@/components/templates/FetchAuth/fetchAuth";

interface Props {
  children: JSX.Element;
}

function AuthenticatedOnlyFeature({ children }: Props): JSX.Element {
  return children;
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
