const mempelai = [
  {
    nama: "Erlin Sumianti",
    panggilan: "Erlin",
    ayah: "Suma",
    ibu: "Linda Rosita",
    foto: "/images/profil_erlin.jpg",
    keterangan: "Putri pertama dari\nBapak Suma & Ibu Linda Rosita",
  },
  {
    nama: "Muhammad Fatih Kautsar",
    panggilan: "Fatih",
    ayah: "Eko Yuwono",
    ibu: "Ida Kusuma Wardhani",
    foto: "/images/profil_fatih.jpg",
    keterangan:
      "Putra pertama dari\nBapak Eko Yuwono & Ibu Ida Kusuma Wardhani",
  },
];

export default function CoupleSection() {
  return (
    <section id="mempelai" className="bg-light min-h-dvh lg:min-h-screen py-20">
      <div className="flex flex-col items-center justify-center text-center gap-3 mb-12">
        <p className="text-xs lg:text-sm tracking-[0.2em] lg:tracking-[0.32em] text-dark uppercase mb-3">
          Bismillahirrahmanirrahim
        </p>
        <p className="text-xs lg:text-sm px-6 lg:px-20 text-dark">
          "Allah menjadikan bagimu pasangan (suami atau istri) dari jenis kamu sendiri, menjadikan bagimu dari pasanganmu anak-anak dan cucu-cucu, serta menganugerahi kamu rezeki yang baik-baik. Mengapa terhadap yang batil mereka beriman, sedangkan terhadap nikmat Allah mereka ingkar?"
        </p>
        <p className="text-xs lg:text-sm text-dark">(Q.S. An-Nahl : 72)</p>
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
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
