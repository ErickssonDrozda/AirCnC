import React, { useState } from 'react';
import { Alert, Text, TextInput, StyleSheet, AsyncStorage, TouchableOpacity, SafeAreaView } from 'react-native';

import api from '../../services/api';

export default function Book({ navigation })
{
    const id = navigation.getParam('id');
    const [date, setDate] = useState('');

    async function handleSubmit(){
        const user_id = await AsyncStorage.getItem('user');
        await api.post(`spots/${id}/bookings`, { date }, { headers: { user_id }});
        
        Alert.alert('Request send sucessfully');

        navigation.navigate('List');
    }

    async function handleCancel(){
        navigation.navigate('List');
    }

    return (<SafeAreaView style={styles.container}>
                <Text style={styles.label} >DATE OF INTEREST</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Date of Interest'
                    placeholderTextColor='#999'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={date}
                    onChangeText={setDate}
                >
                </TextInput>
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                        <Text style={styles.buttonText}>Request reservation</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
                        <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
        </SafeAreaView>);
}

const styles = StyleSheet.create({
    container:{
        margin: 30,   
    },

    label:{
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 0,
        marginTop: 50
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

    cancelButton:{
        backgroundColor: '#ccc',
        marginTop: 10
    },

    buttonText:{
        color:'#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }
});
