import * as React from 'react'
import * as RN from 'react-native'
import { useNavigation } from '@react-navigation/native'
global.Buffer = global.Buffer || require('buffer').Buffer;
import Constants from "expo-constants";


export default function Stores() {
    const navigation = useNavigation();
    const [stores, setStores] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    
    const getNearbyStores = async () => {
        setLoading(true);
        const lat = 19.3903845; // latitude
        const lon = -99.1665647; // longitude
        const apiKey = Constants.manifest.extra.apiKey;
        const kilometers = 20;
        const amount = 10000;

        const url = `https://sandbox-api.openpay.mx/stores?latitud=${lat}&longitud=${lon}&kilometers=${kilometers}&amount=${amount}`;
        
        const response = await fetch(url, {
            headers: {
                'Authorization': `Basic ${Buffer.from(`${apiKey}:`).toString('base64')}`

            }
        });
        
        const json = await response.json();
        
        setStores(json);
        setLoading(false);
    }
    
    React.useEffect(() => {
        getNearbyStores(); 
    }, []);
    
    return (
        <> 
        <RN.Text>
            Nearby Stores:
        </RN.Text>
        
        {loading? ( 
        <RN.Text>
        Loading...
    </RN.Text>)
        :
       ( 
        <>
        <RN.FlatList 
            data={stores}
            renderItem={({ item }) => (
                <RN.Text>{item.name}</RN.Text>
                )}
            keyExtractor={item => item.id}
        />
        <RN.Button title="Back Home" onPress={() => navigation.navigate('Home')}/>
        </>
        )}
        </>
    )
}





