import * as React from 'react'
import * as RN from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Constants from "expo-constants";

export default function Add() {
    const navigation = useNavigation();
  
    const [newUser, setNewUser] = React.useState({
      name: '',
      email: '',
      birth_date: '',
      phone_number: ''
    });
  
    const handleRegister = async () => {
      const apiKey = Constants.manifest.extra.apiKey;
      const merchantId = Constants.manifest.extra.merchantId;
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

/* export default function Add() {
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
} */

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