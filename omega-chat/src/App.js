import Button from './Button'; 
// Firebase deps
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import React, { useState, useEffect } from 'react'; 
import Channel from './Channel'
import "./App.css";


firebase.initializeApp({
  apiKey: "AIzaSyBndyPZU5w8muqNVHeNnz0HJmym2IFw720",
  authDomain: "omega-chat-ca96c.firebaseapp.com",
  projectId: "omega-chat-ca96c",
  storageBucket: "omega-chat-ca96c.appspot.com",
  messagingSenderId: "959438293435",
  appId: "1:959438293435:web:314ca38a7b0143e79cdc9e",
  measurementId: "G-Y06C1PGV1Y"
})

const auth = firebase.auth()
const db = firebase.firestore()

function App() {
  const [user, setUser] = useState(() => auth.currentUser)
  const [initializing, setInitializing] = useState(true); 

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user); 
      } else {
        setUser(null); 
      }
      if (initializing) {
        setInitializing(false);
      }
    });
    return unsubscribe; 
  }, [])
  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider(); 
    auth.useDeviceLanguage(); 
    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.error(error); 
    }
  }; 

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error.message)
    }
  }

  if (initializing) return "Loading..."; 

  return (
    <div>
      {user ? (  <> <Button onClick={signOut}>Sign Out</Button> <Channel user={user} db={db} /> </> ) : ( <Button onClick={signInWithGoogle}>Sign in with Google</Button> )}
      
    </div>
  );
}

export default App;
