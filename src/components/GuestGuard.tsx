import { useGuest } from "../hooks/useGuest";
import Forbidden from "../error/Forbidden";

export default function GuestGuard({ children }: { children: React.ReactNode }) {
  const { isValid } = useGuest();
  if (!isValid) return <Forbidden />;
  return <>{children}</>;
}