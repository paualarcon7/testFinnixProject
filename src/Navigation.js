import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Home from "./screens/Home";
import Add from "./screens/Add";
import Stores from "./screens/Stores";
import Get from "./screens/Get";
import Update from "./screens/Update";


const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Stores" component={Stores} options={{presentation: 'modal'}}/>
      <Stack.Screen name="Add" component={Add}/>
      <Stack.Screen name="Get" component={Get}/>
      <Stack.Screen name="Update" component={Update} options={{presentation: 'modal'}}/>
  
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
