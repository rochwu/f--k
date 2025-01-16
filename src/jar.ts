import {createSignal} from 'solid-js';

export const [jar] = createSignal(
  new URL(window.location.href).searchParams.get('where'),
);
