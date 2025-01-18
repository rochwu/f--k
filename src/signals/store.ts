import {
  collection,
  doc,
  DocumentReference,
  getDocs,
  orderBy,
  query,
  Timestamp,
} from 'firebase/firestore';
import {createResource, createSignal} from 'solid-js';
import {db} from '../firebase';
import {setSelectedUserId} from './send';

export const [jar] = createSignal(
  new URL(window.location.href).searchParams.get('where') || '',
);

export const jarRef = () => doc(db, 'jars', jar());

type User = {
  name: string;
};

export type UsersById = Record<
  string,
  {ref: DocumentReference; id: string; data: User}
>;

export const usersById = createResource(async () => {
  const usersById: UsersById = {};

  const users = await getDocs(collection(jarRef(), 'users'));

  const who = new URL(window.location.href).searchParams.get('who');

  users.forEach((user) => {
    const data = user.data() as User;

    usersById[user.id] = {
      ref: user.ref,
      id: user.id,
      data,
    };

    if (who && who === data.name) {
      setSelectedUserId(user.id);
    }
  });

  return usersById;
});

export type Entry = {
  userId: string;
  created: Timestamp;
};

export const sortedEntries = createResource(async () => {
  const entries = await getDocs(
    query(collection(jarRef(), 'entries'), orderBy('created')),
  );

  const sortedEntries: Entry[] = [];

  entries.forEach((entry) => {
    const {user, created} = entry.data();

    sortedEntries.push({
      userId: user.id,
      created,
    });
  });

  return sortedEntries;
});

export const [total, setTotal] = createSignal(0);
export const [totalByUserId, setTotalByUserId] = createSignal<
  Record<string, number>
>({});
