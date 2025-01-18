import {createSignal} from 'solid-js';

export enum Mode {
  Deposit,
}

export const [mode, setMode] = createSignal(Mode.Deposit);
