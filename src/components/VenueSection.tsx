const acara = [
  {
    title: "Akad Nikah",
    jam: "08.00 - 10.00 WIB",
    tempat: "Bumi Anwari",
    alamat: "Jl. Benteng Kidul No.99, Dayeuhluhur, Kec. Warudoyong, Kota Sukabumi, Jawa Barat 43291",
    maps: "https://maps.app.goo.gl/4eDWgTrPs57Y619RA",
  },
  {
    title: "Resepsi",
    jam: "10.30 - 14.00 WIB",
    tempat: "Bumi Anwari",
    alamat: "Jl. Benteng Kidul No.99, Dayeuhluhur, Kec. Warudoyong, Kota Sukabumi, Jawa Barat 43291",
    maps: "https://maps.app.goo.gl/4eDWgTrPs57Y619RA",
  },
];

export default function SectionVenue() {
  return (
    <section id="venue" className="bg-dark py-20 px-6">
      <div className="text-center mb-12">
        <p className="text-xs tracking-[0.3em] text-light uppercase mb-3">
          Saturday, 23 May 2026
        </p>
        <h2 className="font-serif text-3xl text-light tracking-wide">Venue</h2>
      </div>

      <div className="flex flex-col gap-5 max-w-xl mx-auto">
        {acara.map((a, i) => (
          <div
            key={i}
            className="bg-light border border-light rounded-2xl p-7"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs tracking-widest text-primary uppercase mb-1">
                  {a.title}
                </p>
                <h3 className="font-serif text-xl text-dark">
                  {a.tempat}
                </h3>
              </div>
              <span className="text-xs bg-dark text-light px-3 py-1.5 rounded-full">
                {a.jam}
              </span>
            </div>
            <p className="text-sm text-dark mb-5">{a.alamat}</p>
            <a
              href={a.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full border border-dark text-sm text-dark hover:bg-dark hover:text-light hover:scale-105 hover:shadow-xl transition"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              Buka di Google Maps
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
