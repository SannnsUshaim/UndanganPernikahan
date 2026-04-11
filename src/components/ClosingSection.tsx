import { useState, useEffect } from "react";

const coverImages = [
  "/images/cover-1.jpg",
  "/images/cover-2.jpg",
  "/images/cover-3.jpg",
];

export default function ClosingSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % coverImages.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="penutup" className="relative h-screen flex items-center justify-center overflow-hidden">
      {coverImages.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`}
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 text-center px-6">
        <p className="text-xs tracking-[0.3em] text-white/60 uppercase mb-6">Terima Kasih</p>
        <h2 className="font-serif text-5xl text-white mb-4">Nama & Nama</h2>
        <div className="w-12 h-px bg-white/40 mx-auto my-6" />
        <p className="text-sm text-white/70 leading-relaxed max-w-xs mx-auto">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i
          berkenan hadir dan memberikan doa restu.
        </p>
        <p className="text-xs text-white/50 mt-8 tracking-widest">SABTU, 12 · 07 · 2025</p>
      </div>
    </section>
  );
}