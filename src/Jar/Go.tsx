import {Mode, setMode} from '@/signals/meta';
import {Component, Match, Switch} from 'solid-js';
import {styled} from 'solid-styled-components';
import {
  IconProps,
  IconCoin,
  IconDotsCircleHorizontal,
} from '@tabler/icons-solidjs';
import {vars} from '@/css';

type Props = {
  mode: Mode;
};

const Container = styled('div')({
  position: 'absolute',
  bottom: vars.gap,
  left: vars.gap,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: vars.interactive.background,
  borderRadius: '50%',
  padding: '1px',
});

const iconProps: IconProps = {
  size: '2em',
  color: vars.interactive.hint,
};

/**
 * Decide to make `Go` with a mode so that the transition of state is clearer
 * One can only go from a specific mode to another
 */
export const Go: Component<Props> = (props) => {
  const click = () => {
    setMode(props.mode);
  };

  return (
    <Container onClick={click}>
      <Switch>
        <Match when={props.mode === Mode.Deposit}>
          <IconCoin {...iconProps} />
        </Match>
        <Match when={props.mode === Mode.List}>
          <IconDotsCircleHorizontal {...iconProps} />
        </Match>
      </Switch>
    </Container>
  );
};
