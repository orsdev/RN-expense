import { useContext } from "react";
import { BalanceContext } from "./balance-context";

export function useBalanceContext() {
  const context = useContext(BalanceContext);

  if (!context) {
    throw new Error(
      "useBalanceContext must be used within an BalanceContextProvider"
    );
  }

  return context;
}