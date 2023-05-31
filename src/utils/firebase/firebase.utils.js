import { initializeApp } from 'firebase/app';
import { 
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
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

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ 
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup( auth, googleProvider );
export const signInWithGoogleRedirect = () => signInWithRedirect( auth, googleProvider );

export const db = getFirestore();

export const createUserDocumentFromAuth = async ( userAuth, additionalInformation = {} ) => {
    if( !userAuth ) return;

    const userDocRef = doc( db, 'users', userAuth.uid );

    const userSnapshot = await getDoc( userDocRef );

    //if user data does not exist, create user data and return userDocRef
    if ( ! userSnapshot.exists() ) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc( userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            } );
        } catch ( error ) {
            console.error( 'error creating user', error.message );
        }
    }

    return userDocRef;

}

export const createAuthUserWithEmailAndPassword = async ( email, password ) => {
    if (!email || !password ) return;

    return await createUserWithEmailAndPassword( auth, email, password );
}

export const signInWithEmail = async ( email, password ) => {
    if (!email || !password ) return;

    return await signInWithEmailAndPassword( auth, email, password );
}