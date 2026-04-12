import { useState, useEffect } from "react";

const coverImages = [
  '/images/Prewed_21.jpg',
  '/images/Prewed_11.jpg',
  '/images/Prewed_1.jpg',
  '/images/Prewed_35.jpg'
];

export default function CoverPage({
  desktopMode = false,
}: {
  desktopMode?: boolean;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % coverImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleOpen = () => {
    document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Carousel */}
      {coverImages.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`}
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-end pb-16 text-center px-6">
        <p className="text-xs lg:text-base tracking-[0.3em] text-light uppercase mb-3">
          The Wedding of
        </p>
        <h1 className="font-bride text-7xl text-light tracking-wider mb-2">Erlin</h1>
        <p className="text-light/80 text-4xl font-bride">&</p>
        <h1 className="font-bride text-7xl text-light tracking-wider mt-2 mb-4">Fatih</h1>
        <p className="text-light/80 text-sm lg:text-base tracking-widest mb-10">
          Saturday, 23 · 05 · 2026
        </p>

        {/* Dots */}
        <div className="flex gap-2 mb-10">
          {coverImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1 rounded-full transition-all duration-700 ${i === current ? "w-6 bg-light" : "w-2 bg-light/40"}`}
            />
          ))}
        </div>

        {/* Tombol open — mobile only */}
        {!desktopMode && (
          <button
            onClick={handleOpen}
            className="border border-light/50 text-light text-sm px-8 py-3 rounded-full hover:bg-light/10 transition tracking-widest"
          >
            OPEN INVITATION
          </button>
        )}
      </div>
    </div>
  );
}
