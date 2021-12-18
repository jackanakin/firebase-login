import React, {
    createContext,
    useState,
    useContext,
    useEffect,
} from "react";
import { Alert } from "react-native";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import {
    GoogleSignin
} from '@react-native-google-signin/google-signin';
import { firebase } from '@react-native-firebase/auth'

import { SignInCredentials } from "../../types/user/SignInCredentials";
import { webClientId } from "../../global/keys/googleSignInId";
import { firebaseErrorHandler } from "../../utils/auth/firebaseErrorHandler";
import DefaultProviderProps from "../../types/hooks/DefaultProviderProps";

interface SignInContextData {
    user: FirebaseAuthTypes.User | null;
    loading: boolean;

    signUpWithFirebase(password: string, passwordConfirm: string,
        email: string): Promise<void>;
    signInWithFirebase(credentials: SignInCredentials): Promise<void>;
    signInWithGoogle(): void;
    reloadFirebaseUser(): void;

    signOut(): Promise<void>;
}

const SignInContext = createContext<SignInContextData>({} as SignInContextData);

const SignInProvider: React.FC = ({ children }: DefaultProviderProps) => {
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
    const [loading, setLoading] = useState(false);

    const [dummyReload, setDummyReload] = useState(false);

    const signInWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const user = await GoogleSignin.signIn();
            const credential = firebase.auth.GoogleAuthProvider.credential(user.idToken);
            const userFirebase = await firebase.auth().signInWithCredential(credential);
            setUser(userFirebase.user);
        } catch (error) {
            firebaseErrorHandler(error);
        }
    };

    const signOut = async () => {
        try {
            signOutWithGoogle();
            signOutWithFirebase();
        } catch (error) {
            console.log(error);
            Alert.alert(String(error));
        }
    };

    const signOutWithGoogle = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
        } catch (error) {
        }
    };

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: webClientId
        });
    }, []);

    // Handle user state changes
    function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
        try {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        } catch (error) {
            firebaseErrorHandler(error);
        }
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, [dummyReload]);

    const reloadFirebaseUser = async () => {
        try {
            const user = auth().currentUser;
            if (user) {
                user.reload();
                setDummyReload(!dummyReload);
            }
        } catch (error) {
            firebaseErrorHandler(error);
        }
    };

    const signInWithFirebase = async ({ email, password }: SignInCredentials) => {
        try {
            setLoading(true);
            await auth().signInWithEmailAndPassword(email, password);
        } catch (error) {
            firebaseErrorHandler(error);
        }
        setLoading(false);
    };

    const signOutWithFirebase = async () => {
        try {
            await auth().signOut();
            setUser(null);
        } catch (error) {
            firebaseErrorHandler(error);
        }
    };

    const signUpWithFirebase = async (password: string, passwordConfirm: string,
        email: string): Promise<void> => {
        try {
            if (password !== passwordConfirm) {
                Alert.alert("Passwords not equal");
                return;
            } else {
                await auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(async (response) => {
                        response.user.sendEmailVerification();
                        Alert.alert('Sua conta foi criada, verifique seu e-mail e confirme o link');
                    });
            }
        } catch (error) {
            firebaseErrorHandler(error);
        }
    }

    return (
        <SignInContext.Provider
            value={{
                user, loading,
                signInWithFirebase, signInWithGoogle,
                signOut,
                reloadFirebaseUser, signUpWithFirebase
            }}
        >
            {children}
        </SignInContext.Provider>
    );
};

function useSignIn(): SignInContextData {
    const context = useContext(SignInContext);

    if (!context) {
        throw new Error("useSignIn must be used within an SignInProvider");
    }

    return context;
}

export { SignInProvider, useSignIn };