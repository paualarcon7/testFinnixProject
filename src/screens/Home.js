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
        <RN.Button title="go to add screen" onPress={() => navigation.navigate('Add')}/>
        <RN.Button title="Nearby Stores" onPress={() => navigation.navigate('Stores')}/>
        </>
    )
}