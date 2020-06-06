import React, { useState, useEffect } from 'react';
import { View, AsyncStorage, KeyboardAvoidingView, Platform, Image, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logo from '../../assets/logo.png';

export default function Login({ navigation })
{
    const[email, setEmail] = useState('');
    const[techs, setTechs] = useState('');

    useEffect(() => {
        //AsyncStorage.getItem('user').then(user => {
        //    navigation.navigate('List');    
        //})
    }, []);

    async function handleSubmit(){

        const response = await api.post('/sessions', { email });

        const { _id } = response.data;

         await AsyncStorage.setItem('user', _id);
         await AsyncStorage.setItem('techs', techs);

         navigation.navigate('List');
    }

    return <KeyboardAvoidingView style={styles.container} enabled={Platform.OS === 'ios'} >
            <Image source={logo} ></Image>
            <View style={styles.form} >
                <Text style={styles.label} >EMAIL</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Your email'
                    placeholderTextColor='#999'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                >
                </TextInput>

                <Text style={styles.label} >TECHNOLOGIES</Text>
                <TextInput
                    style={styles.input}
                    placeholder='type your technologies'
                    placeholderTextColor='#999'
                    autoCapitalize='words'
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                >
                </TextInput>
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttontext}>
                        Find Spots
                    </Text>
                </TouchableOpacity>
            </View>           
        </ KeyboardAvoidingView>
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },

        form:{
            alignSelf: 'stretch',
            paddingHorizontal: 30,
            marginTop: 30
        },

        label:{
            fontWeight: 'bold',
            color: '#444',
            marginBottom: 0
        },

        input: {
            borderWidth: 1,
            borderColor: '#ddd',
            paddingHorizontal: 20,
            fontSize: 16,
            color: '#444',
            height: 44,
            marginBottom: 20,
            borderRadius: 4
        },

        button:{
            height: 42,
            backgroundColor: '#f05a5b',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 2
        },

        buttontext:{
            color:'#FFF',
            fontWeight: 'bold',
            fontSize: 16
        }
    }
);