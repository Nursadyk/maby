"use client";
import ReduxProvider from "@/providers/ReduxProvider";
import React, { FC, ReactNode } from "react";
interface Ichildren {
  children: ReactNode;
}
const LayoutClient: FC<Ichildren> = ({ children }) => {
  return <ReduxProvider>{children}</ReduxProvider>;
};

export default LayoutClient;
