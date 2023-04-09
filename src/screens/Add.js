import * as React from "react";
import * as RN from "react-native";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import myImage from "../../assets/RectangleHome.png";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Add() {
  const navigation = useNavigation();

  const [newUser, setNewUser] = React.useState({
    name: "",
    last_name: "",
    email: "",
    phone_number: "",
  });

  const handleRegister = async () => {
    const apiKey = Constants.manifest.extra.apiKey;
    const merchantId = Constants.manifest.extra.merchantId;
    const url = `https://sandbox-api.openpay.mx/v1/${merchantId}/customers`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString(
            "base64"
          )}`,
        },
        body: JSON.stringify({
          name: newUser.name,
          email: newUser.email,
          phone_number: newUser.phone_number,
          last_name: newUser.last_name,
          requires_account: false,
          external_id:
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15),
        }),
      });

      const json = await response.json();

      navigation.goBack();
    } catch (err) {
      console.log("Error creating customer: ", err);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <RN.View style={styles.container}>
        <RN.Image source={myImage} style={styles.backgroundImage} />

        <RN.View style={styles.titleContainer}>
          <RN.Text style={styles.title}>Create user</RN.Text>
        </RN.View>

        <RN.TextInput
          style={styles.inputContainer}
          placeholder="Full Name"
          onChangeText={(fullname) =>
            setNewUser({ ...newUser, name: fullname })
          }
        />
        <RN.TextInput
          style={styles.inputContainer}
          placeholder="Last Name"
          onChangeText={(last_name) =>
            setNewUser({ ...newUser, last_name: last_name })
          }
        />
        <RN.TextInput
          style={styles.inputContainer}
          placeholder="Email"
          onChangeText={(email) => setNewUser({ ...newUser, email })}
        />

        <RN.TextInput
          style={styles.inputContainer}
          placeholder="Phone Number"
          onChangeText={(phoneNumber) =>
            setNewUser({ ...newUser, phone_number: phoneNumber })
          }
          keyboardType="phone-pad"
        />

        <RN.TouchableOpacity
          style={styles.buttonContainer}
          title="Register"
          onPress={handleRegister}
        >
          <RN.Text style={styles.buttonText}> Register</RN.Text>
        </RN.TouchableOpacity>
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
    left: "28%",
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
  backgroundImage: {
    width: "100%",
    position: "relative",
  },
  buttonContainer: {
    backgroundColor: "teal",
    padding: 10,
    marginVertical: 6,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
