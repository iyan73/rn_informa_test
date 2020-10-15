import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, FlatList, Modal, Alert, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

const CreateEmployee = ({navigation, route}) => {

    const getDetail = (type) => {
        if(route.params){
            console.log("route params", route.params)
            switch(type){
                case "name" :
                    return route.params.name
                case "phone" :
                    return route.params.phone
                case "email" :
                    return route.params.email
                case "sallary" :
                    return route.params.sallary
                case "picture" :
                    return route.params.picture
                case "position" :
                    return route.params.position
            }
        }
        return "";
    }
    const [name, setName] = useState(getDetail("name"))
    const [phone, setPhone] = useState(getDetail("phone"))
    const [email, setEmail] = useState(getDetail("email"))
    const [sallary, setSallary] = useState(getDetail("sallary"))
    const [picture, setPicture] = useState(getDetail("picture"))
    const [position, setPosition] = useState(getDetail("position"))
    const [modal, setModal] = useState(false)
    const [enableShift, setEnableShift] = useState(false)


    const updateData = () => {
        fetch("http://10.0.2.2:3000/update", {
            method : "post",
            headers: {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                id: route.params._id,
                name,
                phone,
                email,
                sallary,
                picture,
                position
            })
        }).then(res => res.json())
        .then(data=>{
            console.log("submit", data)
            Alert.alert(`${data.name} Has Been Updated`)
            navigation.navigate("Home")
        })
    }

    const simpanData = () => {
        fetch("http://10.0.2.2:3000/send", {
            method : "post",
            headers: {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                name,
                phone,
                email,
                sallary,
                picture,
                position
            })
        }).then(res => res.json())
        .then(data=>{
            console.log("submit", data)
            Alert.alert(`${data.name} Has Been Saved`)
            navigation.navigate("Home")
        })
    }

    const pickFromGallery = async () => {
        const {granted} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (granted){
            let data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.Images,
                allowsEditing:true,
                aspect:[1,1],
                quality:0.5
            })
            console.log("data=>", data)
            if(!data.cancelled){
                let newFile = {
                    uri:data.uri,
                    type:`test/${data.uri.split(".")[1]}`,
                    name:`test.${data.uri.split(".")[1]}`
                }
                handleUpload(newFile)
            }
        }else{
            Alert.alert("You Need to give up permission to work")
        }
    }

    const pickFromCamera = async () => {
        const {granted} = await Permissions.askAsync(Permissions.CAMERA)
        if (granted){
            let data = await ImagePicker.launchCameraAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.Images,
                allowsEditing:true,
                aspect:[1,1],
                quality:0.5
            })
            console.log("data=>", data)
            if(!data.cancelled){
                let newFile = {
                    uri:data.uri,
                    type:`test/${data.uri.split(".")[1]}`,
                    name:`test.${data.uri.split(".")[1]}`
                }
                handleUpload(newFile)
            }
        }else{
            Alert.alert("You Need to give up permission to work")
        }
    }


    const handleUpload = (image) => {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'employeApp')
        data.append('cloud_name', 'dh2tofhr3')

        fetch("https://api.cloudinary.com/v1_1/dh2tofhr3/image/upload",{
            method:"post",
            body:data
        }).then(res=>res.json())
        .then(data=>{
            console.log("upload", data)
            setPicture(data.url)
            setModal(false)
        })
    }

    return(
        <KeyboardAvoidingView behavior="position" style={styles.root} enabled={enableShift}>
        <View>
            {/* <KeyboardAvoidingView behavior="position"> */}
            <TextInput
                label='Name'
                value={name}
                style={styles.inputStyle}
                theme={theme}
                mode="outlined"
                onFocus={() => setEnableShift(false)}
                onChangeText={text => setName(text)}
            />
            <TextInput
                label='Phone'
                value={phone}
                style={styles.inputStyle}
                theme={theme}
                mode="outlined"
                keyboardType="number-pad"
                onFocus={() => setEnableShift(false)}
                onChangeText={text => setPhone(text)}
            />
            <TextInput
                label='Email'
                value={email}
                style={styles.inputStyle}
                theme={theme}
                mode="outlined"
                onFocus={() => setEnableShift(false)}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                label='Position'
                value={position}
                style={styles.inputStyle}
                theme={theme}
                mode="outlined"
                onFocus={() => setEnableShift(true)}
                onChangeText={text => setPosition(text)}
            />
            <TextInput
                label='Sallary'
                value={sallary}
                style={styles.inputStyle}
                theme={theme}
                mode="outlined"
                onFocus={() => setEnableShift(true)}
                onChangeText={text => setSallary(text)}
            />

            <Button style={styles.inputStyle} icon={picture==""?"upload":"check"} mode="contained" 
                onPress={() => setModal(true)}
                theme={theme}>
                Upload Image
            </Button>
            {route.params
                ? 
                <Button style={styles.inputStyle} icon="content-save" mode="contained" 
                    onPress={() => updateData()}
                    theme={theme}>
                    Update
                </Button>
                : 
                <Button style={styles.inputStyle} icon="content-save" mode="contained" 
                    onPress={() => simpanData()}
                    theme={theme}>
                    Save
                </Button>
            }
            
            <Modal
                animationType="slide"
                transparent={true}
                visible={modal}
                onRequestClose={() => {setModal(false)}}>
                    <View style={styles.modalView}>
                        <View style={styles.modalButtonView}>
                            <Button icon="camera" theme={theme} 
                                mode="contained" 
                                onPress={() => pickFromCamera()}>
                                Camera
                            </Button>
                            <Button icon="image-area" theme={theme} 
                                mode="contained" 
                                onPress={() => pickFromGallery()}>
                                Gallery
                            </Button>
                        </View>
                    <Button icon="cancel" 
                        theme={theme} 
                        onPress={() => setModal(false)}>
                        Cancel
                    </Button>
                    </View>
            </Modal>
            {/* </KeyboardAvoidingView> */}
        </View>
        </KeyboardAvoidingView>
    )
}

const theme = {
    colors:{
        primary : "#006aff"
    }
}
const styles = StyleSheet.create({
    root : {
        flex: 1
    },
    inputStyle:{
        margin:5
    },
    modalButtonView : {
        flexDirection:"row",
        justifyContent:"space-around",
        padding:10
    },
    modalView:{
        position:"absolute",
        bottom:2,
        width:"100%",
        backgroundColor:"white"
    }
})

export default CreateEmployee;