import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LandingRoutesTS } from "../_ts/LandingRoutesTS";

import WelcomeScreen from "../../screens/public/WelcomeScreen";

const Stack = createNativeStackNavigator();

const LandingRoutes: React.FC = () => {

    return (
        <Stack.Navigator
            initialRouteName={LandingRoutesTS.LandingRoutes_WelcomeScreen}
            screenOptions={{
                headerShown: false
            }}>

            <Stack.Screen name={LandingRoutesTS.LandingRoutes_WelcomeScreen} component={WelcomeScreen} />
        </Stack.Navigator>
    )
};

export default LandingRoutes;