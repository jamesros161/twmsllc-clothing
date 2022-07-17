import { initializeApp } from 'firebase/app';
import { 
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCZ2ZDwk52LpjS7xiBh88huWupNWNmznSY",
    authDomain: "twmsllc-clothing.firebaseapp.com",
    projectId: "twmsllc-clothing",
    storageBucket: "twmsllc-clothing.appspot.com",
    messagingSenderId: "502714861228",
    appId: "1:502714861228:web:927b717732116eaa9a4109"
  };
  
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup( auth, provider );

export const db = getFirestore();

export const createUserDocumentFromAuth = async ( userAuth ) => {
    const userDocRef = doc( db, 'users', userAuth.uid );

    console.log( userDocRef );

    const userSnapshot = await getDoc( userDocRef );

    console.log( userSnapshot.exists() );
}