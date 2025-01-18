import {createGlobalStyles} from 'solid-styled-components';
import {root, vars} from './css';

import 'normalize.css';

export const GlobalStyles = createGlobalStyles({
  ':root': root,

  body: {
    fontFamily: vars.fontFamily,
    userSelect: 'none',
    '-webkit-user-select': 'none', // Safari
    overscrollBehavior: 'none',
    touchAction: 'none',
  },
});
