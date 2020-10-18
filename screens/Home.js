import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Alert } from 'react-native';
import { Card, FAB, ToggleButton } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';


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

    const onSwipeLeft = () => {
        navigation.navigate("Track")
    }

    const fetchData = () => {
        dispatch({
            type: "LOAD_DATA",
            payload: {
                data: [
                    { id: '1', name: "Metallica Concert", place: "Palace Grounds", description: "Paid", picture: "https://www.wowkeren.com/images/news/00038697.jpg", price: "150.000" },
                    { id: '2', name: "Saree Exhibition", place: "Malleswaram Grounds", description: "Free", picture: "https://i0.wp.com/namasteswitzerland.ch/wp-content/uploads/2019/03/Embassy-Sari-Exhibition.jpg?fit=960%2C540&ssl=1", price: "-" },
                    { id: '3', name: "Wine tasting event", place: "Links Brewery", description: "Paid", picture: "https://mccoolesredlioninn.com/wp-content/uploads/2017/02/00000-WineTasting_FB_cube_v2.jpg", price: "250.000" },
                    { id: '4', name: "Startups Meet", place: "Kanteerava Indoor Stadium", description: "Paid", picture: "https://files.startupranking.com/startup/thumb/30319_122643adfeba96ec478bb9b167a109e85fba2225_startups-meet_l.png", price: "300.000" },
                    { id: '5', name: "Summer Noon Party", place: "Kumara Park", description: "Paid", picture: "https://i.pinimg.com/originals/3a/84/72/3a847291c5a0beab472d16d6a2eb220a.jpg", price: "500.000" },
                    { id: '6', name: "Rock and Roll nights", place: "Sarjapur Road", description: "Paid", picture: "https://surlingham.files.wordpress.com/2016/06/rock-n-roll-poster.jpg", price: "750.000" },
                    { id: '7', name: "Barbecue Fridays", place: "Whitefield", description: "Paid", picture: "https://i2.wp.com/www.24seventoanywhere.com/wp-content/uploads/sites/901/2020/01/fridays-boracay-promos-barbecue-fiesta-every-friday.jpg?resize=723%2C886", price: "200.000" },
                    { id: '8', name: "Summer workshop", place: "Indiranagar", description: "Free", picture: "https://about.powermaccenter.com/wp-content/uploads/2019/02/SW19_MobileBanner.png", price: "-" },
                    { id: '9', name: "Impressions & Expressions", place: "MG Road", description: "Free", picture: "https://www.lorrainemusicacademy.com/wp-content/uploads/2020/06/1-online-concert-poster.jpg", price: "-" },
                    { id: '10', name: "Italian carnival", place: "Electronic City", description: "Free", picture: "https://www.italia.it/uploads/RTEmagicC_Ridotta_Venezia_02.jpg.jpg", price: "-" },
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
        <GestureRecognizer
            onSwipeLeft={() => onSwipeLeft()}
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
                icon="logout"
                theme={{ colors: { accent: "#006aff" } }}
            />
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

export default Home;