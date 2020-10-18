import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { Card, FAB } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';

const Intro = ({ navigation }) => {

    const dispatch = useDispatch()
    const { data, loading } = useSelector((state) => {
        return state;
    })

    const simpanData = async () => {
        console.log("klik")
        try {
            await AsyncStorage.setItem('INFORMA', "jossss");
            // console.log(value);
            navigation.navigate("Home")
        } catch (error) {
            // Error saving data
            console.log("error", error)
        }
    }

    const fetchData = async () => {
        try {
            const value = await AsyncStorage.getItem('INFORMA');
            if (value !== null) {
                // We have data!!
                console.log(value);
                navigation.navigate("Home")
            } else {
                navigation.navigate("Intro")
            }
        } catch (error) {
            // Error retrieving data
        }
        // dispatch({
        //     type: "LOAD_DATA",
        //     payload: {
        //         data: [
        //             { id: '1', name: "Metallica Concert", place: "Palace Grounds", description: "Paid " },
        //             { id: '2', name: "Saree Exhibition ", place: "Malleswaram Grounds", description: "Free" },
        //             { id: '3', name: "Wine tasting event ", place: "Links Brewery", description: "Paid" },
        //             { id: '4', name: "Startups Meet ", place: "Kanteerava Indoor Stadium", description: "Paid" },
        //             { id: '5', name: "Summer Noon Party ", place: "Kumara Park", description: "Paid" },
        //             { id: '6', name: "Rock and Roll nights ", place: "Sarjapur Road", description: "Paid" },
        //             { id: '7', name: "Barbecue Fridays ", place: "Whitefield", description: "Paid" },
        //             { id: '8', name: "Summer workshop ", place: "Indiranagar", description: "Free" },
        //             { id: '9', name: "Impressions & Expressions ", place: "MG Road", description: "Free" },
        //             { id: '10', name: "Italian carnival", place: "Electronic City", description: "Free" },
        //         ],
        //         loading: false
        //     }
        // })
        // dispatch({
        //     type: "CHANGE_LOADING",
        //     payload: { loading : false }
        // })

    }

    useEffect( () => {
        // fetchData()
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
        <Container>
            {/* <Header /> */}
            <LinearGradient
                colors={["#0033ff", "#6bc1ff"]}
                style={{ height: "25%" }}
            />
            <Content>
                <Form>
                    <Item floatingLabel>
                        <Label>Input Your Name</Label>
                        <Input />
                    </Item>
                </Form>

                <TouchableOpacity
                    onPress={() => simpanData()}
                    style={{
                    padding:10,
                    backgroundColor: '#006aff',
                    margin:10,
                    justifyContent: 'center',
                    alignItems: "center",
                    borderRadius: 5
                }}>
                    <Text style={{color: "white"}}>Submit</Text>
                </TouchableOpacity>

            </Content>
        </Container>
    )
}

const theme = {
    colors: {
        primary: "#006aff"
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    inputStyle: {
        margin: 5
    },
    modalButtonView: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
    modalView: {
        position: "absolute",
        bottom: 2,
        width: "100%",
        backgroundColor: "white"
    }
})

export default Intro;