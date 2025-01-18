import {
  collection,
  doc,
  DocumentReference,
  getDocs,
  writeBatch,
} from 'firebase/firestore';
import {db} from './firestore';
import {jar} from '../signals/store';

const run = async () => {
  const id = jar();

  try {
    const jarRef = doc(db, 'jars', id);

    const userRefById: Record<string, DocumentReference> = {};

    const entries = await getDocs(collection(jarRef, 'entries'));
    const users = await getDocs(collection(jarRef, 'users'));

    users.forEach((user) => {
      userRefById[user.data().name] = user.ref;
    });

    const batch = writeBatch(db);

    entries.forEach((entry) => {
      const {user, create, time} = entry.data();

      if (time) {
        batch.set(entry.ref, {user, created: time});
      }
    });

    // await batch.commit();

    console.log('Conversion completed ✅');
  } catch (error) {
    console.error('I fucked up', error);
  }
};

export const Convert = () => {
  return <button onClick={run}>CONVERT</button>;
};
