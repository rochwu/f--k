import {Component} from 'solid-js';
import {effect} from 'solid-js/web';
import {setTotal, setTotalByUserId, sortedEntries} from '../signals/store';
import {Deposit} from './Deposit';

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
    <>
      <Deposit />
    </>
  );
};
