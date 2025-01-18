import {Show, type Component} from 'solid-js';
import {styled} from 'solid-styled-components';
import {GlobalStyles, vars} from './css';
import {Jar} from './Jar';
import {ProgressContainer} from './ProgressContainer';
import {jar, sortedEntries, usersById} from './signals/store';

const Background = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100dvh',
  width: '100dvw',
  backgroundColor: vars.background,
});

export const App: Component = () => {
  const show = () => {
    if (jar()) {
      const {state} = sortedEntries[0];

      return state === 'ready' && state === usersById[0].state;
    }

    return false;
  };

  return (
    <>
      <GlobalStyles />
      <Background>
        <ProgressContainer>
          <Show when={show()}>
            <Jar />
          </Show>
        </ProgressContainer>
      </Background>
    </>
  );
};
