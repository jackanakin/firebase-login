import React, {
    createContext,
    useState,
    useContext,
} from "react";
import firestore from '@react-native-firebase/firestore';

import { firebaseErrorHandler } from "../../utils/auth/firebaseErrorHandler";
import { PublicProfileProvider, PublicProfileProviderCollection } from "../../types/firestore/provider/PublicProfileProvider";

interface LookupForProvidersContextData {
    loading: boolean;
    error: boolean;
    data: PublicProfileProvider[];

    load(): Promise<void>;
}

const LookupForProvidersContext = createContext<LookupForProvidersContextData>({} as LookupForProvidersContextData);

const LookupForProvidersProvider: React.FC = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState<PublicProfileProvider[]>([]);

    async function load(): Promise<void> {
        setError(false);
        setLoading(true);

        try {
            const providersCollection = (await firestore().collection(PublicProfileProviderCollection)
                .get()).docs.map(doc => doc.data()) as PublicProfileProvider[];
            setData(providersCollection);
        } catch (error) {
            firebaseErrorHandler(error);
            setError(true);
        }

        setLoading(false);
    }

    return (
        <LookupForProvidersContext.Provider
            value={{
                data, error, loading, load
            }}
        >
            {children}
        </LookupForProvidersContext.Provider>
    );
};

function useLookupForProviders(): LookupForProvidersContextData {
    const context = useContext(LookupForProvidersContext);

    if (!context) {
        throw new Error("useLookupForProviders must be used within an LookupForProvidersContext");
    }

    return context;
}

export { LookupForProvidersProvider, useLookupForProviders };