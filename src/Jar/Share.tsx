import {IconCopy, IconCopyCheckFilled} from '@tabler/icons-solidjs';
import {Component, createSignal, JSX} from 'solid-js';
import {Button} from './Button';
import {vars} from '@/css';

type Props = {};

const style: JSX.CSSProperties = {
  position: 'absolute',
  bottom: vars.gap,
  right: vars.gap,
};

export const Share: Component<Props> = () => {
  const [shared, setShared] = createSignal(false);
  let interval: number;

  const share = () => {
    clearTimeout(interval);

    navigator.clipboard.writeText(window.location.href);
    setShared(true);

    interval = window.setTimeout(() => {
      setShared(false);
    }, 2000);
  };

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearTimeout(interval);
      setShared(false);
    }
  });

  const icon = () => {
    if (shared()) {
      return IconCopyCheckFilled;
    }

    return IconCopy;
  };

  return <Button onPointerDown={share} icon={icon()} style={style} />;
};
