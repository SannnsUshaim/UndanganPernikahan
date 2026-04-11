import Sidebar from "./components/Sidebar";
import ScrollToTop from "./components/ScrollToTop";
import CoverPage from "./components/CoverPage";
import CoupleSection from "./components/CoupleSection";
import GalerySection from "./components/GalerySection";
import VenueSection from "./components/VenueSection";
import StorySection from "./components/StorySection";
import RsvpUcapanSection from "./components/RsvpUcapanSection";
import GiftSection from "./components/GiftSection";
import ClosingSection from "./components/ClosingSection";
import HomeSection from "./components/HomeSection";

export default function App() {
  return (
    <div className="h-dvh lg:flex lg:h-screen">
      {/* Kiri — cover carousel (desktop only) */}
      <div className="hidden lg:block lg:basis-8/15 lg:sticky lg:top-0 lg:h-screen">
        <CoverPage desktopMode />
      </div>
      {/* Kanan — semua konten */}
      <div className="lg:basis-7/15 lg:overflow-y-auto lg:h-screen relative">
        <Sidebar />
        <ScrollToTop/>

        {/* Mobile cover */}
        <div className="h-dvh lg:hidden">
          <CoverPage />
        </div>

        <HomeSection />
        <CoupleSection />
        <GalerySection />
        <VenueSection />
        <StorySection />
        <RsvpUcapanSection />
        <GiftSection />
        <ClosingSection />
      </div>
    </div>
  );
}
