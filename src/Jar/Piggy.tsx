import {styled} from 'solid-styled-components';

const size = '65%';

export const Piggy = styled('div')({
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
