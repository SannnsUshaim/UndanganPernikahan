import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

export const useGuest = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [nama, setNama] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchTamu = async () => {
      try {
        const q = query(
          collection(db, "tamu"),
          where("token", "==", token)
        );
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const data = snapshot.docs[0].data();
          setNama(data.nama);
          setIsValid(true);
        }
      } catch (err) {
        console.error("Error fetch token:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTamu();
  }, [token]);

  return { nama, isValid, loading };
};