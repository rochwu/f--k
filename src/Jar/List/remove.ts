import {db} from '@/firebase';
import {Mode, setMode} from '@/signals/meta';
import {sortedEntries} from '@/signals/store';
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
    sortedEntries[1].refetch();
    setMode(Mode.Deposit);
  } catch (error) {
    console.error('I fucked up remove', error);
  }
};
