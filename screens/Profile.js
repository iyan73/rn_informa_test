import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, FlatList, Modal, Linking, Platform, Alert  } from 'react-native';
import { TextInput, Button, Title, Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Entypo } from '@expo/vector-icons';

const Profile = (props) => {
    const {_id, name, email, sallary, position, phone, picture} = props.route.params.item
    const deleteEmployee = () => {
        fetch("http://10.0.2.2:3000/delete", {
            method: "post",
            headers: {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                id: _id
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log("data deleted", data)
            Alert.alert(`${data.name} deleted`)
            props.navigation.navigate("Home")
        }).catch(err => {
            Alert.alert("Something Went Wrong")
            console.log("error delete", err)
        });
    }
    const openDial = () => {
        if (Platform.OS === 'android'){
            Linking.openURL(`tel:${phone}`)
        }else{
            Linking.openURL(`telprompt:${phone}`)
        }
    }
    return(
        <View style={styles.root}>
            <LinearGradient 
                colors={["#0033ff", "#6bc1ff"]}
                style={{height:"20%"}}
            />
            <View style={{alignItems:"center"}}>
                <Image 
                    style={{width:150, height:150, borderRadius:150/2, marginTop:-50}}
                    source={{uri:(picture ? picture : "https://reactnative.dev/docs/assets/p_cat2.png")}}
                />
            </View>
            <View style={{alignItems:"center", margin:15}}>
                <Title>{name}</Title>
                <Text style={styles.myText}>{position}</Text>
            </View>
            <Card
                style={styles.myCard}
                onPress={() => {
                    Linking.openURL(`mailto:${email}`)
                }}>
                    <View style={styles.cardContent}>
                        <MaterialIcons name="email" size={32} color="#006aff" />
                        <Text style={styles.myText}>{email}</Text>
                    </View>
            </Card>
            <Card
                style={styles.myCard}
                onPress={() => openDial()}>
                    <View style={styles.cardContent}>
                        <Entypo name="phone" size={32} color="#006aff" />
                        <Text style={styles.myText}>{phone}</Text>
                    </View>
            </Card>
            <Card
                style={styles.myCard}>
                    <View style={styles.cardContent}>
                        <MaterialIcons name="attach-money" size={32} color="#006aff" />
                        <Text style={styles.myText}>{sallary}</Text>
                    </View>
            </Card>
            <View style={{flexDirection:"row", justifyContent:"space-around", padding: 10}}>
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
            </View>
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

export default Profile;