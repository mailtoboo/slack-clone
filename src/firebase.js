import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyANheMkZ_fkFhr_cj0AOydavnVQBDkKuG4',
	authDomain: 'slack-clone-70c13.firebaseapp.com',
	projectId: 'slack-clone-70c13',
	storageBucket: 'slack-clone-70c13.appspot.com',
	messagingSenderId: '855562860345',
	appId: '1:855562860345:web:bd7518f6e6df7723b25ae8',
	measurementId: 'G-8SV83N26PK',
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
