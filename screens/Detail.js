import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

const Detail = (props) => {
    const { item } = props.navigation.state.params

    const trackData = async () => {
        console.log("trackData")
        try {
            const tracking = await AsyncStorage.getItem('data_tracking')
            // console.log("data_tracking", JSON.parse(tracking))
            if(tracking){
                await AsyncStorage.mergeItem('data_tracking', JSON.stringify({id: item.id}));
            }else{
                await AsyncStorage.setItem('data_tracking', JSON.stringify({id: item.id}));
            }           
            // navigation.navigate("Home")
        } catch (error) {
            console.log("error", error)
        }
    }

    return (
        <View style={styles.root}>
            <LinearGradient
                colors={["#0033ff", "#6bc1ff"]}
                style={{ height: "20%" }}
            />
            <View style={{ alignItems: "center", marginBottom: 25 }}>
                <Image
                    style={{ width: 150, height: 150, borderRadius: 150 / 2, marginTop: -50 }}
                    source={{ uri: (item.picture ? item.picture : "https://reactnative.dev/docs/assets/p_cat2.png") }}
                />
            </View>

            <Card style={styles.myCard}>
                <View style={styles.cardContent}>
                    <MaterialIcons name="event" size={32} color="#006aff" />
                    <Text style={styles.myText}>{item.name}</Text>
                </View>
            </Card>
            <Card style={styles.myCard}>
                <View style={styles.cardContent}>
                    <MaterialIcons name="location-on" size={32} color="#006aff" />
                    <Text style={styles.myText}>{item.place}</Text>
                </View>
            </Card>
            <Card
                style={styles.myCard}>
                <View style={styles.cardContent}>
                    <MaterialIcons name="payment" size={32} color="#006aff" />
                    <Text style={styles.myText}>{item.description}</Text>
                </View>
            </Card>
            <Card
                style={styles.myCard}>
                <View style={styles.cardContent}>
                    <MaterialIcons name="attach-money" size={32} color="#006aff" />
                    <Text style={styles.myText}>{item.price}</Text>
                </View>
            </Card>

            <TouchableOpacity
                onPress={() => trackData()}
                style={{
                    padding: 10,
                    backgroundColor: '#006aff',
                    margin: 10,
                    justifyContent: 'center',
                    alignItems: "center",
                    borderRadius: 5
                }}>
                <Text style={{ color: "white" }}>Track Event</Text>
            </TouchableOpacity>
        </View>
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
    myCard: {
        margin: 3
    },
    cardContent: {
        flexDirection: "row",
        padding: 8
    },
    myText: {
        fontSize: 18,
        marginTop: 3,
        marginLeft: 3
    }
})

export default Detail;