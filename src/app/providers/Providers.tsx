"use client";
import defaultQueryClient from "@/lib/queries/defaultQueryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <QueryClientProvider client={defaultQueryClient}>
        {children}
      </QueryClientProvider>
    </>
  );
};

export default Providers;
