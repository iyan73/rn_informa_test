import React, {useState} from 'react';
import { StyleSheet, Text, View, Image  } from 'react-native';
import { Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Entypo } from '@expo/vector-icons';

const Detail = (props) => {
    console.log("props", props)
    const { item } = props.navigation.state.params
    
    return(
        <View style={styles.root}>
            <LinearGradient 
                colors={["#0033ff", "#6bc1ff"]}
                style={{height:"20%"}}
            />
            <View style={{alignItems:"center"}}>
                <Image 
                    style={{width:150, height:150, borderRadius:150/2, marginTop:-50}}
                    source={{uri:(item.picture ? item.picture : "https://reactnative.dev/docs/assets/p_cat2.png")}}
                />
            </View>
            {/* <View style={{alignItems:"center", margin:15}}>
                <Title>{item.name}</Title>
            </View> */}
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
            {/* <View style={{flexDirection:"row", justifyContent:"space-around", padding: 10}}>
                <Button icon="account-edit" theme={theme} 
                    mode="contained" 
                    onPress={() => props.navigation.navigate("Create", {_id, name, email, sallary, position, phone, picture})}>
                    Edit
                </Button>
                <Button icon="delete" theme={theme} 
                    mode="contained" 
                    onPress={() => deleteEmployee()}>
                    Delete
                </Button>
            </View> */}
        </View>
    )
}

const theme = {
    colors:{
        primary : "#006aff"
    }
}

const styles = StyleSheet.create({
    root:{
        flex:1
    },
    myCard:{
        margin:3
    },
    cardContent:{
        flexDirection:"row",
        padding: 8
    },
    myText: {
        fontSize:18,
        marginTop:3,
        marginLeft:3
    }
})

export default Detail;