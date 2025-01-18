import {Component} from 'solid-js';
import {UserSelect} from '../UserSelect';
import {Piggy} from './Piggy';
import {
  jarRef,
  setTotal,
  setTotalByUserId,
  sortedEntries,
  total,
  usersById,
} from '../signals/store';
import {effect} from 'solid-js/web';
import {selectedUserId} from '../signals/send';
import {
  collection,
  doc,
  runTransaction,
  serverTimestamp,
} from 'firebase/firestore';
import {db} from '../firebase';

export const Jar: Component = () => {
  effect(() => {
    const entries = sortedEntries[0]();

    if (entries) {
      setTotal(entries.length);
      setTotalByUserId(() => {
        const next: Record<string, number> = {};

        entries.forEach(({userId}) => {
          next[userId] = (next[userId] || 0) + 1;
        });

        return next;
      });
    }
  });

  const deposit = async () => {
    const users = usersById[0]()!;
    const userId = selectedUserId()!;

    try {
      await runTransaction(db, async (transaction) => {
        const entryRef = doc(collection(jarRef(), 'entries'));

        await transaction.set(entryRef, {
          user: users[userId].ref,
          created: serverTimestamp(),
        });
      });

      sortedEntries[1].refetch();
    } catch (error) {
      console.error('I fucked up deposit', error);
    }
  };

  return (
    <>
      <UserSelect />
      <Piggy onDeposit={deposit} total={total()} />
    </>
  );
};
