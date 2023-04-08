import * as React from "react";
import * as RN from "react-native";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
global.Buffer = global.Buffer || require("buffer").Buffer;
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import loader from "../../assets/loader.jpg";
import myImage from "../../assets/RectangleHome.png";

export default function Get() {
  const navigation = useNavigation();

  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const handleGetUsers = async () => {
    setLoading(true);
    const apiKey = Constants.manifest.extra.apiKey;
    const merchantId = Constants.manifest.extra.merchantId;
    const url = `https://sandbox-api.openpay.mx/v1/${merchantId}/customers`;
    
    try {
      
      const response = await fetch(url, {
        headers: {
          Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString(
            "base64"
          )}`,
        },
      });

      const json = await response.json();
      setUsers(json);
      
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteUser = async (user) => {
    setLoading(true);
    const apiKey = Constants.manifest.extra.apiKey;
    const merchantId = Constants.manifest.extra.merchantId;
    const url = `https://sandbox-api.openpay.mx/v1/${merchantId}/customers/${user.id}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString(
            "base64"
          )}`,
        },
      });

      await response.json();
      handleGetUsers();
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    handleGetUsers();
    setLoading(false);
  }, [users]);

  return (
      <RN.View style={{ flex: 1 }}>
      {loading ? (
          <RN.View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <RN.Image source={loader} style={{ width: 100, height: 100 }} />
        </RN.View>
      ) : (
          <RN.View style={{ flex: 1 }}>
            <RN.ImageBackground source={myImage}>
          <RN.View style={styles.container}>
            <RN.FlatList
            style={{marginBottom:20}}
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
                    <RN.TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Update", { user: item })
                      }
                    >
                      <FontAwesome
                        name="pencil-square-o"
                        size={24}
                        color="black"
                      />
                    </RN.TouchableOpacity>
                    <RN.TouchableOpacity
                      onPress={() =>
                        RN.Alert.alert(
                          "Delete user",
                          "Are you sure you want to delete this user?",
                          [
                            {
                              text: "Cancel",
                              style: "cancel",
                            },
                            {
                              text: "Confirm",
                              onPress: () => handleDeleteUser(item),
                            },
                          ],
                          { cancelable: false }
                        )
                      }
                    >
                      <AntDesign name="delete" size={24} color="black" />
                    </RN.TouchableOpacity>
                  </RN.View>
                  
                  <RN.Text style={styles.name}>Name: {item.name} {item.last_name}</RN.Text>
                  <RN.Text style={styles.email}>Email: {item.email}</RN.Text>
                </RN.View>
              )}
              keyExtractor={(item) => item.id}
            />
            
          </RN.View>
      </RN.ImageBackground>
        </RN.View>
      )}
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
    marginBottom: 10,
  },
  email: {
    fontSize: 15,
    fontWeight: "bold",
    color: "gray",
    marginBottom: 10,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderColor: 'teal'
  },

});
