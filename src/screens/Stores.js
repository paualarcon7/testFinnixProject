import * as React from 'react'
import * as RN from 'react-native'
import { useNavigation } from '@react-navigation/native'
global.Buffer = global.Buffer || require('buffer').Buffer;


export default function Stores() {
    const navigation = useNavigation();
    const [stores, setStores] = React.useState([]);
    
    const getNearbyStores = async () => {
        const lat = 19.3903845; // latitude
        const lon = -99.1665647; // longitude
        const apiKey = 'sk_1310e99b2d294229a10e22817899bb20';
        const url = `https://sandbox-api.openpay.mx/v1/stores?latitud=${lat}&longitud=${lon}`;
        
        const response = await fetch(url, {
            headers: {
                'Authorization': `Basic ${Buffer.from('sk_1310e99b2d294229a10e22817899bb20:').toString('base64')}`

            }
        });
        
        const json = await response.json();
        console.log(json)
        setStores(json);
    }
    
    React.useEffect(() => {
        getNearbyStores();
    }, []);
    
    return (
        <> 
        <RN.Text>
            Nearby Stores:
        </RN.Text>
        <RN.Button title="Back Home" onPress={() => navigation.navigate('Home')}/>
        <RN.FlatList 
            data={stores}
            renderItem={({ item }) => (
                <RN.Text>{item.name}</RN.Text>
            )}
            keyExtractor={item => item.id}
        />
        </>
    )
}





