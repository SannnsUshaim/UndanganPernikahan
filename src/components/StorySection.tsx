const cerita = [
  {
    fase: "Pertemuan",
    tahun: "20xx",
    icon: "✦",
    judul: "Awal Mula",
    isi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at interdum lacus, nec egestas odio. Suspendisse maximus sagittis turpis. Suspendisse mauris nisl, dignissim vel turpis non, tristique maximus neque. Curabitur efficitur libero quis nibh maximus, vitae malesuada est elementum. Pellentesque consectetur dolor id aliquam rutrum. Nam at lacinia eros, id ultricies diam. Morbi a erat a tellus tincidunt pharetra eget vel dolor. Sed consectetur tempor augue, quis gravida ipsum tincidunt non.",
  },
  {
    fase: "Komitmen",
    tahun: "20xx",
    icon: "♡",
    judul: "Menjalin Janji",
    isi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at interdum lacus, nec egestas odio. Suspendisse maximus sagittis turpis. Suspendisse mauris nisl, dignissim vel turpis non, tristique maximus neque. Curabitur efficitur libero quis nibh maximus, vitae malesuada est elementum. Pellentesque consectetur dolor id aliquam rutrum. Nam at lacinia eros, id ultricies diam. Morbi a erat a tellus tincidunt pharetra eget vel dolor. Sed consectetur tempor augue, quis gravida ipsum tincidunt non.",
  },
  {
    fase: "Janji Seumur Hidup",
    tahun: "20xx",
    icon: "◇",
    judul: "Menuju Pelaminan",
    isi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at interdum lacus, nec egestas odio. Suspendisse maximus sagittis turpis. Suspendisse mauris nisl, dignissim vel turpis non, tristique maximus neque. Curabitur efficitur libero quis nibh maximus, vitae malesuada est elementum. Pellentesque consectetur dolor id aliquam rutrum. Nam at lacinia eros, id ultricies diam. Morbi a erat a tellus tincidunt pharetra eget vel dolor. Sed consectetur tempor augue, quis gravida ipsum tincidunt non.",
  },
];

export default function StorySection() {
  return (
    <section id="cerita" className="bg-light py-20 px-6">
      <div className="text-center mb-12">
        <p className="text-xs tracking-[0.3em] text-dark uppercase mb-3">Our Journey</p>
        <h2 className="font-serif text-3xl text-dark">Love Story</h2>
      </div>

      <div className="max-w-xl mx-auto relative">
        {/* Garis vertikal */}
        <div className="absolute left-5 top-2 bottom-2 w-px bg-dark" />

        <div className="flex flex-col gap-10">
          {cerita.map((c, i) => (
            <div key={i} className="flex gap-6">
              {/* Icon */}
              <div className="w-10 h-10 rounded-full bg-dark border border-primary flex items-center justify-center text-light flex-shrink-0 z-10 text-xs">
                {c.icon}
              </div>
              <div className="flex-1 pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-dark/50 tracking-widest">{c.tahun}</span>
                  <span className="text-xs text-stone-300">·</span>
                  <span className="text-xs text-dark/50 uppercase tracking-wider">{c.fase}</span>
                </div>
                <h3 className="font-serif text-xl text-dark mb-2">{c.judul}</h3>
                <p className="text-sm text-zinc-600 leading-relaxed">{c.isi}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}