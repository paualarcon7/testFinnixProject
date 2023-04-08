import * as React from "react";
import * as RN from "react-native";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";

export default function Update({ route }) {
    const { user } = route.params;
  const navigation = useNavigation();

  const [newData, setNewData] = React.useState({
    name: "",
    email: "",
    birth_date: "",
    phone_number: "",
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
        birth_date: newData.birth_date,
      }),
    });

    const json = await response.json();

    navigation.navigate("Get");
    } catch (err) {
        console.log(err);
        navigation.navigate("Get");
    }
    
  };

  return (
    <RN.View style={styles.container}>
      <RN.Text style={styles.title}>Edit user:</RN.Text>

      <RN.TextInput
        placeholder="Full Name"
        style={styles.inputContainer}
        onChangeText={(name) => setNewData({ ...newData, name: name })}
      />

      <RN.TextInput
        style={styles.inputContainer}
        placeholder="Email"
        onChangeText={(email) => setNewData({ ...newData, email: email })}
      />

      <RN.TextInput
        style={styles.inputContainer}
        placeholder="Birthdate YYYY-MM-DD"
        onChangeText={(birthdate) =>
          setNewData({ ...newData, birth_date: birthdate })
        }
      />
      <RN.TextInput
        style={styles.inputContainer}
        placeholder="Phone Number"
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
});
