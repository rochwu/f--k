import {createCssVars} from './createCssVars';

export const {vars, root} = createCssVars(
  {
    gap: '8px',
    background: '#fff8dc',
    progress: '#deb887',
    money: {
      color: '#2E8B57',
      fontSize: '48px',
    },
    fontFamily: '"Parkinsans", sans-serif',
  },
  (previous) => ({
    select: {
      fontSize: '32px',
      backgroundColor: 'white',
      color: 'black',
    },
    user: {
      total: {
        color: '#DC143C',
        backgroundColor: previous.background,
        size: '32px',
        fontSize: '16px',
      },
    },
  }),
);
