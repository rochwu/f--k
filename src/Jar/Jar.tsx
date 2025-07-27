import {Component, Match, Switch} from 'solid-js';
import {effect} from 'solid-js/web';
import {
  highestUserIds,
  setHighestUserIds,
  setTotal,
  setTotalByUserId,
  sortedEntries,
} from '@/signals/store';
import {Deposit} from './Deposit';
import {Mode, mode} from '@/signals/meta';
import {List} from './List';
import {Go} from './Go';
import {styled} from 'solid-styled-components';
import {Share} from './Share';

const Container = styled('div')({
  height: '100%',
  width: '100%',
  position: 'relative',

  // Small tablet
  maxHeight: '900px',
  maxWidth: '600px',
});

export const Jar: Component = () => {
  // On DB load, tally
  effect(() => {
    const entries = sortedEntries[0]();

    if (entries) {
      setTotal(entries.length);

      const totals: Record<string, number> = {};
      let topScore = 0;

      entries.forEach(({userId}) => {
        const next = (totals[userId] || 0) + 1;

        totals[userId] = (totals[userId] || 0) + 1;

        if (next > topScore) {
          topScore = next;
        }
      });

      setTotalByUserId(totals);

      if (topScore > 0) {
        setHighestUserIds(
          Object.entries(totals).reduce<ReturnType<typeof highestUserIds>>(
            (ids, [id, entries]) => {
              if (entries === topScore) {
                ids[id] = true;
              }

              return ids;
            },
            {},
          ),
        );
      }
    }
  });

  return (
    <Container>
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
      <Share />
    </Container>
  );
};
