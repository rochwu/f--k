import {Component, Show} from 'solid-js';
import {styled} from 'solid-styled-components';
import {Entry, sortedEntries, usersById} from '@/signals/store';
import {vars} from '@/css';
import {entry} from '../entry';

const Container = styled('div')({
  position: 'absolute',
  bottom: 0,
  color: vars.progress,
});

const Content: Component<{entries: Entry[]}> = (props) => {
  const last = () => props.entries.at(-1)!;

  const users = () => usersById[0]()!;

  const text = () => {
    const {who, date, time} = entry({entry: last(), users: users()});

    return `${who} - ${date ? date + ' ' : ''}${time}`;
  };

  return <Container>{text()}</Container>;
};

export const Last = () => {
  const entries = () => {
    const entries = sortedEntries[0]();

    return (entries?.length ?? 0 > 0) ? entries : undefined;
  };

  return (
    <Show when={entries()}>
      {(entries) => {
        return <Content entries={entries()} />;
      }}
    </Show>
  );
};
