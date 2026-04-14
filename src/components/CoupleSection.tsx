const mempelai = [
  {
    nama: "Erlin Sumianti",
    panggilan: "Erlin",
    ayah: "Suma",
    ibu: "Linda Rosita",
    foto: "/images/profil_erlin.jpg",
    ig: "@username",
    keterangan: "Putri pertama dari\nBapak Suma & Ibu Linda Rosita",
  },
  {
    nama: "Muhammad Fatih Kautsar",
    panggilan: "Fatih",
    ayah: "Eko Yuwono",
    ibu: "Ida Kusuma Wardhani",
    foto: "/images/profil_fatih.jpg",
    ig: "@username",
    keterangan: "Putra pertama dari\nBapak Eko Yuwono & Ibu Ida Kusuma Wardhani",
  },
];

export default function CoupleSection() {
  return (
    <section id="mempelai" className="bg-light min-h-dvh lg:min-h-screen py-20">
      <div className="flex flex-col items-center justify-center text-center gap-3 mb-12">
        <p className="text-xs tracking-[0.2em] lg:tracking-[0.32em] text-dark uppercase mb-3">
          Bismillahirrahmanirrahim
        </p>
        <h2 className="text-xl lg:text-3xl font-medium tracking-wide text-dark">
          The Bride And The Groom
        </h2>
        <p className="text-sm text-dark/80 mt-3 leading-relaxed max-w-xs lg:max-w-sm mx-auto">
          Dengan memohon rahmat dan ridho Allah SWT, kami mengundang kehadiran
          Bapak/Ibu/Saudara/i
        </p>
      </div>

      <div className="flex flex-col p-4 gap-6 max-w-xl mx-auto">
        {mempelai.map((m, i) => (
          <div
            key={i}
            className="flex flex-col w-full h-130 bg-dark border border-dark rounded-2xl p-3 gap-5 items-start text-left"
          >
            <div
              className="w-full h-80 rounded-xl bg-stone-100 bg-cover bg-center border border-light aspect-4/3"
              style={{ backgroundImage: `url(${m.foto})` }}
            />
            <div className="flex flex-col gap-1 ms-1">
              <p className="text-xs tracking-[0.2em] text-light/90 uppercase mb-1">
                {i === 0 ? "Mempelai Wanita" : "Mempelai Pria"}
              </p>
              <h3 className="font-serif text-2xl tracking-wider text-light mb-1">
                {m.nama}
              </h3>
              <p className="text-sm text-light/80 leading-relaxed whitespace-pre-line">
                {m.keterangan}
              </p>
              <a href={`https://instagram.com/${m.ig.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="text-xs text-light/60 hover:text-light mt-2">
                {m.ig}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
