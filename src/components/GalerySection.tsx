import { useState, useEffect } from "react";

const galeriImages = [
  "/images/Prewed_2.jpg",
  "/images/Prewed_17.jpg",
  "/images/Prewed_35.jpg",
  "/images/Prewed_51.jpg",
  "/images/Prewed_52.jpg",
  "/images/Prewed_71.jpg",
  "/images/Prewed_127.jpg",
  "/images/Prewed_128.jpg",
  "/images/Prewed_138.jpg",
  "/images/Prewed_139.jpg",
];

export default function GalerySection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % galeriImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + galeriImages.length) % galeriImages.length);
  const next = () => setCurrent((c) => (c + 1) % galeriImages.length);

  return (
    <section id="galeri" className="bg-dark py-20 px-6">
      <div className="text-center mb-10">
        <p className="text-xs lg:text-sm tracking-[0.3em] text-light uppercase mb-3">Our Moment</p>
        <h2 className="font-body text-3xl text-light tracking-wide">Galery</h2>
      </div>

      <div className="relative max-w-xl mx-auto">
        <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-stone-100">
          {galeriImages.map((src, i) => (
            <div
              key={src}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}
              style={{ backgroundImage: `url(${src})` }}
            />
          ))}

          {/* Prev / Next */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-700 hover:bg-white transition"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-700 hover:bg-white transition"
          >
            ›
          </button>

          {/* Counter */}
          <div className="absolute bottom-3 right-4 text-xs text-white/80 bg-black/30 px-2 py-1 rounded-full">
            {current + 1} / {galeriImages.length}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-4">
          {galeriImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1 rounded-full transition-all duration-300 ${i === current ? "w-5 bg-secondary" : "w-1.5 bg-light/50"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}