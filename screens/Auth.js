import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Alert } from 'react-native';
import { Card, FAB } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
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
        return function clearence(){}
    }, [])

    return (
        <View style={{flex:1, justifyContent:'center'}}>
            <ActivityIndicator />
        </View>
    )
}

export default Auth;