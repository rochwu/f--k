import {vars} from '@/css';
import {sortedEntries, usersById} from '@/signals/store';
import {Component, For} from 'solid-js';
import {styled} from 'solid-styled-components';
import {entry} from '../entry';
import {Item} from './Item';
import {IconArrowBarToDown} from '@tabler/icons-solidjs';

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
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const List: Component<Props> = () => {
  const lastFive = () => {
    const users = usersById[0]();

    return sortedEntries[0]()
      ?.slice(-5)
      ?.map((thing) => {
        // If there's an entry, then users should be defined
        return {...entry({entry: thing, users: users!}), ref: thing.ref};
      });
  };

  return (
    <Container>
      <For each={lastFive()}>{(thing) => <Item {...thing} />}</For>
      <Hint>
        <IconArrowBarToDown color={vars.progress} />
      </Hint>
    </Container>
  );
};
