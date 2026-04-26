import { useSearchParams } from "react-router-dom";

export const useGuest = () => {
  const [searchParams] = useSearchParams();
  const nama = searchParams.get("to");
  return { nama, isValid: !!nama?.trim() };
};