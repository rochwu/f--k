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
import {jar} from './jar';
import {Piggy} from './Piggy';
import {GlobalStyles, vars} from './css';

// Demo, temp
const id = 'NpuEuBD1EeMXweyq0UlD';
const jarRef = doc(db, 'jars', jar() || id);

const Button = styled('button')({
  padding: '1rem',
  margin: '1rem',
  fontSize: '1.5rem',
});

const [activeUser, setActiveUser] = createSignal('');

const [entries, {refetch}] = createResource(async () => {
  const entries = await getDocs(collection(jarRef, 'entries'));

  const entriesByUser: Record<string, number> = {};
  let total = 0;

  entries.forEach((entry) => {
    const user = entry.data().user;
    entriesByUser[user] = (entriesByUser[user] || 0) + 1;
    total = total + 1;
  });

  return {total, users: entriesByUser};
});

const total = () => entries()?.total || 0;
const users = (user: string) => `${user} (${entries()?.users[user] || 0})`;

const Send: Component<{user: string}> = (props) => {
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
        refetch();
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
      <Button onClick={unlock}>{users(props.user)}</Button>
    </Show>
  );
};

const Background = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100dvh',
  width: '100dvw',
  backgroundColor: vars.background,
});

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  // Small tablet
  maxHeight: '900px',
  maxWidth: '600px',
  height: '100%',
  width: '100%',
});

export const App: Component = () => {
  return (
    <>
      <GlobalStyles />
      <Background>
        <Container>
          <Send user="Rolando" />
          <Send user="Miki" />
          <Piggy onDeposit={() => {}} total={total()} />
        </Container>
      </Background>
    </>
  );
};
