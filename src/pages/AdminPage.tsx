import { useState, useEffect } from "react";
import {
  collection, addDoc, deleteDoc,
  doc, onSnapshot, serverTimestamp, query, orderBy
} from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  signOut, onAuthStateChanged
} from "firebase/auth";
import type { User } from "firebase/auth";
import { db, auth } from "../lib/firebase";

interface Tamu {
  id: string;
  nama: string;
  token: string;
  createdAt: { seconds: number } | null;
}

const BASE_URL = "https://erlinfatihwedding.web.app/";

const generateToken = () =>
  Math.random().toString(36).substring(2, 8) +
  Math.random().toString(36).substring(2, 8);

// ── Login Form ───────────────────────────────────────────────────────────────
function LoginForm({ onLogin }: { onLogin: (email: string, pass: string) => Promise<void> }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      await onLogin(email, pass);
    } catch {
      setError("Email atau password salah.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50">
      <div className="bg-white border border-stone-100 rounded-2xl p-8 w-full max-w-sm">
        <h1 className="font-serif text-2xl text-stone-800 text-center mb-2">
          Admin Panel
        </h1>
        <p className="text-xs text-stone-400 text-center mb-8">
          Erlin & Fatih Wedding
        </p>

        {error && (
          <div className="mb-4 px-4 py-2 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-2.5 rounded-lg bg-stone-50 border border-stone-100 text-sm focus:outline-none focus:border-stone-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="px-3 py-2.5 rounded-lg bg-stone-50 border border-stone-100 text-sm focus:outline-none focus:border-stone-300"
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-2.5 rounded-full bg-[#6B1A2A] text-white text-sm hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Masuk..." : "Masuk"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Admin Dashboard ──────────────────────────────────────────────────────────
function Dashboard({ user, onLogout }: { user: User; onLogout: () => void }) {
  const [tamuList, setTamuList] = useState<Tamu[]>([]);
  const [loading, setLoading] = useState(true);
  const [nama, setNama] = useState("");
  const [adding, setAdding] = useState(false);
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [bulkNama, setBulkNama] = useState("");
  const [showBulk, setShowBulk] = useState(false);
  const [bulkAdding, setBulkAdding] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "tamu"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setTamuList(snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Tamu[]);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const tambahSatu = async () => {
    if (!nama.trim()) return;
    setAdding(true);
    await addDoc(collection(db, "tamu"), {
      nama: nama.trim(),
      token: generateToken(),
      createdAt: serverTimestamp(),
    });
    setNama("");
    setAdding(false);
  };

  const tambahBulk = async () => {
    const names = bulkNama
      .split("\n")
      .map((n) => n.trim())
      .filter((n) => n.length > 0);
    if (names.length === 0) return;
    setBulkAdding(true);
    for (const n of names) {
      await addDoc(collection(db, "tamu"), {
        nama: n,
        token: generateToken(),
        createdAt: serverTimestamp(),
      });
    }
    setBulkNama("");
    setShowBulk(false);
    setBulkAdding(false);
  };

  const hapusTamu = async (id: string) => {
    if (!confirm("Hapus tamu ini? Link undangannya akan langsung tidak valid.")) return;
    await deleteDoc(doc(db, "tamu", id));
  };

  const copyLink = (token: string) => {
    navigator.clipboard.writeText(`${BASE_URL}?token=${token}`);
    setCopied(token);
    setTimeout(() => setCopied(null), 2000);
  };

  const copyPesanWA = (nama: string, token: string) => {
    const link = `${BASE_URL}?token=${token}`;
    const pesan =
`Assalamualaikum Wr. Wb.

Halo ${nama}! 👋

Tanpa mengurangi rasa hormat, bersama ini kami mengundang ${nama} untuk hadir dan memberikan doa restu pada pernikahan kami:

💍 Erlin & Fatih
📅 Sabtu, 12 Juli 2025
📍 Nama Gedung, Kota

Silakan buka undangan digital ${nama} di sini:
${link}

Mohon konfirmasi kehadirannya melalui link di atas.

Wassalamualaikum Wr. Wb.
— Erlin & Fatih 💍`;
    navigator.clipboard.writeText(pesan);
    setCopied(token + "_wa");
    setTimeout(() => setCopied(null), 2000);
  };

  const filtered = tamuList.filter((t) =>
    t.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-[#6B1A2A] text-white px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-xl">Admin Panel</h1>
          <p className="text-xs text-white/60 mt-0.5">Erlin & Fatih Wedding</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-white/60">{user.email}</span>
          <button
            onClick={onLogout}
            className="text-xs border border-white/30 px-3 py-1.5 rounded-full hover:bg-white/10 transition"
          >
            Keluar
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-6">

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white border border-stone-100 rounded-xl p-4 text-center">
            <div className="text-3xl font-medium text-[#6B1A2A]">{tamuList.length}</div>
            <div className="text-xs text-stone-400 mt-1">Total tamu</div>
          </div>
          <div className="bg-white border border-stone-100 rounded-xl p-4 text-center">
            <div className="text-3xl font-medium text-stone-700">
              {tamuList.filter((t) => t.token).length}
            </div>
            <div className="text-xs text-stone-400 mt-1">Link aktif</div>
          </div>
        </div>

        {/* Tambah Tamu */}
        <div className="bg-white border border-stone-100 rounded-2xl p-5">
          <h2 className="text-sm font-medium text-stone-700 mb-4">Tambah Tamu</h2>

          {/* Satu tamu */}
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="Nama tamu"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && tambahSatu()}
              className="flex-1 px-3 py-2 rounded-lg bg-stone-50 border border-stone-100 text-sm focus:outline-none focus:border-stone-300"
            />
            <button
              onClick={tambahSatu}
              disabled={adding || !nama.trim()}
              className="px-4 py-2 rounded-full bg-[#6B1A2A] text-white text-sm hover:opacity-90 transition disabled:opacity-50"
            >
              {adding ? "..." : "+ Tambah"}
            </button>
          </div>

          {/* Bulk */}
          <button
            onClick={() => setShowBulk(!showBulk)}
            className="text-xs text-[#6B1A2A] hover:underline"
          >
            {showBulk ? "Tutup" : "＋ Import banyak nama sekaligus"}
          </button>

          {showBulk && (
            <div className="mt-3">
              <textarea
                placeholder={"Satu nama per baris:\nBudi Santoso\nSiti Rahayu\nAhmad Fauzi"}
                value={bulkNama}
                onChange={(e) => setBulkNama(e.target.value)}
                rows={5}
                className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-100 text-sm focus:outline-none focus:border-stone-300 resize-none"
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-stone-400">
                  {bulkNama.split("\n").filter((n) => n.trim()).length} nama
                </span>
                <button
                  onClick={tambahBulk}
                  disabled={bulkAdding || !bulkNama.trim()}
                  className="px-4 py-2 rounded-full bg-[#6B1A2A] text-white text-sm hover:opacity-90 transition disabled:opacity-50"
                >
                  {bulkAdding ? "Menambahkan..." : "Import semua"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Daftar Tamu */}
        <div className="bg-white border border-stone-100 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-stone-700">
              Daftar Tamu
              <span className="ml-2 text-xs bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full">
                {filtered.length}
              </span>
            </h2>
            <input
              type="text"
              placeholder="Cari nama..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-stone-50 border border-stone-100 text-sm focus:outline-none focus:border-stone-300 w-40"
            />
          </div>

          {loading ? (
            <div className="text-center py-8 text-sm text-stone-400">Memuat...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-8 text-sm text-stone-400">
              {search ? "Tamu tidak ditemukan." : "Belum ada tamu."}
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-stone-50">
              {filtered.map((tamu) => (
                <div key={tamu.id} className="py-3 flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-stone-800">{tamu.nama}</p>
                    <p className="text-xs text-stone-400 truncate mt-0.5">
                      {BASE_URL}?token={tamu.token}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => copyLink(tamu.token)}
                      className="text-xs px-3 py-1.5 rounded-full border border-stone-200 text-stone-600 hover:bg-stone-50 transition"
                    >
                      {copied === tamu.token ? "✓ Link" : "Link"}
                    </button>
                    <button
                      onClick={() => copyPesanWA(tamu.nama, tamu.token)}
                      className="text-xs px-3 py-1.5 rounded-full border border-green-200 text-green-700 hover:bg-green-50 transition"
                    >
                      {copied === tamu.token + "_wa" ? "✓ WA" : "WA"}
                    </button>
                    <button
                      onClick={() => hapusTamu(tamu.id)}
                      className="text-xs px-3 py-1.5 rounded-full border border-red-100 text-red-500 hover:bg-red-50 transition"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Export ──────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setChecking(false);
    });
    return () => unsub();
  }, []);

  const handleLogin = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const handleLogout = () => signOut(auth);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-stone-400 text-sm">Memuat...</div>
      </div>
    );
  }

  if (!user) return <LoginForm onLogin={handleLogin} />;
  return <Dashboard user={user} onLogout={handleLogout} />;
}