import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Alert } from 'react-native';
import { Card, FAB, Button } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';


const Home = ({ navigation }) => {
    // const [data, setData] = useState([])
    const [viewdata, setViewData] = useState('grid')

    const dispatch = useDispatch()
    const { data, loading } = useSelector((state) => {
        return state;
    })

    const logout = async () => {
        await AsyncStorage.clear()
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
        <View style={{ flex: 1 }}>
            {/* {loading ?
                <ActivityIndicator size="large" color="#0000ff" />
                : */}
            <View style={{ flexDirection: "row", justifyContent: "flex-end", padding: 10 }}>
                <Button mode="contained" onPress={() => setViewData('grid')}>
                    <Text>Grid</Text>
                </Button>
                <Button mode="contained" onPress={() => setViewData('list')}>
                    <Text>List</Text>
                </Button>
            </View>

            <FlatList
                key={viewdata == 'grid' ? 1 : 0}
                numColumns={viewdata == 'grid' ? 2 : 1}
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
                icon="close-circle-outline"
                theme={{ colors: { accent: "#006aff" } }}
            />

            {/* <FAB
                onPress={() => setViewData('grid')}
                style={styles.fab}
                small={false}
                icon="add"
                theme={{ colors: { accent: "#006aff" } }}
            />

            <FAB
                onPress={() => setViewData('list')}
                style={styles.fab}
                small={false}
                icon="delete"
                theme={{ colors: { accent: "#006aff" } }}
            /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    mycard: {
        margin: 5,
        justifyContent: 'space-between'
    },
    cardView: {
        // flexDirection: "row",
        padding: 6,
        width: 190
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