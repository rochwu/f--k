import {Component, Match, Switch} from 'solid-js';
import {effect} from 'solid-js/web';
import {setTotal, setTotalByUserId, sortedEntries} from '@/signals/store';
import {Deposit} from './Deposit';
import {Mode, mode} from '@/signals/meta';
import {List} from './List';
import {Go} from './Go';

export const Jar: Component = () => {
  effect(() => {
    const entries = sortedEntries[0]();

    if (entries) {
      setTotal(entries.length);
      setTotalByUserId(() => {
        const next: Record<string, number> = {};

        entries.forEach(({userId}) => {
          next[userId] = (next[userId] || 0) + 1;
        });

        return next;
      });
    }
  });

  return (
    <Switch>
      <Match when={mode() === Mode.Deposit}>
        <Deposit />
        <Go mode={Mode.List} />
      </Match>
      <Match when={mode() === Mode.List}>
        <List />
        <Go mode={Mode.Deposit} />
      </Match>
    </Switch>
  );
};
