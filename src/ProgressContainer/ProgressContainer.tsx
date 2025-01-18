import {JSXElement, type Component} from 'solid-js';
import {styled} from 'solid-styled-components';
import {vars} from '../css';
import {held} from '../signals/send';
import {holdTimeMs} from '../constants';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',

  // Small tablet
  maxHeight: '900px',
  maxWidth: '600px',
  height: '100%',
  width: '100%',

  padding: vars.gap,
  boxSizing: 'border-box',

  backgroundImage: `linear-gradient(to top, ${vars.progress} 50%, transparent 50%)`,
  backgroundSize: '100% 200%',
});

type Props = {
  children: JSXElement;
};

const style = () => {
  if (held()) {
    return {
      'background-position-y': '100%',
      transition: `background-position-y ${holdTimeMs}ms linear`,
    };
  }

  return {
    'background-position-y': '0%',
  };
};

export const ProgressContainer: Component<Props> = (props) => {
  return <Container style={style()}>{props.children}</Container>;
};
