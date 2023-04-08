import * as React from "react";
import * as RN from "react-native";
import { useNavigation } from "@react-navigation/native";
import myImage from "../../assets/RectangleHome.png";

export default function Home() {
  const navigation = useNavigation();

  return (
    <>
      <RN.Image source={myImage} style={{ width: 450, height: 340 }} />
      <RN.View style={styles.container}>
        <RN.Text style={styles.title}>Welcome</RN.Text>
        <RN.View style={styles.groupButton}>
          <RN.TouchableOpacity
            style={styles.buttonContainer}
            title="Create a new User"
            onPress={() => navigation.navigate("Add")}
          >
            <RN.Text style={styles.buttonText}>Create a New User</RN.Text>
          </RN.TouchableOpacity>

          <RN.TouchableOpacity
            style={styles.buttonContainer}
            title="List all users"
            onPress={() => navigation.navigate("Get")}
          >
            <RN.Text style={styles.buttonText}>
            List all Users
            </RN.Text>
          </RN.TouchableOpacity>

          <RN.TouchableOpacity style={styles.buttonContainer} title="Nearby Stores"
              onPress={() => navigation.navigate("Stores")}>
            <RN.Text
              style={styles.buttonText}
            >List nearby Stores</RN.Text>
          </RN.TouchableOpacity>
        </RN.View>
      </RN.View>
    </>
  );
}

const styles = RN.StyleSheet.create({
  container: {
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
    borderBottomLeftRadius: 60,
  },
  title: {
    fontSize: 30,
    left: "33.07%",
    right: "32.8%",
    top: "10%",
    fontWeight: "700",
    lineHeight: 43,
    display: "flex",
    alignItems: "center",
    position: "absolute",
    justifyContent: "center",
    bottom: "63.67%",
    fontStyle: "normal",
    color: "black",
  },
  groupButton: {
    top: "20%",
    margin: 20,
    padding: 30,
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
