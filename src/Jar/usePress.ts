import {holdTimeMs} from '../constants';
import {selectedUserId, setHeld} from '../signals/send';
import {send} from './send';

export const usePress = () => {
  let ref = 0;
  let startTime = 0;

  const end = () => {
    clearInterval(ref);
    setHeld(false);
  };

  const start = () => {
    if (!selectedUserId()) {
      return;
    }

    startTime = Date.now();
    setHeld(true);

    ref = window.setTimeout(() => {
      window.setTimeout(() => {
        end();
        send();
        // Just an gap between 100% filled
      }, 100);
    }, holdTimeMs);
  };

  return {start, end};
};
