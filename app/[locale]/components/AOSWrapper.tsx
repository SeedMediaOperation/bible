"use client";

import { useEffect, ReactNode } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useAuth } from "@/hook/useAuth";
import AlertContainer from "@/app/[locale]/components/AlertContainer";

interface AOSWrapperProps {
  children: ReactNode;
}

export default function AOSWrapper({ children }: AOSWrapperProps) {
  useAuth();
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return <>
    <AlertContainer />
    {children}
  </>;
}
