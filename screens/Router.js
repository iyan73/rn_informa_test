import React from 'react'
import { View, Text } from 'react-native'
import Home from './Home'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Detail from './Detail';
import Intro from './Intro';
import Auth from './Auth';

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

// const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });
// const AuthStack = createStackNavigator({ SignIn: SignInScreen });

// export default createAppContainer(
//   createSwitchNavigator(
//     {
//       AuthLoading: AuthLoadingScreen,
//       App: AppStack,
//       Auth: AuthStack,
//     },
//     {
//       initialRouteName: 'AuthLoading',
//     }
//   )
// );


const HomeStack = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions : {
            headerStyle : {
                backgroundColor : '#006aff'
            },
            headerTintColor : 'white'
        }
    },
    Detail: {
        screen: Detail,
        navigationOptions : {
            headerStyle : {
                backgroundColor : '#006aff'
            },
            headerTintColor : 'white'
        }
    }
},
    {
        initialRouteName: 'Home'
    }
)


const Router = createSwitchNavigator({
    Home: HomeStack,
    Intro: {
        screen: Intro
    },
    Auth: Auth
}, {
    initialRouteName: 'Auth',
    headerMode: 'none'
})

export default createAppContainer(Router)
