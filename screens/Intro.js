import React, { useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Container, Content, Form, Item, Input, Label } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';

const Intro = ({navigation}) => {

    const simpanData = async () => {
        try {
            await AsyncStorage .setItem('INFORMA', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuZ3VsYXJAZ21haWwuY29tIiwidXNlcklkIjoiNGMyNzkyMDAtNDVkZS00ZTY5LTg5MTItMzAxMjY2N2JjMzlkIiwiaWF0IjoxNjAzMDMwNjI2LCJleHAiOjE2MDMwMzQyMjZ9.3mIdtfcbIRLDsqCBd9Rd8CKESpdCsQBKye_AW74mpqs");
            // console.log(value);
            navigation.navigate("Home")
        } catch (error) {
            // Error saving data
            console.log("error", error)
        }
    }

    useEffect( () => {
        
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



export default Intro;