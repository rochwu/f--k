import {Component} from 'solid-js';
import {UserSelect} from '../UserSelect';
import {Press} from './Press';

export const Deposit: Component = () => {
  return (
    <>
      <UserSelect />
      <Press />
    </>
  );
};
