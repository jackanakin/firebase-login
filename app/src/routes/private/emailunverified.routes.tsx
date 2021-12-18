import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import EmailNotVerifiedScreen from "../../screens/private/errorScreens/EmailNotVerifiedScreen";
import { PrivateErrorRoutesTS } from "../_ts/PrivateErrorRoutesTS";

const Stack = createNativeStackNavigator();

const EmailUnverifiedRoutes: React.FC = () => {

    return (
        <Stack.Navigator
            initialRouteName={PrivateErrorRoutesTS.PrivateErrorRoutes_EmailNotVerifiedScreen}
            screenOptions={{
                headerShown: false
            }}>

            <Stack.Screen name={PrivateErrorRoutesTS.PrivateErrorRoutes_EmailNotVerifiedScreen} component={EmailNotVerifiedScreen} />
        </Stack.Navigator>
    )
};

export default EmailUnverifiedRoutes;