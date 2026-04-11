// src/App.tsx
import CoverPage from "./components/CoverPage";
import InvitationContent from "./components/InvitationContent";

export default function App() {
  return (
    <main>
      <div className="lg:flex lg:h-screen">

        <div className="lg:w-[45%] lg:sticky lg:top-0 lg:h-screen">
          <CoverPage />
        </div>
        <div id="invitation-content" className="lg:w-[55%] lg:overflow-y-auto lg:h-screen">
          <InvitationContent />
        </div>

      </div>
    </main>
  );
}
