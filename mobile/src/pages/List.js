import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { SafeAreaView, ScrollView, StyleSheet, Image, AsyncStorage, TouchableOpacity, Text, Alert } from 'react-native';

import logo from '../../assets/logo.png';
import SpotList from '../components/SpotList';

export default function List({ navigation })
{
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storageTechs => {
            if (storageTechs != null)
            {
                const techsArray = storageTechs.split(',').map(tech => tech.trim());
                setTechs(techsArray);
            }
        })
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.0.51:3333', {
                query: { user_id }
            })

            socket.on('booking_response', booking => {
                Alert.alert(`Your request on ${booking.spot.company} on ${booking.date} has been ${booking.approved ? 'APPROVED' : 'REJECTED'}`)
            })
        })
    }, []);

    async function handleSubmit(){
         navigation.navigate('Login');
    }

    return <SafeAreaView style={styles.container}  >
            <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                <Text>Back</Text>
            </TouchableOpacity>
            <Image style={styles.logo} source={logo} ></Image>
            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} ></SpotList>)}
            </ScrollView>            
        </ SafeAreaView>
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1
        },

        logo:{
            height: 32,
            resizeMode:"contain",
            alignSelf: 'center',
            marginTop: 5
        },

        btn:{
            marginTop: 50,
            margin: 20
        }
    }
);