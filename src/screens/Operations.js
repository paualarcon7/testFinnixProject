import * as React from 'react'
import * as RN from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function Operations() {
    const navigation = useNavigation();
    return (
        <> 
        <RN.Text>
            Please choose what you want to do:
        </RN.Text>
        <RN.Button title="Create user" onPress={() => navigation.navigate('Add')}/>
        <RN.Button title="Get users" /* onPress={() => navigation.navigate('Get')} *//>
        <RN.Button title="Update user" /* onPress={() => navigation.navigate('Update')} *//>
        <RN.Button title="Delete user" /* onPress={() => navigation.navigate('Delete')} *//>
        </>
    )
}