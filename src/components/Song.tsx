import { useState, useEffect, useRef } from "react";

export default function Song() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!started) {
        audioRef.current?.play();
        setPlaying(true);
        setStarted(true);
      }
    };

    document.addEventListener("click", handleFirstInteraction, { once: true });
    document.addEventListener("touchstart", handleFirstInteraction, {
      once: true,
    });

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [started]);

  useEffect(() => {
    const handleVisibility = () => {
      if (!audioRef.current || !started) return;

      if (document.hidden) {
        audioRef.current.pause();
      } else {
        if (playing) {
          audioRef.current.play();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, [started, playing]);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <>
      <audio ref={audioRef} src="/music/backsong.mp3" loop autoPlay />

      <button
        onClick={toggle}
        className={`fixed bottom-6 left-6 z-50 w-10 h-10 lg:w-12 lg:h-12 bg-light/80 backdrop-blur-sm border border-light rounded-full flex items-center justify-center shadow-sm transition-all duration-1000 hover:bg-light cursor-pointer ${
          playing ? "text-dark" : "text-stone-400"
        }`}
      >
        {playing ? (
          <span className="flex items-end gap-0.5 h-4">
            <span
              className="w-0.5 bg-current rounded-full animate-musicBar1"
              style={{ height: "60%" }}
            />
            <span
              className="w-0.5 bg-current rounded-full animate-musicBar2"
              style={{ height: "100%" }}
            />
            <span
              className="w-0.5 bg-current rounded-full animate-musicBar3"
              style={{ height: "40%" }}
            />
            <span
              className="w-0.5 bg-current rounded-full animate-musicBar4"
              style={{ height: "80%" }}
            />
          </span>
        ) : (
          <span className="flex gap-1.5">
            <span className="w-1 h-5 bg-dark rounded-md" />
            <span className="w-1 h-5 bg-dark rounded-md" />
          </span>
        )}
      </button>

      <div
        className={`fixed items-center left-18.75 bottom-7 lg:left-20 lg:bottom-7 z-40 text-xs lg:text-sm text-dark bg-light/80 backdrop-blur-sm border border-light rounded-lg lg:rounded-xl shadow-sm origin-left whitespace-nowrap overflow-hidden transition-all duration-1200 ease-in-out hover:bg-light ${
          playing
            ? "max-w-100 lg:max-w-125 p-2 lg:px-3 lg:py-2 opacity-100"
            : "max-w-0 px-0 py-2 opacity-0 border-transparent"
        }`}
      >
        Now Playing: Banda Neira - Sampai Jadi Debu
      </div>
    </>
  );
}
