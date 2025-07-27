import {vars} from '@/css';
import {sortedEntries, usersById} from '@/signals/store';
import {Component, For} from 'solid-js';
import {styled} from 'solid-styled-components';
import {entry} from '../entry';
import {Item} from './Item';

type Props = {};

const Container = styled('div')({
  display: 'flex',
  width: '100%',
  height: '100%',
  flexDirection: 'column',
  boxSizing: 'border-box',
  padding: vars.gap,
  gap: vars.gap,
});

const Hint = styled('div')({
  color: vars.progress,
  textAlign: 'center',
});

export const List: Component<Props> = () => {
  const entries = () => {
    const lastFive = sortedEntries[0]()?.slice(-5);

    const users = usersById[0]();

    return lastFive?.map((thing) => {
      // If there's an entry, then users should be defined
      return {...entry({entry: thing, users: users!}), ref: thing.ref};
    });
  };

  return (
    <Container>
      <For each={entries()}>{(thing) => <Item {...thing} />}</For>
      <Hint>Last</Hint>
    </Container>
  );
};
