import MonthContext from "@/context/MonthContext";
import HomeScreen from "@/screens/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";

export default function Index() {
  const Stack = createNativeStackNavigator();
  const [currentMonth, setCurrentMont] = useState("");

  useEffect(() => {
    const month = new Date().toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    setCurrentMont(month);
  });
  return (
    <MonthContext.Provider value={currentMonth}>
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
