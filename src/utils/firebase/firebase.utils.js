import { initializeApp } from 'firebase/app'
import { getAuth,signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBNaIRgbDHFCNWsLo6MW-qJN_x6ZdkCnWI",
  authDomain: "crwn-clothing-db-73a76.firebaseapp.com",
  projectId: "crwn-clothing-db-73a76",
  storageBucket: "crwn-clothing-db-73a76.appspot.com",
  messagingSenderId: "700973286814",
  appId: "1:700973286814:web:7f97c51f7362fb75b4828f"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)
  console.log(userDocRef)

  const userSnapshot = await getDoc(userDocRef)
  console.log(userSnapshot)
  console.log(userSnapshot.exists())

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch (error) {
      console.log('error creating the user', error.message)
    }
  }
  
  return userDocRef
}