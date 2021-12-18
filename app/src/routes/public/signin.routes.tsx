import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from "../../screens/public/LoginScreen";
import RegisterScreen from "../../screens/public/RegisterScreen";
import { SignInRoutesTS } from "../_ts/SignInRoutesTS";

const Stack = createNativeStackNavigator();

const SignInRoutes: React.FC = () => {

    return (
        <Stack.Navigator
            initialRouteName={SignInRoutesTS.SignInRoutes_LoginScreen}
            screenOptions={{
                headerShown: false
            }}>

            <Stack.Screen name={SignInRoutesTS.SignInRoutes_LoginScreen} component={LoginScreen} />
            <Stack.Screen name={SignInRoutesTS.SignInRoutes_RegisterScreen} component={RegisterScreen} />
        </Stack.Navigator>
    )
};

export default SignInRoutes;