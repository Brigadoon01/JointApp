import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/Config";

export const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  //? realtime data for document
  useEffect(() => {
    const ref = projectFirestore.collection(collection).doc(id);

    const unsub = ref.onSnapshot(
      (snapshot) => {
        if (snapshot.data()) {
          setDocument({ ...snapshot.data(), id: snapshot.id });
          setError(null);
        } else {
          setError("No such document exists");
        }
      },
      (err) => {
        console.log(err.message);
        setError("Failed to get document");
      }
    );
    return () => unsub();
  }, [collection, id]);

  return { document, error };
};
