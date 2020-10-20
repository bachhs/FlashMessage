import React, { createContext, useState } from 'react';
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
              const uid = response.user.uid
              const usersRef = firestore().collection('users')
              usersRef
                .doc(uid)
                .get()
                .then(firestoreDocument => {
                  if (!firestoreDocument.exists) {
                    alert("User does not exist anymore.")
                    return;
                  }
                  const user = firestoreDocument.data()
                })
                .catch(error => {
                  alert(error)
                });
            })
            .catch(error => {
              alert(error)
            })
        },
        register: (email, password, confirmPassword, name) => {
          if (password !== confirmPassword) {
            alert("Passwords don't match.")
            return
          }
          auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
              const uid = response.user.uid
              const data = {
                _id: uid,
                name,
                avatar: 'https://i.pinimg.com/originals/b9/58/2d/b9582d806f57b4d8aab0655759d3cb34.jpg',
                email,
                birthDay: firestore.Timestamp.now(),
              };
              const usersRef = firestore().collection('users')
              usersRef
                .doc(uid)
                .set(data)
                .catch((error) => {
                  alert(error)
                });
            })
            .catch((error) => {
              alert(error)
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
