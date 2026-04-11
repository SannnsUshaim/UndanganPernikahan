const cerita = [
  {
    fase: "Pertemuan",
    tahun: "2020",
    icon: "✦",
    judul: "Awal Mula",
    isi: "Ceritakan bagaimana kalian pertama kali bertemu. Di mana, kapan, dan bagaimana perasaan pertama itu muncul.",
  },
  {
    fase: "Komitmen",
    tahun: "2022",
    icon: "♡",
    judul: "Menjalin Janji",
    isi: "Ceritakan momen ketika kalian memutuskan untuk serius dan berkomitmen satu sama lain.",
  },
  {
    fase: "Janji Seumur Hidup",
    tahun: "2025",
    icon: "◇",
    judul: "Menuju Pelaminan",
    isi: "Ceritakan perjalanan menuju hari istimewa ini, lamaran, persiapan, dan rasa syukur.",
  },
];

export default function StorySection() {
  return (
    <section id="cerita" className="py-20 px-6">
      <div className="text-center mb-12">
        <p className="text-xs tracking-[0.3em] text-stone-400 uppercase mb-3">Perjalanan Kami</p>
        <h2 className="font-serif text-3xl text-stone-800">Cerita Cinta</h2>
      </div>

      <div className="max-w-xl mx-auto relative">
        {/* Garis vertikal */}
        <div className="absolute left-5 top-2 bottom-2 w-px bg-stone-200" />

        <div className="flex flex-col gap-10">
          {cerita.map((c, i) => (
            <div key={i} className="flex gap-6">
              {/* Icon */}
              <div className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-500 flex-shrink-0 z-10 text-xs">
                {c.icon}
              </div>
              <div className="flex-1 pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-stone-400 tracking-widest">{c.tahun}</span>
                  <span className="text-xs text-stone-300">·</span>
                  <span className="text-xs text-stone-400 uppercase tracking-wider">{c.fase}</span>
                </div>
                <h3 className="font-serif text-xl text-stone-800 mb-2">{c.judul}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{c.isi}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}