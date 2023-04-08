import * as React from 'react'
import * as RN from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function Home() {
    const navigation = useNavigation();
    return (
        <> 
        <RN.Text>
            Home page!
        </RN.Text>
        <RN.Button title="Create a new User" onPress={() => navigation.navigate('Add')}/>
        <RN.Button title="List all users" onPress={() => navigation.navigate('Get')}/>
        <RN.Button title="Nearby Stores" onPress={() => navigation.navigate('Stores')}/>
        </>
    )
}