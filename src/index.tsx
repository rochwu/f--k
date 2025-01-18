/* @refresh reload */
import {render} from 'solid-js/web';

import {App} from './App';

document.addEventListener(
  'contextmenu',
  (e) => {
    e.preventDefault();
  },
  {passive: false},
);

// Stops magnifying glass on double tap + move
// Stops "Share..." prompt from showing up
document.addEventListener(
  'touchend',
  (e) => {
    // e.preventDefault();
  },
  {passive: false},
);

const root = document.getElementById('root');

render(() => <App />, root!);
