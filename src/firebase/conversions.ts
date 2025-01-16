import {collection, doc, getDocs, writeBatch} from 'firebase/firestore';
import {db} from './firestore';

export const convert = async (id: string) => {
  try {
    const jarRef = doc(db, 'jars', id);

    const entries = await getDocs(collection(jarRef, 'entries'));

    const batch = writeBatch(db);

    entries.forEach((entry) => {
      const {user, time} = entry.data();

      batch.set(entry.ref, {user, created: time});
    });

    batch.commit();
  } catch {}
};
