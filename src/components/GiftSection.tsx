import { useState } from "react";

const rekening = [
  {
    bank: "BCA",
    logo: "/images/logo-bca.png",
    norek: "1234567890",
    atasNama: "Nama Mempelai Pria",
  },
  {
    bank: "Mandiri",
    logo: "/images/logo-mandiri.png",
    norek: "0987654321",
    atasNama: "Nama Mempelai Wanita",
  },
];

export default function GiftSection() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (norek: string) => {
    navigator.clipboard.writeText(norek);
    setCopied(norek);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section id="gift" className="py-20 px-6">
      <div className="text-center mb-4">
        <p className="text-xs tracking-[0.3em] text-stone-400 uppercase mb-3">Hadiah</p>
        <h2 className="font-serif text-3xl text-stone-800">Wedding Gift</h2>
        <p className="text-sm text-stone-400 mt-3 max-w-sm mx-auto leading-relaxed">
          Doa restu Anda adalah hadiah terindah. Namun jika ingin memberikan tanda kasih,
          dapat melalui:
        </p>
      </div>

      <div className="flex flex-col gap-4 max-w-xl mx-auto mt-8">
        {rekening.map((r, i) => (
          <div key={i} className="bg-white border border-stone-100 rounded-2xl p-5">
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-12 h-12 rounded-xl bg-stone-50 border border-stone-100 bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${r.logo})` }}
              />
              <div>
                <p className="font-medium text-stone-800">{r.bank}</p>
                <p className="text-xs text-stone-400">{r.atasNama}</p>
              </div>
            </div>
            <div className="flex items-center justify-between bg-stone-50 rounded-xl px-4 py-3">
              <span className="text-lg font-medium text-stone-700 tracking-wider">{r.norek}</span>
              <button
                onClick={() => handleCopy(r.norek)}
                className="text-xs text-stone-500 hover:text-stone-800 transition border border-stone-200 px-3 py-1.5 rounded-lg"
              >
                {copied === r.norek ? "Tersalin!" : "Salin"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}