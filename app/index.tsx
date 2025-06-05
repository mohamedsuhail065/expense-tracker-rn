import HomeScreen from "@/screens/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function Index() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
