"use client";

import { JSX, useEffect, useState } from "react";

import useAuth from "@/source/hooks/useAuth";
import LoadingComponent from "@/components/atoms/Loading/loading";

interface Props {
  children: JSX.Element;
}

export default function FetchAuthState({ children }: Props) {
  const { waitForUserSync } = useAuth();
  const [mountComponent, setComponentMount] = useState(false);

  useEffect(() => {
    const waitAuthUserSync = async () => {
      await waitForUserSync();
      setComponentMount(true);
    };
    if (!mountComponent) {
      waitAuthUserSync();
    }
    return () => {
      setComponentMount(false);
    };
  }, []);

  if (!mountComponent) {
    return <LoadingComponent />;
  }

  return children;
}
