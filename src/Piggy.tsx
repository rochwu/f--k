import {type Component} from 'solid-js';
import {styled} from 'solid-styled-components';
import {vars} from './css';

const Container = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  userSelect: 'none',
  '-webkit-user-select': 'none', // Safari
});

const size = '50%';

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
});

const Text = styled('div')({
  position: 'absolute',
  bottom: 0,
  color: vars.money,
  fontSize: '2rem',
});

type Props = {
  total: number;
  onDeposit: () => void;
};

export const Piggy: Component<Props> = (props) => {
  return (
    <Container>
      <Image>
        <Text>${props.total}</Text>
      </Image>
    </Container>
  );
};
