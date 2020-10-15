import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Alert } from 'react-native';
import { Card, FAB } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';


const Home = ({ navigation }) => {
    // const [data, setData] = useState([])
    // const [loading, setLoading] = useState(true)

    const dispatch = useDispatch()
    const { data, loading } = useSelector((state) => {
        return state;
    })

    const logout = async () => {
        await AsyncStorage.removeItem('INFORMA')
        navigation.navigate("Intro")
    }

    const fetchData = () => {
        dispatch({
            type: "LOAD_DATA",
            payload: {
                data: [
                    { id: '1', name: "Metallica Concert", place: "Palace Grounds", description: "Paid " },
                    { id: '2', name: "Saree Exhibition ", place: "Malleswaram Grounds", description: "Free" },
                    { id: '3', name: "Wine tasting event ", place: "Links Brewery", description: "Paid" },
                    { id: '4', name: "Startups Meet ", place: "Kanteerava Indoor Stadium", description: "Paid" },
                    { id: '5', name: "Summer Noon Party ", place: "Kumara Park", description: "Paid" },
                    { id: '6', name: "Rock and Roll nights ", place: "Sarjapur Road", description: "Paid" },
                    { id: '7', name: "Barbecue Fridays ", place: "Whitefield", description: "Paid" },
                    { id: '8', name: "Summer workshop ", place: "Indiranagar", description: "Free" },
                    { id: '9', name: "Impressions & Expressions ", place: "MG Road", description: "Free" },
                    { id: '10', name: "Italian carnival", place: "Electronic City", description: "Free" },
                ],
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
                onPress={() => navigation.navigate("Profile", { item })}>
                <View style={styles.cardView}>
                    <Image
                        style={{ width: 60, height: 60, borderRadius: 30 }}
                        source={{ uri: imageURL }}
                    />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.text}>{item.name}</Text>
                        <Text style={styles.text}>{item.place}</Text>
                    </View>
                </View>
            </Card>
        )

    })
    return (
        <View style={{ flex: 1 }}>
            {/* {loading ?
                <ActivityIndicator size="large" color="#0000ff" />
                : */}
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    return renderList(item)
                }}
                keyExtractor={item => item.id}
                onRefresh={() => fetchData()}
                refreshing={loading} />
            <FAB
                onPress={() => logout()}
                style={styles.fab}
                small={false}
                icon="plus"
                theme={{ colors: { accent: "#006aff" } }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mycard: {
        margin: 5
    },
    cardView: {
        flexDirection: "row",
        padding: 6
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

export default Home;