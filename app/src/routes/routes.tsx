import React from "react";
import { ThemeProvider } from 'styled-components';

import { useGlobal } from "../hooks/public/global";
import { usePreferences } from "../hooks/public/preferences";
import { useSignIn } from "../hooks/public/signin";

import LoadingScreen from "../screens/public/LoadingScreen";
import LandingRoutes from "./public/landing.routes";
import SignInRoutes from "./public/signin.routes";
import HomeRoutes from "./private/home.routes";
import EmailUnverifiedRoutes from "./private/emailunverified.routes";

const Routes: React.FC = () => {
    const { loading: loadingPreferences, theme } = usePreferences();
    const { loading: loadingGlobal, showLandingScreen } = useGlobal();
    const { user } = useSignIn();

    let route = null;
    if (loadingPreferences || loadingGlobal) {
        route = <LoadingScreen />;
    } else if (showLandingScreen) {
        route = <LandingRoutes />;
    } else if (user && !user.emailVerified) {
        route = <EmailUnverifiedRoutes />;
    } else if (user) {
        route = <HomeRoutes />;
    } else {
        route = <SignInRoutes />
    }

    return <ThemeProvider theme={theme}>{route}</ThemeProvider >
};

export default Routes;