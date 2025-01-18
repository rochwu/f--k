import {styled} from 'solid-styled-components';

const Component = styled('div')({
  display: 'flex',
  width: '100%',
  textAlign: 'start',
});

export const Placeholder = () => {
  return <Component>???</Component>;
};
