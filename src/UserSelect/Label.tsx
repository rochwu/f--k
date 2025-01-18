export const Option = () => {};

import {styled} from 'solid-styled-components';

import {totalByUserId, UsersById} from '../signals/store';
import {Component} from 'solid-js';
import {vars} from '../css';

const Container = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
});

const Name = styled('div')({
  color: vars.select.color,
});

const Total = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  // borderRadius: '8px',
  color: vars.money.color,
  // backgroundColor: vars.user.total.backgroundColor,
  // width: vars.user.total.size,
  height: vars.user.total.size,
  fontSize: vars.user.total.fontSize,
});

export const Label: Component<{user: UsersById[string]}> = (props) => {
  return (
    <Container>
      <Name>{props.user.data.name}</Name>
      <Total>{`$${totalByUserId()[props.user.id]}`}</Total>
    </Container>
  );
};
