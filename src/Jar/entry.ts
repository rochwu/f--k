import {Entry, UsersById} from '@/signals/store';

export const entry = (args: {entry: Entry; users: UsersById}) => {
  const {created, userId} = args.entry;
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
    ? `${raw.toLocaleDateString(undefined, options)}`
    : undefined;
  const time = raw.toLocaleTimeString();
  const who = args.users[userId].data.name;

  return {
    who,
    date,
    time,
  };
};
