import React, {
    createContext,
    useState,
    useContext,
    useEffect,
} from "react";
import firestore from '@react-native-firebase/firestore';

import { useSignIn } from "../public/signin";
import { PrivateProfileConsumer, PrivateProfileConsumerCollection } from "../../types/firestore/consumer/PrivateProfileConsumer";
import { firebaseErrorHandler } from "../../utils/auth/firebaseErrorHandler";
import { City } from "../../types/firestore/localization/City";

interface ProfileContextData {
    loading: boolean;
    error: boolean;
    data: PrivateProfileConsumer | null;

    load(): Promise<void>;
}

const ProfileContext = createContext<ProfileContextData>({} as ProfileContextData);

const ProfileProvider: React.FC = ({ children }) => {
    const { user } = useSignIn();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState<PrivateProfileConsumer | null>(null);

    async function load(): Promise<void> {
        setError(false);
        setLoading(true);

        try {
            const privateProfileConsumer = (await firestore().
                collection(PrivateProfileConsumerCollection).doc(user?.uid).get()).data() as PrivateProfileConsumer;
            const city = (await privateProfileConsumer.City.get()).data() as City;
            privateProfileConsumer._city = city;
            setData(privateProfileConsumer);
        } catch (error) {
            firebaseErrorHandler(error);
            setError(true);
        }

        setLoading(false);
    }

    useEffect(() => {
        if (user?.uid) {
            load();
        }
    }, [user?.uid]);

    return (
        <ProfileContext.Provider
            value={{
                data, error, loading,
                load
            }}
        >
            {children}
        </ProfileContext.Provider>
    );
};

function useProfile(): ProfileContextData {
    const context = useContext(ProfileContext);

    if (!context) {
        throw new Error("useProfile must be used within an ProfileContext");
    }

    return context;
}

export { ProfileProvider, useProfile };