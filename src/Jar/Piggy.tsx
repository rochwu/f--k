import {type Component} from 'solid-js';
import {styled} from 'solid-styled-components';
import {vars} from '../css';
import {holdTimeMs} from '../constants';
import {selectedUserId, setHeld} from '../signals/send';

const Container = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
});

const size = '65%';

const Image = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  height: size,
  width: size,
  backgroundImage: 'url("/f--k/Piggy.png")',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  backgroundPosition: 'center',

  pointerEvents: 'none', // Prevent iOS Safari double tap to zoom
});

const Text = styled('div')({
  position: 'absolute',
  bottom: 0,
  color: vars.money.color,
  fontSize: vars.money.fontSize,
});

type Props = {
  total: number;
  onDeposit: () => void;
};

// Chrome responsive triggered context menu on hold
const preventDefault = (e: Event) => {
  e.preventDefault();
};

export const Piggy: Component<Props> = (props) => {
  let ref = 0;
  let startTime = 0;

  const end = () => {
    clearInterval(ref);
    setHeld(false);
  };

  const start = () => {
    if (!selectedUserId()) {
      return;
    }

    startTime = Date.now();
    setHeld(true);

    ref = window.setTimeout(() => {
      window.setTimeout(() => {
        end();
        props.onDeposit();
        // Just an gap between 100% filled
      }, 100);
    }, holdTimeMs);
  };

  return (
    <Container
      onPointerDown={start}
      onPointerUp={end}
      // Needed to prevent not `end` not called when pull-to-refresh triggers on drag
      onPointerCancel={end}
      onContextMenu={preventDefault}
    >
      <Image>
        <Text>${props.total}</Text>
      </Image>
    </Container>
  );
};
