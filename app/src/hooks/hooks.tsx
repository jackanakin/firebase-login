import React from "react";

import { PreferencesProvider } from "./public/preferences";
import { GlobalProvider } from "./public/global";
import { SignInProvider } from "./public/signin";
import { ProfileProvider } from "./private/profile";
import { LookupForProvidersProvider } from "./private/lookupForProviders";

const HooksProvider: React.FC = ({ children }) => (
    <GlobalProvider>
        <PreferencesProvider>
            <SignInProvider>
                <ProfileProvider>
                    <LookupForProvidersProvider>
                        {children}
                    </LookupForProvidersProvider>
                </ProfileProvider>
            </SignInProvider>
        </PreferencesProvider>
    </GlobalProvider>
);

export default HooksProvider;