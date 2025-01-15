import {
  collection,
  doc,
  getDocs,
  runTransaction,
  serverTimestamp,
} from 'firebase/firestore';
import {createResource, createSignal, Show, type Component} from 'solid-js';
import {styled} from 'solid-styled-components';
import {db} from './firebase';
import {effect} from 'solid-js/web';

// Demo, temp
const id = 'NpuEuBD1EeMXweyq0UlD';
const jarRef = doc(db, 'jars', id);

const Button = styled('button')({
  padding: '1rem',
  margin: '1rem',
  fontSize: '1.5rem',
});

const [activeUser, setActiveUser] = createSignal('');

const Send: Component<{user: string; children: string}> = (props) => {
  const unlock = () => {
    setActiveUser(props.user);
  };

  const lock = () => {
    setActiveUser('');
  };

  const increment = async () => {
    const entryRef = doc(collection(jarRef, 'entries'));

    runTransaction(db, async (transaction) => {
      transaction.set(entryRef, {
        user: props.user,
        time: serverTimestamp(),
      });
    })
      .then(() => {
        lock();
      })
      .catch(() => {
        alert('Shit');
      });
  };

  const same = () => {
    return activeUser() !== props.user;
  };

  return (
    <Show
      when={same()}
      fallback={
        <Button onClick={increment} onBlur={lock}>
          Sure?
        </Button>
      }
    >
      <Button onClick={unlock}>{props.children}</Button>
    </Show>
  );
};

export const App: Component = () => {
  const [total] = createResource(async () => {
    const entries = await getDocs(collection(jarRef, 'entries'));

    return entries.size;
  });

  return (
    <div>
      <div>Total: {total()}</div>
      <Send user="R">Rolls</Send>
      <Send user="M">Em</Send>
    </div>
  );
};
