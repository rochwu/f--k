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
    delete: '#DC143C',
  },
  (base) => ({
    interactive: {
      hint: base.progress,
      selection: 'black',
      background: 'white',
    },
    select: {
      fontSize: '32px',
    },
    user: {
      total: {
        backgroundColor: base.background,
        size: '32px',
        fontSize: '16px',
      },
    },
  }),
);
