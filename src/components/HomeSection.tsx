import { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const WEDDING_DATE = dayjs("2026-05-23T08:00:00");

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    hari: 0,
    jam: 0,
    menit: 0,
    detik: 0,
  });

  useEffect(() => {
    const tick = () => {
      const diff = WEDDING_DATE.diff(dayjs());
      if (diff <= 0) return;
      const dur = dayjs.duration(diff);
      setTimeLeft({
        hari: Math.floor(dur.asDays()),
        jam: dur.hours(),
        menit: dur.minutes(),
        detik: dur.seconds(),
      });
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-3 max-w-sm mx-auto">
      {Object.entries(timeLeft).map(([key, val]) => (
        <div
          key={key}
          className="bg-light border border-stone-100 rounded-xl py-3 text-center"
        >
          <div className="text-2xl font-medium text-dar">
            {String(val).padStart(2, "0")}
          </div>
          <div className="text-xs text-dark mt-1 capitalize">{key}</div>
        </div>
      ))}
    </div>
  );
}

export default function SectionHome() {
  const addToCalendar = () => {
    const start = WEDDING_DATE.format("YYYYMMDDTHHmmss");
    const end = dayjs("2025-07-12T15:00:00").format("YYYYMMDDTHHmmss");
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+Nama+%26+Nama&dates=${start}/${end}&details=Pernikahan+Nama+%26+Nama&location=Nama+Gedung,+Alamat`;
    window.open(url, "_blank");
  };

  return (
    <section
      id="home"
      className="h-dvh lg:h-screen bg-dark flex flex-col items-center justify-center px-6"
    >
      <div className="text-center">
        <p className="text-xs tracking-[0.3em] text-light uppercase mb-6">
          {WEDDING_DATE.format("dddd, D MMMM YYYY")}
        </p>
        <div>
          <h2 className="font-serif text-5xl text-light mb-2 font-bride">Erlin & Fatih</h2>
          <p className="text-sm lg:text-base text-light mb-10">
            Mengundang kehadiran Anda di hari bahagia kami
          </p>
        </div>
      </div>
      <div>
        <Countdown />
        <button
          onClick={addToCalendar}
          className="mt-8 flex items-center gap-2 mx-auto px-6 py-3 rounded-full border border-light text-sm text-light hover:bg-light hover:text-dark hover:border-light hover:scale-105 cursor-pointer hover:shadow-xl transition"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          Simpan ke Kalender
        </button>
      </div>
    </section>
  );
}
