import {Mode, setMode} from './meta';
import {sortedEntries} from './store';

export const reload = () => {
  sortedEntries[1].refetch();
  setMode(Mode.Deposit);
};
