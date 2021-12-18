import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from "../../screens/private/HomeScreen";
import ChatScreen from "../../screens/private/ChatScreen";
import LookupForProvidersScreen from "../../screens/private/LookupForProvidersScreen";
import EmailNotVerifiedScreen from "../../screens/private/errorScreens/EmailNotVerifiedScreen";
import { HomeRoutesTS } from "../_ts/HomeRoutesTS";

const Stack = createNativeStackNavigator();

const SignInRoutes: React.FC = () => {

    return (
        <Stack.Navigator
            initialRouteName={HomeRoutesTS.HomeRoutes_HomeScreen}
            screenOptions={{
                headerShown: false
            }}>

            <Stack.Screen name={HomeRoutesTS.HomeRoutes_HomeScreen} component={HomeScreen} />
            <Stack.Screen name={HomeRoutesTS.HomeRoutes_LookupForProvidersScreen} component={LookupForProvidersScreen} />
            <Stack.Screen name={HomeRoutesTS.HomeRoutes_ChatScreen} component={ChatScreen} />

            <Stack.Screen name={HomeRoutesTS.HomeRoutes_EmailNotVerifiedScreen} component={EmailNotVerifiedScreen} />
        </Stack.Navigator>
    )
};

export default SignInRoutes;