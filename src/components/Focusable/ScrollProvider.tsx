import React from "react";
import { FocusableComponentLayout } from "@noriginmedia/norigin-spatial-navigation";

export const ScrollContext = React.createContext<{
  scroll: (props: FocusableComponentLayout) => void;
} | null>(null);

export const useScroll = () => {
  const context = React.useContext(ScrollContext);
  if (!context) {
    return {
      scroll: () => {},
    };
  }
  return context;
};
