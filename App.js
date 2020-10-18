import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Home from './screens/Home';
import CreateEmployee from './screens/CreateEmployee';
import Profile from './screens/Profile';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './reducers/reducer';
import Intro from './screens/Intro';
import Auth from './screens/Auth';
import Detail from './screens/Detail';
const store = createStore(reducer);

const Stack = createStackNavigator();

function App() {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Auth"
          component={Auth}
          options={{
            title: "Auth",
            headerLeft: null,
            headerTintColor: "white"
          }} /> */}
        <Stack.Screen
          name="Intro"
          component={Intro}
          options={{
            title: "Intro",
            headerLeft: null,
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "#006aff"
            }
          }} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Home",
            headerLeft: null,
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "#006aff"
            }
          }} />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            title: "Detail Event",
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "#006aff"
            }
          }} />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            title: "Profile",
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "#006aff"
            }
          }} />
      </Stack.Navigator>
      {/* <Text>React Native Developer 2020</Text> */}
      {/* <Home /> */}
      {/* <CreateEmployee /> */}
      {/* <Profile /> */}
    </View>
  );
}

// const AppNavigator = createStackNavigator({
//   Home: {
//     screen : Home
//   }
// })

export default () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    // marginTop:Contants.statusBarHeight
  },
});
