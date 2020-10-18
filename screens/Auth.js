import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const Auth = ({ navigation }) => {

    useEffect( () => {
        const validateUserLogin = async () => {
            const isLoggin = await AsyncStorage.getItem('INFORMA')
            if (isLoggin) {
                navigation.navigate("Home")
            }else{
                navigation.navigate("Intro")
            }
        }

        validateUserLogin()
        // return function clearence(){}
    }, [])

    return (
        <View style={{flex:1, justifyContent:'center'}}>
            <ActivityIndicator size="large" color="#00ff00" />
        </View>
    )
}

export default Auth;