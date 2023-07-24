import * as firebase from 'firebase/app';
import 'firebase/firestore';

import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDGTifprgIlve5cYVIzs8RwOcUEWGOOPXg',
  authDomain: 'peniell-tech.firebaseapp.com',
  projectId: 'peniell-tech',
  storageBucket: 'peniell-tech.appspot.com',
  messagingSenderId: '1093858158369',
  appId: '1:1093858158369:web:9797aa5ca4ee6360004060',
  measurementId: 'G-JDGQF9PB86',
};

const app = firebase.initializeApp(firebaseConfig);

export default app;

export const db = getFirestore(app);
