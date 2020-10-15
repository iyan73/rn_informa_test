import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Alert } from 'react-native';
import { Card, FAB } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';

const Intro = ({ navigation }) => {
    // const [data, setData] = useState([])
    // const [loading, setLoading] = useState(true)

    const dispatch = useDispatch()
    const { data, loading } = useSelector((state) => {
        return state;
    })

    const fetchData = () => {
        dispatch({
            type: "ADD_DATA",
            payload: [
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
            ]
        })
        dispatch({
            type: "CHANGE_LOADING",
            payload: false
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <Container>
            {/* <Header /> */}
            <Content>
                <Form>
                    <Item floatingLabel>
                        <Label>Input Your Name</Label>
                        <Input />
                    </Item>
                    <Button block info>
                        <Text>Submit</Text>
                    </Button>
                </Form>

            </Content>
        </Container>
    )
}

export default Intro;