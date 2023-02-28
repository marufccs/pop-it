import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth';
import app from '../../Firebase/firebase.init';

export const AuthContext = createContext();

const UserContext = ({children}) => {

    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [user, setUser] = useState('');
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

        //sign up a new user
        const signInNewUser = (email, password) => {
            setLoading(true);
            return createUserWithEmailAndPassword(auth, email, password)
        }

            //update a user
    const updateUser = (userInfo) =>{
        // setLoading(true);
        return updateProfile(auth.currentUser, userInfo);
    }

        //sign in a user
        const signInUser = (email, password) => {
            setLoading(true);
            return signInWithEmailAndPassword(auth, email, password)
        }

            //sign in with Google
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider)
    }

    //log out the user
    const logOut = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false)
        })
        return () => {
            unsubscribe();
        }
    },[])


    const authInfo = {signInNewUser, updateUser, signInUser, signInWithGoogle, user, logOut, loading, users, setUsers, contents, setContents};

    return (
        <div>
                        <AuthContext.Provider value={authInfo}>
        {children}
            </AuthContext.Provider>
        </div>
    );
};

export default UserContext;