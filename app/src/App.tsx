import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes/routes';
import HooksProvider from './hooks/hooks';

const App = () => {
    return (
        <NavigationContainer>
            <HooksProvider>
                <Routes />
            </HooksProvider>
        </NavigationContainer>
    );
};

export default App;
