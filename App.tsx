import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from "@react-navigation/native";
import {TabNavigator} from "./app/navigators/TabNavigator";
import {store, persistor} from './app/store/'
import {navTheme} from "./app/styles";


// The main App component of the application
const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer theme={navTheme}>
                    <TabNavigator/>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    )
}

export default App;
