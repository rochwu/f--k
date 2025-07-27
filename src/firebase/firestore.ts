import {app} from './app';
import {connectFirestoreEmulator, getFirestore} from 'firebase/firestore';
import config from '../../firebase.json';

export const db = getFirestore(app);

if (import.meta.env.MODE !== 'production') {
  connectFirestoreEmulator(db, 'localhost', config.emulators.firestore.port);
}
