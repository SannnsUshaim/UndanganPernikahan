import { useState } from "react";
import {
  useRsvpUcapan,
  type RsvpUcapan,
  type RsvpUcapanInput,
} from "../hooks/useRsvpUcapan";

type Step = 1 | 2 | 3;

const COLORS = [
  { bg: "bg-purple-100", text: "text-purple-800" },
  { bg: "bg-teal-100", text: "text-teal-800" },
  { bg: "bg-pink-100", text: "text-pink-800" },
  { bg: "bg-amber-100", text: "text-amber-800" },
  { bg: "bg-blue-100", text: "text-blue-800" },
];

function getInitials(nama: string) {
  return nama
    .trim()
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function getColor(nama: string) {
  let h = 0;
  for (const c of nama) h = (h * 31 + c.charCodeAt(0)) % COLORS.length;
  return COLORS[Math.abs(h) % COLORS.length];
}

function Avatar({ nama }: { nama: string }) {
  const col = getColor(nama);
  return (
    <div
      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${col.bg} ${col.text}`}
    >
      {getInitials(nama) || "?"}
    </div>
  );
}

function BadgeKehadiran({ kehadiran }: { kehadiran: RsvpUcapan["kehadiran"] }) {
  return kehadiran === "hadir" ? (
    <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">
      ✓ Hadir
    </span>
  ) : (
    <span className="text-xs px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
      ✕ Tidak hadir
    </span>
  );
}

function KartuUcapan({ item }: { item: RsvpUcapan }) {
  const waktu = item.createdAt
    ? item.createdAt.toDate().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Baru saja";

  return (
    <div
      className="bg-white px-4 py-3.5 flex gap-3 transition-colors duration-150 hover:bg-stone-50"  // ← diupdate
    >
      <Avatar nama={item.nama} />
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap justify-between items-center gap-2 mb-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-stone-800">{item.nama}</span>
            <BadgeKehadiran kehadiran={item.kehadiran} />
            {item.kehadiran === "hadir" && item.jumlahTamu && (
              <span className="text-xs text-stone-400">{item.jumlahTamu} orang</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-400">{waktu}</span>
          </div>
        </div>
        <p className="text-sm text-stone-600 leading-relaxed">{item.pesan}</p>
      </div>
    </div>
  );
}

function StepIndicator({ step }: { step: Step }) {
  return (
    <div className="flex items-center justify-center mb-8">
      {[1, 2].map((s, i) => (
        <div key={s} className="flex items-center">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium border transition-all duration-300 ${
              s < step
                ? "bg-stone-400 text-white border-stone-400"
                : s === step
                  ? "bg-stone-700 text-white border-stone-700"
                  : "bg-transparent text-stone-400 border-stone-200"
            }`}
          >
            {s < step ? "✓" : s}
          </div>
          {i < 1 && (
            <div
              className={`w-10 h-px transition-all duration-300 ${s < step ? "bg-stone-400" : "bg-stone-200"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function RsvpUcapanSection() {
  const { data, loading, submitting, submitted, kirim } = useRsvpUcapan();
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<RsvpUcapanInput>({
    nama: "",
    kehadiran: "hadir",
    jumlahTamu: 1,
    pesan: "",
  });

  const handleSubmit = async () => {
    await kirim(form);
  };

  const hadirCount = data.filter((d) => d.kehadiran === "hadir").length;
  const tidakHadirCount = data.filter(
    (d) => d.kehadiran === "tidak_hadir",
  ).length;

  return (
    <section id="rsvp" className="max-w-xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="font-serif text-3xl text-stone-800 tracking-wide">
          {step === 1 ? "RSVP" : "Ucapan & Doa"}
        </h2>
        <p className="text-sm text-stone-400 mt-2">
          Konfirmasi kehadiran dan tinggalkan doa terbaik
        </p>
      </div>

      <div className="flex items-center gap-3 mb-8">
        <div className="flex-1 h-px bg-stone-200" />
        <span className="text-stone-300 text-xs">✦</span>
        <div className="flex-1 h-px bg-stone-200" />
      </div>

      {/* Form — sembunyikan kalau sudah submit */}
      {!submitted ? (
        <>
          <StepIndicator step={step} />

          {step === 1 && (
            <div className="bg-white border border-stone-100 rounded-2xl p-6 flex flex-col gap-5">
              <div>
                <label className="text-xs font-medium text-stone-500 uppercase tracking-wider">
                  Nama lengkap
                </label>
                <input
                  type="text"
                  placeholder="Nama kamu"
                  value={form.nama}
                  maxLength={40}
                  onChange={(e) => setForm({ ...form, nama: e.target.value })}
                  className="mt-2 w-full px-3 py-2.5 rounded-lg bg-stone-50 border border-stone-100 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-stone-300"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-stone-500 uppercase tracking-wider">
                  Konfirmasi kehadiran
                </label>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  {(["hadir", "tidak_hadir"] as const).map((val) => (
                    <button
                      key={val}
                      onClick={() => setForm({ ...form, kehadiran: val })}
                      className={`py-4 rounded-xl border text-sm transition-all ${
                        form.kehadiran === val
                          ? val === "hadir"
                            ? "bg-green-50 border-green-300 text-green-800"
                            : "bg-red-50 border-red-300 text-red-800"
                          : "bg-stone-50 border-stone-100 text-stone-600 hover:border-stone-300"
                      }`}
                    >
                      <div className="text-xl mb-1">
                        {val === "hadir" ? "🎉" : "😢"}
                      </div>
                      {val === "hadir" ? "Hadir" : "Tidak hadir"}
                    </button>
                  ))}
                </div>
              </div>

              {form.kehadiran === "hadir" && (
                <div>
                  <label className="text-xs font-medium text-stone-500 uppercase tracking-wider">
                    Jumlah tamu (termasuk kamu){" "}
                    <span className="text-xs">Maks. 10</span>
                  </label>
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      onClick={() =>
                        setForm({
                          ...form,
                          jumlahTamu: Math.max(1, (form.jumlahTamu ?? 1) - 1),
                        })
                      }
                      className="w-9 h-9 rounded-full border border-stone-200 text-stone-600 hover:bg-stone-100 transition-colors"
                    >
                      −
                    </button>
                    <span className="text-xl font-medium text-stone-800 w-8 text-center">
                      {form.jumlahTamu}
                    </span>
                    <button
                      onClick={() =>
                        setForm({
                          ...form,
                          jumlahTamu: Math.min(10, (form.jumlahTamu ?? 1) + 1),
                        })
                      }
                      className="w-9 h-9 rounded-full border border-stone-200 text-stone-600 hover:bg-stone-100 transition-colors"
                    >
                      +
                    </button>
                    <span className="text-sm text-stone-400">orang</span>
                  </div>
                </div>
              )}

              <button
                onClick={() => setStep(2)}
                disabled={!form.nama.trim()}
                className="w-full py-3 rounded-full bg-stone-700 text-white text-sm hover:bg-stone-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Lanjut →
              </button>
            </div>
          )}

          {step === 2 && (
            <>
              <button
                onClick={() => setStep(1)}
                className="text-sm text-stone-400 hover:text-stone-600 mb-4 transition-colors"
              >
                ← Kembali
              </button>
              <div className="bg-white border border-stone-100 rounded-2xl p-6 flex flex-col gap-5">
                <div>
                  <label className="text-xs font-medium text-stone-500 uppercase tracking-wider">
                    Ucapan & doa
                  </label>
                  <textarea
                    placeholder="Tulis ucapan dan doa terbaikmu..."
                    value={form.pesan}
                    maxLength={200}
                    rows={4}
                    onChange={(e) =>
                      setForm({ ...form, pesan: e.target.value })
                    }
                    className="mt-2 w-full px-3 py-2.5 rounded-lg bg-stone-50 border border-stone-100 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-stone-300 resize-none leading-relaxed"
                  />
                  <span className="text-xs text-stone-400">
                    {form.pesan.length}/200
                  </span>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={submitting || !form.pesan.trim()}
                  className="w-full py-3 rounded-full bg-stone-700 text-white text-sm hover:bg-stone-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {submitting ? "Mengirim..." : "Kirim 🎊"}
                </button>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="text-center py-8">
          <div className="text-5xl mb-4">
            {form.kehadiran === "hadir" ? "🎉" : "💌"}
          </div>
          <h3 className="font-serif text-2xl text-stone-800 mb-3">
            {form.kehadiran === "hadir"
              ? `Sampai jumpa, ${form.nama}!`
              : `Terima kasih, ${form.nama}!`}
          </h3>
          <p className="text-sm text-stone-400 leading-relaxed">
            {form.kehadiran === "hadir"
              ? `Kami sangat senang kamu bisa hadir bersama ${form.jumlahTamu} orang.`
              : "Doa dan ucapanmu sangat berarti bagi kami."}
          </p>
        </div>
      )}

      {/* List ucapan */}
      <div className="mt-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-stone-200" />
          <span className="text-stone-300 text-xs">✦</span>
          <div className="flex-1 h-px bg-stone-200" />
        </div>

        {/* Ringkasan */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-green-50 border border-green-100 rounded-xl p-3 text-center">
            <div className="text-2xl font-medium text-green-800">
              {hadirCount}
            </div>
            <div className="text-xs text-green-600 mt-1">Hadir</div>
          </div>
          <div className="bg-red-50 border border-red-100 rounded-xl p-3 text-center">
            <div className="text-2xl font-medium text-red-800">
              {tidakHadirCount}
            </div>
            <div className="text-xs text-red-600 mt-1">Tidak hadir</div>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm font-medium text-stone-700">
            Semua ucapan
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-stone-100 text-stone-500">
            {data.length}
          </span>
        </div>

        {loading ? (
          <div className="text-center py-8 text-sm text-stone-400">
            Memuat...
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-8 text-sm text-stone-400">
            Belum ada ucapan. Jadilah yang pertama!
          </div>
        ) : (
          <div className="border border-stone-100 rounded-2xl overflow-hidden">
            <div
              className="flex flex-col divide-y divide-stone-100 overflow-y-auto"
              style={{ maxHeight: "calc(7 * 5.5rem)" }}
            >
              {data.map((item) => (
                <KartuUcapan key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
