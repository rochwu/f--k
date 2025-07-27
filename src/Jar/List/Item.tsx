import {vars} from '@/css';
import {
  IconProps,
  IconTrashOff,
  IconTrashX,
  IconTrashXFilled,
} from '@tabler/icons-solidjs';
import {DocumentReference} from 'firebase/firestore';
import {Component, createSignal, Show} from 'solid-js';
import {Dynamic} from 'solid-js/web';
import {styled} from 'solid-styled-components';
import {entry} from '../entry';
import {remove} from './remove';

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

const Start = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const End = styled('div')({
  display: 'flex',
  gap: vars.gap,
});

const Button = styled('button')({
  all: 'unset',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  height: vars.buttonSize,
  aspectRatio: '1',
});

const iconSize = '32px';

const iconProps: IconProps = {
  size: iconSize, // The way Icon uses size doesn't really work with CSS vars
  color: vars.delete,
};

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

  const style = () => {
    if (unlocked()) {
      return {
        outline: `2px solid ${vars.delete}`,
      };
    }
  };

  return (
    <Container style={style()}>
      <Start>
        <Name>{props.who}</Name>
        <DateTime>{`${props.date ? props.date + ' ' : ''}${props.time}`}</DateTime>
      </Start>
      <End>
        <Button onClick={click} onFocusOut={lock}>
          <Dynamic
            component={unlocked() ? IconTrashXFilled : IconTrashX}
            {...iconProps}
          />
        </Button>
        <Show when={unlocked()}>
          <Button onClick={lock}>
            <IconTrashOff size={iconSize} />
          </Button>
        </Show>
      </End>
    </Container>
  );
};
