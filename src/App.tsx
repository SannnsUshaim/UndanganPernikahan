import Sidebar from "./components/Sidebar";
import ScrollToTop from "./components/ScrollToTop";
import CoverPage from "./components/CoverPage";
import CoupleSection from "./components/CoupleSection";
import GalerySection from "./components/GalerySection";
import VenueSection from "./components/VenueSection";
import RsvpUcapanSection from "./components/RsvpUcapanSection";
import GiftSection from "./components/GiftSection";
import ClosingSection from "./components/ClosingSection";
import HomeSection from "./components/HomeSection";
import GuestGuard from "./components/GuestGuard";
import AdminPage from "./pages/AdminPage";
import Song from "./components/Song";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminPage />} />
      <Route
        path="/*"
        element={
          <GuestGuard>
            <div className="h-dvh lg:flex lg:h-screen selection:text-light selection:bg-primary">
              <div className="hidden lg:block lg:basis-8/15 lg:sticky lg:top-0 lg:h-screen">
                <CoverPage desktopMode />
              </div>
              <div className="h-dvh lg:basis-7/15 lg:overflow-y-auto lg:h-screen relative">
                <Song />
                <Sidebar />
                <ScrollToTop />
                <div className="h-dvh lg:hidden">
                  <CoverPage />
                </div>

                <HomeSection />
                <CoupleSection />
                <GalerySection />
                <VenueSection />
                <RsvpUcapanSection />
                <GiftSection />
                <ClosingSection />
              </div>
            </div>
          </GuestGuard>
        }
      />
    </Routes>
  );
}
