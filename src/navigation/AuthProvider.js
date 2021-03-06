import React, { createContext, useState } from 'react';
import { ToastAndroid } from "react-native";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

/**
 * This provider is created
 * to access user in whole app
 */

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: (email, password) => {
          auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
              const uid = response.user.uid;
              const usersRef = firestore().collection('users');
              usersRef
                .doc(uid)
                .get()
                .then(firestoreDocument => {
                  if (!firestoreDocument.exists) {
                    alert("User does not exist anymore.")
                    return;
                  }
                })
                .catch(error => {
                  alert(error)
                });
            })
            .catch(error => {
              alert(error);
            });
          ToastAndroid.show("Welcome back!", ToastAndroid.SHORT);
        },
        register: (email, password, confirmPassword, name) => {
          if (password !== confirmPassword) {
            alert("Passwords don't match.");
            return;
          }
          auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
              const update = {
                displayName: name,
                photoURL: 'https://i.stack.imgur.com/l60Hf.png',
              };
              auth().currentUser.updateProfile(update);
              const uid = response.user.uid;
              response.user.updateProfile
              const data = {
                _id: uid,
                name,
                avatar: 'https://i.stack.imgur.com/l60Hf.png',
                email
              };
              const usersRef = firestore().collection('users');
              usersRef
                .doc(uid)
                .set(data)
                .catch((error) => {
                  alert(error)
                });
              ToastAndroid.show("Register Successfully!", ToastAndroid.SHORT);
            })
            .catch((error) => {
              alert(error);
            });
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.error(e);
          }
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
