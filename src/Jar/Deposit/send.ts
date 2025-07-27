import {
  collection,
  doc,
  runTransaction,
  serverTimestamp,
} from 'firebase/firestore';
import {db} from '@/firebase';
import {selectedUserId} from '@/signals/send';
import {jarRef, usersById} from '@/signals/store';
import {reload} from '@/signals/reload';

export const send = async () => {
  const users = usersById[0]()!;
  const userId = selectedUserId()!;

  try {
    await runTransaction(db, async (transaction) => {
      const entryRef = doc(collection(jarRef(), 'entries'));

      transaction.set(entryRef, {
        user: users[userId].ref,
        created: serverTimestamp(),
      });
    });

    reload();
  } catch (error) {
    console.error('❌ I fucked up deposit', error);
  }
};
