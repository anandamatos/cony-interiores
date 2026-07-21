import { useContext } from "react";
import { CostureiraContext } from "./CostureiraContextInstance";

export function useCostureiras() {
  return useContext(CostureiraContext);
}
