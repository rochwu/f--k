import {Component, Show} from 'solid-js';
import {styled} from 'solid-styled-components';
import {Entry, sortedEntries, usersById} from '../signals/store';
import {vars} from '../css';

const Container = styled('div')({
  position: 'absolute',
  bottom: 0,
  color: vars.progress,
});

const Content: Component<{entries: Entry[]}> = (props) => {
  const last = () => props.entries.at(-1)!;

  const users = () => usersById[0]()!;

  const text = () => {
    const {created, userId} = last();
    const raw = created.toDate();
    const today = new Date();

    const options: Intl.DateTimeFormatOptions = {};

    let differs = false;

    if (raw.getFullYear() !== today.getFullYear()) {
      options.year = 'numeric';
      differs = true;
    }

    if (
      raw.getDate() !== today.getDate() ||
      raw.getMonth() !== today.getMonth()
    ) {
      options.day = 'numeric';
      options.month = 'numeric';
      differs = true;
    }

    const date = differs
      ? `${raw.toLocaleDateString(undefined, options)} `
      : '';
    const time = raw.toLocaleTimeString();
    const who = users()[userId].data.name;

    return `${who} - ${date}${time}`;
  };

  return <Container>{text()}</Container>;
};

export const Last = () => {
  const entries = () => sortedEntries[0]();

  return (
    <Show when={entries()}>
      {(entries) => {
        return <Content entries={entries()} />;
      }}
    </Show>
  );
};
