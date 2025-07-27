import {Component} from 'solid-js';
import {styled} from 'solid-styled-components';

import {totalByUserId, UsersById} from '@/signals/store';
import {vars} from '@/css';

const Container = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
});

const Name = styled('div')({
  color: vars.interactive.selection,
});

const Total = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: vars.money.color,
  height: vars.user.total.size,
  fontSize: vars.user.total.fontSize,
});

export const Label: Component<{user: UsersById[string]}> = (props) => {
  return (
    <Container>
      <Name>{props.user.data.name}</Name>
      <Total>{`$${totalByUserId()[props.user.id] ?? 0}`}</Total>
    </Container>
  );
};
