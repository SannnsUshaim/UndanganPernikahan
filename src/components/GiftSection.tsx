import { useState } from "react";

const rekening = [
  {
    bank: "BCA",
    logo: "/assets/logo_bca.png",
    norek: "3390329490",
    atasNama: "Erlin Sumianti",
  },
  {
    bank: "Mandiri",
    logo: "/assets/logo_mandiri.png",
    norek: "1020010758057",
    atasNama: "Erlin Sumianti",
  },
  {
    bank: "Jago",
    logo: "/assets/logo_jago.png",
    norek: "103664528414",
    atasNama: "Muhammad Fatih Kautsar",
  }
];

export default function GiftSection() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (norek: string) => {
    navigator.clipboard.writeText(norek);
    setCopied(norek);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section id="gift" className="bg-light py-20 px-6">
      <div className="text-center mb-4">
        <p className="text-xs tracking-[0.3em] text-dark/75 uppercase mb-3">Gift</p>
        <h2 className="font-serif text-3xl text-dark">Wedding Gift</h2>
        <p className="text-sm text-dark/60 mt-3 max-w-sm mx-auto leading-relaxed">
          Doa restu Anda adalah hadiah terindah. Namun jika ingin memberikan tanda kasih,
          dapat melalui:
        </p>
      </div>

      <div className="flex flex-col gap-4 max-w-xl mx-auto mt-8">
        {rekening.map((r, i) => (
          <div key={i} className="bg-dark border border-primary rounded-2xl p-5">
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-24 h-24 rounded-xl bg-zinc-50 border border-light bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${r.logo})` }}
              />
              <div>
                <p className="font-medium text-lg text-light">{r.bank}</p>
                <p className="text-xs lg:text-sm text-light/80">{r.atasNama}</p>
              </div>
            </div>
            <div className="flex items-center justify-between bg-zinc-50 rounded-xl px-4 py-2">
              <span className="text-base font-medium text-dark tracking-wider">{r.norek}</span>
              <button
                onClick={() => handleCopy(r.norek)}
                className="text-xs lg:text-sm text-dark/60 hover:text-light hover:bg-dark transition border border-dark/60 px-3 py-1.5 rounded-lg hover:shadow-md hover:scale-105 cursor-pointer"
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