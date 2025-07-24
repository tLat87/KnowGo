// import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import {Provider} from "react-redux";
// import {PersistGate} from "redux-persist/integration/react";
// import {persistor, store} from "./src/redux/store";
// import WelcomeScreen from "./src/screens/WelcomeScreen";
// import HomeScreen from "./src/screens/HomeScreen";
// import RulesScreen from "./src/screens/RulesScreen";
// import SettingsScreen from "./src/screens/SettingsScreen";
// import LearnAboutSalzburgScreen from "./src/screens/LearnAboutSalzburgScreen";
// import CategoryDetailScreen from "./src/screens/CategoryDetailScreen";
// import PlayersScreen from "./src/screens/PlayersScreen";
// import GameSettingsScreen from "./src/screens/GameSettingsScreen";
// import GamePlayScreen from "./src/screens/GamePlayScreen";
//
// const Stack = createStackNavigator();
//
//
//
// export default function App() {
//     return (
//         <Provider store={store}>
//             <PersistGate loading={null} persistor={persistor}>
//                 <NavigationContainer>
//                     <Stack.Navigator screenOptions={{
//                         headerShown: false,
//                         headerTintColor: 'white',
//                         headerShadowVisible: false,
//                     }}>
//
//                         <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
//                         <Stack.Screen name="HomeScreen" component={HomeScreen} options={{}} />
//                         <Stack.Screen name="RulesScreen" component={RulesScreen} options={{}} />
//                         <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{}} />
//                         <Stack.Screen name="LearnAboutSalzburgScreen" component={LearnAboutSalzburgScreen} options={{}} />
//                         <Stack.Screen name="CategoryDetailScreen" component={CategoryDetailScreen} options={{}} />
//
//                         <Stack.Screen name="PlayersScreen" component={PlayersScreen} />
//                         <Stack.Screen name="GameSettingsScreen" component={GameSettingsScreen} />
//                         <Stack.Screen name="GamePlayScreen" component={GamePlayScreen} />
//
//
//                     </Stack.Navigator>
//                 </NavigationContainer>
//           </PersistGate>
//          </Provider>
//     );
// }
//
// // <BackgroundMusic/>

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./src/redux/store";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import HomeScreen from "./src/screens/HomeScreen";
import RulesScreen from "./src/screens/RulesScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import LearnAboutSalzburgScreen from "./src/screens/LearnAboutSalzburgScreen";
import CategoryDetailScreen from "./src/screens/CategoryDetailScreen";
import PlayersScreen from "./src/screens/PlayersScreen";
import GameSettingsScreen from "./src/screens/GameSettingsScreen";
import GamePlayScreen from "./src/screens/GamePlayScreen";
import BackgroundMusic from "./src/BackgroundMusic";

const Stack = createStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {/* BackgroundMusic component is placed here so it has access to the Redux store */}
                {/* and runs throughout the app's lifecycle, outside the navigation stack. */}
                {/*<BackgroundMusic />*/}
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{
                        headerShown: false,
                        headerTintColor: 'white',
                        headerShadowVisible: false,
                    }}>
                        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{}} />
                        <Stack.Screen name="RulesScreen" component={RulesScreen} options={{}} />
                        <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{}} />
                        <Stack.Screen name="LearnAboutSalzburgScreen" component={LearnAboutSalzburgScreen} options={{}} />
                        <Stack.Screen name="CategoryDetailScreen" component={CategoryDetailScreen} options={{}} />
                        <Stack.Screen name="PlayersScreen" component={PlayersScreen} />
                        <Stack.Screen name="GameSettingsScreen" component={GameSettingsScreen} />
                        <Stack.Screen name="GamePlayScreen" component={GamePlayScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
}
