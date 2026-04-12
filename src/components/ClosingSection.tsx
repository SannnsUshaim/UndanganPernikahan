import { useState, useEffect } from "react";

const coverImages = [
  "/images/Prewed_147.jpg",
  "/images/Prewed_145.jpg",
  "/images/Prewed_146.jpg",
  "/images/Prewed_148.jpg",
];

export default function ClosingSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % coverImages.length), 3000);
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
        <p className="text-xs lg:text-sm tracking-[0.3em] text-light/65 uppercase mb-6">Thank You</p>
        <h2 className="font-serif text-5xl lg:text-6xl text-light mb-4 font-bride tracking-wider">Erlin & Fatih</h2>
        <div className="w-24 h-px bg-light/50 mx-auto my-6" />
        <p className="text-sm text-light/80 leading-relaxed max-w-xs mx-auto">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i
          berkenan hadir dan memberikan doa restu.
        </p>
        <p className="text-xs text-light/70 mt-8 tracking-widest">SATURDAY, 12 · 07 · 2025</p>
      </div>
    </section>
  );
}