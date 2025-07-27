import {vars} from '@/css';
import {styled} from 'solid-styled-components';

const Component = styled('div')({
  display: 'flex',
  width: '100%',
  textAlign: 'start',
  color: vars.interactive.hint,
});

export const Placeholder = () => {
  return <Component>???</Component>;
};
