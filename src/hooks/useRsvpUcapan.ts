import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import type { Timestamp } from "firebase/firestore";

export interface RsvpUcapan {
  id: string;
  nama: string;
  kehadiran: "hadir" | "tidak_hadir";
  jumlahTamu?: number;
  pesan: string;
  createdAt: Timestamp | null;
}

export type RsvpUcapanInput = Omit<RsvpUcapan, "id" | "createdAt">;

export const useRsvpUcapan = () => {
  const [data, setData] = useState<RsvpUcapan[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, "rsvp_ucapan"),
      orderBy("createdAt", "desc"),
    );
    const unsub = onSnapshot(q, (snapshot) => {
      setData(
        snapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as RsvpUcapan[],
      );
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const kirim = async (
    input: RsvpUcapanInput
  ): Promise<void> => {
    setSubmitting(true);
    try {
      await addDoc(collection(db, "rsvp_ucapan"), {
        ...input,
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
      console.log(data);
    }
  };

  const hapus = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, "rsvp_ucapan", id));
  };

  return { data, loading, submitting, submitted, kirim, hapus };
};
