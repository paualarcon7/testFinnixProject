import * as React from "react";
import * as RN from "react-native";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import myImage from "../../assets/RectangleHome.png";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Update({ route }) {
    const { user } = route.params;
  const navigation = useNavigation();
  const [userData, setUserData] = React.useState(user);

  const [newData, setNewData] = React.useState({
    name: userData.name,
    email: userData.email,
    last_name: userData.last_name,
    phone_number: userData.phone_number,
  });
  

  const handleEditUser = async () => {
    const apiKey = Constants.manifest.extra.apiKey;
      const merchantId = Constants.manifest.extra.merchantId;
    const url = `https://sandbox-api.openpay.mx/v1/${merchantId}/customers/${user.id}`;

    try {
        const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`,
      },
      body: JSON.stringify({
        name: newData.name,
        email: newData.email,
        phone_number: newData.phone_number,
        last_name: newData.last_name,
      }),
    });

    const json = await response.json();

    navigation.navigate("Get");
    } catch (err) {
        console.log("Error updating user: ",err);
        navigation.navigate("Get");
    }
    
  };

  return (
  <KeyboardAwareScrollView>  
    <RN.View style={styles.container}>

    <RN.Image source={myImage} style={styles.backgroundImage} /> 

    <RN.View style={styles.titleContainer}>
      <RN.Text style={styles.title}>Edit user:</RN.Text>
      </RN.View>
      
      <RN.TextInput
        value={newData.name}
        style={styles.inputContainer}
        onChangeText={(name) => setNewData({ ...newData, name: name })}
      />

        <RN.TextInput
        style={styles.inputContainer}
        value={newData.last_name}
        onChangeText={(last_name) =>
            setNewData({ ...newData, last_name: last_name })
        }
        />
      <RN.TextInput
        style={styles.inputContainer}
        value={newData.email}
        onChangeText={(email) => setNewData({ ...newData, email: email })}
      />

      <RN.TextInput
        style={styles.inputContainer}
        value={newData.phone_number}
        onChangeText={(phoneNumber) =>
          setNewData({ ...newData, phone_number: phoneNumber })
        }
        keyboardType="phone-pad"
      />
      
      <RN.View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
      <RN.TouchableOpacity
        title="Save"
        onPress={handleEditUser}
        style={styles.button}
      >
        <RN.Text style={styles.buttonText}>Save</RN.Text>
      </RN.TouchableOpacity>

      <RN.TouchableOpacity title="Cancel" onPress={() => navigation.goBack()} style={styles.button}>
        <RN.Text style={styles.buttonText}>Cancel</RN.Text>
      </RN.TouchableOpacity>
      
      </RN.View>
    </RN.View>
    </KeyboardAwareScrollView>
  );
}

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    position: "absolute",
    justifyContent: "center",
    lineHeight: 80,
    left: "30%",
    right: "20%",
  },
  inputContainer: {
    width: "90%",
    padding: 13,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
  },
  button: {
    backgroundColor: "#0FA5E9",
    padding: 10,
    marginVertical: 6,
    borderRadius: 8,
    alignItems: "center",
    margin: 10
    
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  backgroundImage: {
    width: "100%",
    position: "relative",
  },
  titleContainer: {
    width: "100%",
    position: "absolute",
    left: 0,
    right: 0,
    top: "24.26%",
    bottom: "0.01%",
    backgroundColor: "#FFFFFF",
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    borderBottomLeftRadius: 60,
  },
});
