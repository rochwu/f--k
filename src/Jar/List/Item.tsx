import {Component, createSignal, Match, Switch} from 'solid-js';
import {styled} from 'solid-styled-components';
import {entry} from '../entry';
import {vars} from '@/css';
import {IconTrashX, IconTrashXFilled} from '@tabler/icons-solidjs';
import {remove} from './remove';
import {DocumentReference} from 'firebase/firestore';

type Props = ReturnType<typeof entry> & {
  ref: DocumentReference;
};

const Container = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: vars.interactive.background,
  color: vars.interactive.selection,
  padding: vars.gap,
  borderRadius: '8px',
});

const Name = styled('div')({});

const DateTime = styled('div')({
  color: vars.interactive.hint,
});

const Start = styled('div')({});

const End = styled('button')({
  all: 'unset',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const Item: Component<Props> = (props) => {
  const [unlocked, setUnlocked] = createSignal(false);

  const finalize = () => {
    remove(props.ref);
  };

  const lock = () => {
    setUnlocked(false);
  };

  const unlock = () => {
    setUnlocked(true);
  };

  const click = () => {
    if (unlocked()) {
      finalize();
    } else {
      unlock();
    }
  };

  return (
    <Container>
      <Start>
        <Name>{props.who}</Name>
        <DateTime>{`${props.date ? props.date + ' ' : ''}${props.time}`}</DateTime>
      </Start>
      <End onFocusOut={lock} onClick={click}>
        <Switch>
          <Match when={unlocked() === false}>
            <IconTrashX color={vars.delete} />
          </Match>
          <Match when={unlocked() === true}>
            <IconTrashXFilled
              color={vars.delete}
              style={{transform: 'scale(1.25)'}}
            />
          </Match>
        </Switch>
      </End>
    </Container>
  );
};
