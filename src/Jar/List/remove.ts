import {db} from '@/firebase';
import {reload} from '@/signals/reload';
import {DocumentReference, runTransaction} from 'firebase/firestore';

export const remove = async (ref: DocumentReference) => {
  if (import.meta.env.MODE !== 'production') {
    console.log('Remove skipped in development');
    return;
  }

  try {
    await runTransaction(db, async (transaction) => {
      const doc = await transaction.get(ref);

      if (!doc.exists()) {
        throw new Error("Doc doesn't exist");
      }

      transaction.delete(ref);
    });

    // Lazy way to not have to deal with syncing the store
    reload();
  } catch (error) {
    console.error('I fucked up remove', error);
  }
};
