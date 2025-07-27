import {createSignal} from 'solid-js';

export enum Mode {
  Deposit,
  List,
}

export const [mode, setMode] = createSignal(Mode.Deposit);
