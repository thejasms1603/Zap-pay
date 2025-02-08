import { useRecoilValue } from "recoil";
import { balanceAtom } from "../atoms/balance";

export const UseBalance = () => {
  const value = useRecoilValue(balanceAtom);
  return value ?? 0; // Fallback to 0 if value is undefined or null
};
