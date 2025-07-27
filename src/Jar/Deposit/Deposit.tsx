import {Component} from 'solid-js';
import {UserSelect} from './UserSelect';
import {Press} from './Press';
import {ProgressContainer} from './ProgressContainer';

export const Deposit: Component = () => {
  return (
    <ProgressContainer>
      <UserSelect />
      <Press />
    </ProgressContainer>
  );
};
