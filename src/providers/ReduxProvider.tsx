import { store } from "@/redux/store";
import React, { FC, ReactNode } from "react";
import { Provider } from "react-redux";
interface Ichildren {
  children: ReactNode;
}
const ReduxProvider: FC<Ichildren> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
