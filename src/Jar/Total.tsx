import {styled} from 'solid-styled-components';
import {vars} from '../css';
import {total} from '../signals/store';

const Text = styled('div')({
  position: 'absolute',
  bottom: 0,
  color: vars.money.color,
  fontSize: vars.money.fontSize,
});

export const Total = () => {
  return <Text>${total()}</Text>;
};
