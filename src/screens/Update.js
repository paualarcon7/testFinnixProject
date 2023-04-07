import * as React from 'react'
import * as RN from 'react-native'
import { database } from '../config/fb'
import { collection, addDoc } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'

export default function Update() {
    const navigation = useNavigation();
  
    const [newUser, setNewUser] = React.useState({
      name: '',
      email: '',
      birth_date: '',
      phone_number: ''
    });
  
    const handleRegister = async () => {
      const apiKey = 'sk_1310e99b2d294229a10e22817899bb20';
      const merchantId = 'mqv9dbsh26houzesz5fg';
      const url = `https://sandbox-api.openpay.mx/v1/${merchantId}/customers`;
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${Buffer.from(`${apiKey}:`).toString('base64')}`
        },
        body: JSON.stringify({
          name: newUser.name,
          email: newUser.email,
          phone_number: newUser.phone_number,
          birth_date: newUser.birth_date,
          requires_account: false,
          external_id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        })
      });
  
      if (response.ok) {
        const json = await response.json();
        console.log(json);
        navigation.goBack();
      } else {
        console.log('Error creating customer', await response.text());
      }
    }
  
    return (
      <RN.View style={styles.container}>
        <RN.Text style={styles.title}>Create user</RN.Text>
        <RN.TextInput
        style={styles.inputContainer}
          placeholder='Full Name'
          onChangeText={fullname => setNewUser({ ...newUser, name: fullname })}
        />
        <RN.TextInput
        style={styles.inputContainer}
          placeholder='Email'
          onChangeText={email => setNewUser({ ...newUser, email })}
        />
        <RN.TextInput
        style={styles.inputContainer}
          placeholder='Birthdate YYYY-MM-DD'
          onChangeText={birthdate => setNewUser({ ...newUser, birth_date: birthdate })}
        />
        <RN.TextInput
        style={styles.inputContainer}
          placeholder='Phone Number'
          onChangeText={phoneNumber => setNewUser({ ...newUser, phone_number: phoneNumber })}
          keyboardType='phone-pad'
        />
        <RN.Button title='Register' onPress={handleRegister} />
      </RN.View>
    );
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