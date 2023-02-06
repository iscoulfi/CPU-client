import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCVg40hwJxPcl0E0NzS775T3bYCg64JnRA',
  authDomain: 'cpul-26b8f.firebaseapp.com',
  projectId: 'cpul-26b8f',
  storageBucket: 'cpul-26b8f.appspot.com',
  messagingSenderId: '415578133086',
  appId: '1:415578133086:web:f1389d8a7b5d7b26d99acf',
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
