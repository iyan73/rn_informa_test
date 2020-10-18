import Home from './Home'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Detail from './Detail';
import Intro from './Intro';
import Auth from './Auth';
import Track from './Track';


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
    },
    Track: {
        screen: Track,
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
