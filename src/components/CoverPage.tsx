// src/components/CoverPage.tsx
export default function CoverPage() {
  const handleOpen = () => {
    document
      .getElementById("invitation-content")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="relative w-full h-screen flex flex-col items-center justify-end pb-16 bg-cover bg-center"
      style={{ backgroundImage: "url('/foto-prewed.jpg')" }}
    >
      {/* Overlay gelap tipis */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Teks */}
      <div className="relative z-10 font-title text-center text-white mb-8">
        <p className="text-sm tracking-widest uppercase opacity-80">
          The Wedding of
        </p>
        <h1 className="text-4xl mt-2 font-bride">Nama & Nama</h1>
        <p className="text-sm mt-2 opacity-70">Sabtu, 12 Juli 2025</p>
      </div>

      <button
        onClick={handleOpen}
        className="relative z-10 lg:hidden border border-white/60 text-white text-sm px-8 py-3 rounded-full hover:bg-white/10 transition"
      >
        Open Invitation
      </button>
    </div>
  );
}
