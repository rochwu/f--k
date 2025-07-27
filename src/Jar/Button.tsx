import {vars} from '@/css';
import {IconCopy, IconProps} from '@tabler/icons-solidjs';
import {Component, JSX} from 'solid-js';
import {Dynamic} from 'solid-js/web';
import {styled} from 'solid-styled-components';

type Props = {
  onPointerDown: JSX.CustomEventHandlersCamelCase<HTMLButtonElement>['onPointerDown'];
  icon: typeof IconCopy;
  style?: JSX.CSSProperties;
};

const Container = styled('button')({
  all: 'unset',
  cursor: 'pointer',
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

export const Button: Component<Props> = (props) => {
  return (
    <Container onPointerDown={props.onPointerDown} style={props.style}>
      <Dynamic component={props.icon} {...iconProps} />
    </Container>
  );
};
