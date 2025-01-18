import {
  collection,
  doc,
  runTransaction,
  serverTimestamp,
} from 'firebase/firestore';
import {db} from '../firebase';
import {selectedUserId} from '../signals/send';
import {jarRef, sortedEntries, usersById} from '../signals/store';

export const send = async () => {
  if (import.meta.env.MODE !== 'production') {
    console.log('Deposit skipped in development');
    return;
  }

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

    sortedEntries[1].refetch();
  } catch (error) {
    console.error('I fucked up deposit', error);
  }
};
