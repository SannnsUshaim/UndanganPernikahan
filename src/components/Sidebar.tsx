import { useState, useEffect } from "react";

const navItems = [
  { id: "home", label: "Home" },
  { id: "mempelai", label: "Bride & Groom" },
  { id: "galeri", label: "Galery" },
  { id: "venue", label: "Venue" },
  { id: "cerita", label: "Our Story" },
  { id: "rsvp", label: "RSVP" },
  { id: "gift", label: "Wedding Gift" },
  { id: "penutup", label: "Thank You" },
];

export default function Sidebar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const container = document.querySelector(".lg\\:overflow-y-auto") ?? window;
    const handleScroll = () => {
      for (const item of [...navItems].reverse()) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= 120) { setActive(item.id); break; }
        }
      }
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-5 right-5 z-50 w-10 h-10 bg-white/80 backdrop-blur-sm border border-stone-200 rounded-full flex flex-col items-center justify-center gap-1.5 shadow-sm cursor-pointer"
      >
        <span className={`block w-4 h-px bg-stone-600 transition-all duration-300 ${open ? "rotate-45 translate-y-1.5" : ""}`} />
        <span className={`block w-4 h-px bg-stone-600 transition-all duration-300 ${open ? "opacity-0" : ""}`} />
        <span className={`block w-4 h-px bg-stone-600 transition-all duration-300 ${open ? "-rotate-45 -translate-y-1.5" : ""}`} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 z-50 h-full w-64 bg-light border-l border-stone-100 transition-transform duration-400 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-8 pt-20">
          <p className="text-sm lg:text-base font-semibold text-dark/70 uppercase tracking-[0.4em] mb-6">
            Me&u
          </p>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-left px-3 py-2.5 rounded-lg text-xs lg:text-sm transition-all tracking-wide cursor-pointer ${
                  active === item.id
                    ? "bg-secondary text-dark text-shadow-dark font-medium"
                    : "text-dark hover:text-stone-800 hover:bg-secondary/20"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}