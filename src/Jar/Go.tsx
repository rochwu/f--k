import {Mode, setMode} from '@/signals/meta';
import {IconCoin, IconDotsCircleHorizontal} from '@tabler/icons-solidjs';
import {Component, JSX, Match, Switch} from 'solid-js';
import {Button} from './Button';
import {vars} from '@/css';

type Props = {
  mode: Mode;
};

const style: JSX.CSSProperties = {
  position: 'absolute',
  bottom: vars.gap,
  left: vars.gap,
};

/**
 * Decide to make `Go` with a mode so that the transition of state is clearer
 * One can only go from a specific mode to another
 */
export const Go: Component<Props> = (props) => {
  const set = () => {
    setMode(props.mode);
  };

  const mode = () => {
    switch (props.mode) {
      case Mode.List:
        return IconDotsCircleHorizontal;
      case Mode.Deposit:
      default:
        return IconCoin;
    }
  };

  return <Button onPointerDown={set} icon={mode()} style={style} />;
};
