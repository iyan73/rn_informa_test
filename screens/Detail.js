import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { useSelector, useDispatch } from 'react-redux';

const Detail = (props) => {
    const { item } = props.navigation.state.params
    const dispatch = useDispatch()
    const { dataTracking } = useSelector((state) => {
        return state;
    })
    const [disabledButton, setDisabledButton] = useState(false)
    const cekdata = async () => {
        dataTracking.filter((x) => x.id === item.id)
            .map((filterData) => {
                // console.log("cekdata",filterData)
                setDisabledButton(true)
                return filterData;
            })
    }

    useEffect(() => {
        if (dataTracking !== null) {
            cekdata()
        }
    }, [])


    const trackData = async () => {
        try {
            const tracking = await AsyncStorage.getItem('data_tracking')
            // console.log("data_tracking", JSON.parse(tracking))
            let dataToSave = [item]
            if (tracking) {
                let newDataToSave = JSON.parse(tracking).concat(dataToSave);
                const save = await AsyncStorage.setItem('data_tracking', JSON.stringify(newDataToSave));
                if (save) {
                    dispatch({
                        type: "LOAD_DATA_TRACKING",
                        payload: {
                            data: newDataToSave,
                            loading: false
                        }
                    })
                    Alert.alert(
                        "Tracking Successfully",
                        [
                            { text: "OK", onPress: () => props.navigation.navigate("Track") }
                        ],
                        { cancelable: false }
                    )
                }
            } else {
                const save = await AsyncStorage.setItem('data_tracking', JSON.stringify(dataToSave));
                if (save) {
                    dispatch({
                        type: "LOAD_DATA_TRACKING",
                        payload: {
                            data: dataToSave,
                            loading: false
                        }
                    })
                    Alert.alert(
                        "Tracking Successfully",
                        [
                            { text: "OK", onPress: () => props.navigation.navigate("Track") }
                        ],
                        { cancelable: false }
                    )
                }
            }
            setDisabledButton(true)
            props.navigation.navigate("Track")
        } catch (error) {
            console.log("error", error)
        }
    }

    const removeFromTracking = async () => {
        try {
            const tracking = await AsyncStorage.getItem('data_tracking')
            // console.log("data_tracking", JSON.parse(tracking))
            let dataToSave = [item]
            if (tracking) {
                const newDataToSave = JSON.parse(tracking).filter((x) => x.id !== item.id)
                .map((filterData) => {
                    return filterData;
                })
                const save = await AsyncStorage.setItem('data_tracking', JSON.stringify(newDataToSave));
                if (save) {
                    dispatch({
                        type: "LOAD_DATA_TRACKING",
                        payload: {
                            data: newDataToSave,
                            loading: false
                        }
                    })
                    Alert.alert(
                        "Tracking Successfully",
                        [
                            { text: "OK", onPress: () => props.navigation.navigate("Home") }
                        ],
                        { cancelable: false }
                    )
                }
            }
            setDisabledButton(false)
            props.navigation.navigate("Home")
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
                disabled={disabledButton}
                style={disabledButton ? styles.disbalebutton : styles.enablebutton}>
                <Text style={{ color: "white" }}>{disabledButton ? 'You Have Tracked' : 'Track Event'}</Text>
            </TouchableOpacity>
            {disabledButton ?
                <TouchableOpacity
                    onPress={() => removeFromTracking()}
                    style={styles.removebutton}>
                    <Text style={{ color: "white" }}>Remove From Tracking</Text>
                </TouchableOpacity> : null}
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
    },
    enablebutton: {
        padding: 10,
        backgroundColor: '#006aff',
        margin: 10,
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 5
    },
    disbalebutton: {
        padding: 10,
        backgroundColor: 'grey',
        margin: 10,
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 5
    },
    removebutton: {
        padding: 10,
        backgroundColor: 'red',
        margin: 10,
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 5
    }
})

export default Detail;