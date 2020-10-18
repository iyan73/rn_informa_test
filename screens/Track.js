import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Alert } from 'react-native';
import { Card, FAB, ToggleButton } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';


const Track = ({ navigation }) => {
    // const [data, setData] = useState([])
    const [viewdata, setViewData] = useState('grid')

    const dispatch = useDispatch()
    const { dataTracking, loading } = useSelector((state) => {
        return state;
    })

    const logout = async () => {
        await AsyncStorage.clear()
        navigation.navigate("Intro")
    }

    const onSwipeRight = () => {
        navigation.navigate("Home")
    }

    const fetchData = async () => {
        const tracking = await AsyncStorage.getItem('data_tracking')
        dispatch({
            type: "LOAD_DATA_TRACKING",
            payload: {
                data: JSON.parse(tracking),
                loading: false
            }
        })
        dispatch({
            type: "CHANGE_LOADING",
            payload: { loading: false }
        })
    }

    useEffect(() => {
        fetchData()
    }, [])
    const renderList = ((item) => {
        const imageURL = item.picture ? item.picture : "https://reactnative.dev/docs/assets/p_cat2.png"
        return (
            <Card
                style={styles.mycard}
                onPress={() => navigation.navigate("Detail", { item })}>
                <View style={styles.cardView}>
                    <Image
                        style={{ width: 60, height: 60, borderRadius: 30 }}
                        source={{ uri: imageURL }}
                    />
                    <View style={{ marginLeft: 10 }}>
                        <Text>Event Name : {item.name}</Text>
                        {viewdata == 'grid'
                            ?
                            null
                            :
                            <View>
                                <Text>Place : {item.place}</Text>
                                <Text>Description : {item.description}</Text>
                            </View>
                        }
                    </View>
                </View>
            </Card>
        )

    })
    return (
        <GestureRecognizer
            onSwipeRight={() => onSwipeRight()}
            style={{
                flex: 1
            }}
        >
            <View style={{ flex: 1 }}>
                {/* {loading ?
                <ActivityIndicator size="large" color="#0000ff" />
                : */}
                <View style={{ flexDirection: "row", justifyContent: "flex-end", padding: 10 }}>
                    <ToggleButton.Row onValueChange={value => setViewData(value)} value={viewdata}>
                        <ToggleButton color="red" icon="view-grid" value="grid" />
                        <ToggleButton color="red" icon="view-list" value="list" />
                    </ToggleButton.Row>
                </View>

                <Text style={{
                    padding: 15,
                    alignContent: "center",
                    fontSize: 15,
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#006aff"
                }}> Your Event Tracking</Text>

                <FlatList
                    key={viewdata == 'grid' ? 1 : 0}
                    numColumns={viewdata == 'grid' ? 2 : 1}
                    data={dataTracking}
                    renderItem={({ item }) => {
                        return renderList(item)
                    }}
                    keyExtractor={item => item.id}
                    onRefresh={() => fetchData()}
                    refreshing={loading} />
            </View>
        </GestureRecognizer>
    )
}

const styles = StyleSheet.create({
    mycard: {
        margin: 5,
        alignContent: 'center',
        justifyContent: 'space-between',
    },
    cardView: {
        // flexDirection: "row",
        padding: 6,
        width: 195
    },
    text: {
        fontSize: 15
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    }
})

export default Track;