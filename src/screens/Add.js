import * as React from 'react'
import * as RN from 'react-native'
import { database } from '../config/fb'
import { collection, addDoc } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'

export default function Add() {
    const navigation = useNavigation();
    const [newUser, setNewUser] = React.useState({
        name: '',
        email: '',
        birthdate: '',
        phone: '',
        createdAt: new Date(),
        active: true
    })

    const onSend = async () => {
        await addDoc(collection(database, 'users'), newUser)
        navigation.goBack();
    }
    return (
        <RN.View style={styles.container}> 
        <RN.Text style={styles.title}>Create user</RN.Text>
        <RN.TextInput 
        placeholder='Full Name' 
        style={styles.inputContainer}
        onChangeText={(fullname) => setNewUser({...newUser, name:fullname})}
        />
        <RN.TextInput 
        placeholder='Email' 
        style={styles.inputContainer}
        onChangeText={(email) => setNewUser({...newUser, email:email})}
        />
        
        <RN.TextInput
        placeholder='Birthdate DD/MM/YYYY' 
        style={styles.inputContainer}
        onChangeText={(date) => setNewUser({...newUser, birthdate:date})}
        />
        <RN.TextInput
        placeholder='Phone Number' 
        style={styles.inputContainer}
        onChangeText={(number) => setNewUser({...newUser, phone:number})}
        keyboardType='phone-pad'
        />
        <RN.Button title='Register' onPress={onSend}/>
        </RN.View>
    )
}

const styles = RN.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    title: {
        fontSize: 32,
        fontWeight: '700'
    },
    inputContainer: {
        width: '90%',
        padding: 13,
        marginVertical: 6,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6
    }
})