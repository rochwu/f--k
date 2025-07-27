import {Component, Show} from 'solid-js';
import {styled} from 'solid-styled-components';

import {vars} from '@/css';
import {highestUserIds, totalByUserId, UsersById} from '@/signals/store';
import {IconCrown} from '@tabler/icons-solidjs';

const Container = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
});

const Name = styled('div')({
  display: 'flex',
  gap: vars.gap,
  color: vars.interactive.selection,
});

const Total = styled('div')({
  display: 'flex',
  gap: vars.gap,
});

const Score = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: vars.money.color,
  fontSize: vars.user.total.fontSize,
});

const TopScorer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const Label: Component<{user: UsersById[string]}> = (props) => {
  const isHighScore = () => {
    return props.user.id in highestUserIds();
  };

  return (
    <Container>
      <Name>{props.user.data.name}</Name>
      <Total>
        <Show when={isHighScore()}>
          <TopScorer>
            <IconCrown color="gold" />
          </TopScorer>
        </Show>
        <Score>${totalByUserId()[props.user.id] ?? 0}</Score>
      </Total>
    </Container>
  );
};
