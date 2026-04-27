import { useState, useEffect } from "react";

const navItems = [
  { id: "home", label: "Home" },
  { id: "mempelai", label: "Bride & Groom" },
  { id: "galeri", label: "Galery" },
  { id: "venue", label: "Venue" },
  { id: "rsvp", label: "RSVP" },
  { id: "gift", label: "Wedding Gift" },
  { id: "penutup", label: "Thank You" },
];

export default function Sidebar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const detectActive = () => {
      // cek semua section, ambil yang paling dekat dengan top
      for (const item of [...navItems].reverse()) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= 150) {
            setActive(item.id);
            break;
          }
        }
      }
    };

    // desktop — scroll di dalam container
    const container = document.querySelector(".lg\\:overflow-y-auto");

    // mobile — scroll di window
    window.addEventListener("scroll", detectActive);
    container?.addEventListener("scroll", detectActive);

    return () => {
      window.removeEventListener("scroll", detectActive);
      container?.removeEventListener("scroll", detectActive);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const container = document.querySelector(".lg\\:overflow-y-auto");

    if (container && window.innerWidth >= 1024) {
      // desktop — scroll di dalam container
      const containerTop = container.getBoundingClientRect().top;
      const elTop = el.getBoundingClientRect().top;
      container.scrollBy({ top: elTop - containerTop, behavior: "smooth" });
    } else {
      // mobile — pakai offsetTop yang akurat
      const offset = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }

    setOpen(false);
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-5 right-5 z-50 w-10 h-10 bg-white/80 backdrop-blur-sm border border-stone-200 rounded-full flex flex-col items-center justify-center gap-1.5 shadow-sm cursor-pointer"
      >
        <span
          className={`block w-4 h-px bg-stone-600 transition-all duration-300 ${open ? "rotate-45 translate-y-1.5" : ""}`}
        />
        <span
          className={`block w-4 h-px bg-stone-600 transition-all duration-300 ${open ? "opacity-0" : ""}`}
        />
        <span
          className={`block w-4 h-px bg-stone-600 transition-all duration-300 ${open ? "-rotate-45 -translate-y-1.5" : ""}`}
        />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-64 bg-light border-l border-stone-100 transition-transform duration-400 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
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
