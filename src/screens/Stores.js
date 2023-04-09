import * as React from 'react'
import * as RN from 'react-native'
import { useNavigation } from '@react-navigation/native'
global.Buffer = global.Buffer || require('buffer').Buffer;
import Constants from "expo-constants";
import MapView, { Marker } from 'react-native-maps';
import loader from "../../assets/loader.jpg";

export default function Stores() {
    const navigation = useNavigation();
    const [stores, setStores] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [region, setRegion] = React.useState(null);

    
    const getNearbyStores = async () => {
        setLoading(true);
        const lat = 19.3903845; 
        const lon = -99.1665647;
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
        setRegion({
            latitude: lat,
            longitude: lon,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
    }
    
    React.useEffect(() => {
        getNearbyStores(); 
    }, []);
    
    const initialRegion = {
        latitude: 19.3903845,
        longitude: -99.1665647,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
    
      return (
        <>
          {loading ? (
            <RN.View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <RN.Image source={loader} style={{ width: 100, height: 100}}/>
            </RN.View>
          ) : (
            <>
              <MapView style={{ flex: 1 }} initialRegion={initialRegion}>
                {console.log(stores)}
                {stores.map((store) =>(
                
                  <Marker
                    key={store.id}
                    coordinate={{
                      latitude: store.geolocation.lat,
                      longitude: store.geolocation.lng,
                    }}
                    title={store.name}
                    description={`${store.address.line1}`}
                  />
                ))}
              </MapView>
            </>
          )}
        </>
      );
}





