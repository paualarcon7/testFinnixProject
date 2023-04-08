import * as React from "react";
import * as RN from "react-native";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
global.Buffer = global.Buffer || require("buffer").Buffer;
import { AntDesign, FontAwesome } from "@expo/vector-icons";

export default function Get() {
  const navigation = useNavigation();

  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const handleGetUsers = async () => {
    setLoading(true);
    const apiKey = Constants.manifest.extra.apiKey;
    const merchantId = Constants.manifest.extra.merchantId;
    const url = `https://sandbox-api.openpay.mx/v1/${merchantId}/customers`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`,
      },
    });

    const json = await response.json();
    setUsers(json);
    setLoading(false);
  };

  React.useEffect(() => {
    handleGetUsers();
  }, []);

  return (
    <RN.View>
      <RN.View style={styles.container}>
        {loading ? (
          <RN.Text>Loading...</RN.Text>
        ) : (
          <>
            <RN.FlatList
              data={users}
              renderItem={({ item }) => (
                <RN.View style={styles.card}>
                  <RN.View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: 10,
                    }}
                  >
                    <FontAwesome
                      name="pencil-square-o"
                      size={24}
                      color="black"
                    />
                    <AntDesign name="delete" size={24} color="black" />
                  </RN.View>
                  <RN.Text style={styles.name}>Name: {item.name}</RN.Text>
                  <RN.Text style={styles.email}>Email: {item.email}</RN.Text>
                </RN.View>
              )}
              keyExtractor={(item) => item.id}
            />
            <RN.TouchableOpacity
              title="Back Home"
              onPress={() => navigation.navigate("Home")}
              style={styles.button}>
                <RN.Text style={styles.buttonText}>Back home</RN.Text>
            </RN.TouchableOpacity>
          </>
        )}
      </RN.View>
    </RN.View>
  );

}

const styles = RN.StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 8,
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10
  },
  email: {
    fontSize: 15,
    fontWeight: "bold",
    color: "gray",
    marginBottom: 10
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#0FA5E9',
    padding: 10,
    marginVertical: 6,
    borderRadius: 8,
    alignItems: 'center'
},
buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
},
});
