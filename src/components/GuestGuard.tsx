import { useGuest } from "../hooks/useGuest";
import ForbiddenPage from "../pages/error/Forbidden";
import { useEffect, useState } from "react";

function LoadingScreen() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    // Animasi dots sequential
    let dotCount = 0;
    const dotTimer = setInterval(() => {
      dotCount = (dotCount + 1) % 4;
      setDots(".".repeat(dotCount));
    }, 400);

    return () => {
      clearInterval(dotTimer);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-light gap-6">
      <img
        src="/EF_Icon.svg"
        alt="EF Icon"
        className="w-16 h-16 lg:w-20 lg:h-20"
      />
      <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border-4 border-zinc-200 border-t-dark animate-spin" />
      <div className="text-center">
        <p className="text-dark text-base tracking-widest transition-all duration-500">
          Loading
          <span className="inline-block w-6 text-left text-dark">
            {dots}
          </span>
        </p>
      </div>
    </div>
  );
}

export default function GuestGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isValid, loading } = useGuest();

  if (loading) return <LoadingScreen />;
  if (!isValid) return <ForbiddenPage />;
  return <>{children}</>;
}
