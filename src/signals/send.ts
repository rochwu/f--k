import {createSignal} from 'solid-js';

export const [held, setHeld] = createSignal(false);

export const [selectedUserId, setSelectedUserId] = createSignal<string>();
