import MonthContext from "@/context/MonthContext";
import HomeScreen from "@/screens/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";

export default function Index() {
  const Stack = createNativeStackNavigator();
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return now.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
  });
  return (
    <MonthContext.Provider value={{ month, setMonth }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </MonthContext.Provider>
  );
}
