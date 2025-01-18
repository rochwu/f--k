import {type Component} from 'solid-js';
import {styled} from 'solid-styled-components';
import {Piggy} from './Piggy';
import {Total} from './Total';
import {usePress} from './usePress';
import {Last} from './Last';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',

  height: '100%',
  width: '100%',
});

type Props = {};

export const Press: Component<Props> = () => {
  const {start, end} = usePress();

  return (
    <Container
      onPointerDown={start}
      onPointerUp={end}
      // Needed to prevent not `end` not called when pull-to-refresh triggers on drag
      onPointerCancel={end}
    >
      <Piggy>
        <Total />
      </Piggy>
      <Last />
    </Container>
  );
};
