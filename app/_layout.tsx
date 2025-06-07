import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";

export default function RootLayout() {
  const [time, setTime] = useState("");
  const updateTime = () => {
    const now = new Date();
    const timestring = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setTime(timestring);
  };

  useEffect(() => {
    updateTime();
    const interval = setInterval(() => updateTime(), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Stack
      screenOptions={{
        headerStyle: styles.header,
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTitle: () => <Text style={{ color: "white" }}>{time}</Text>,
      }}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#008080",
    elevation: 0,
    shadowOpacity: 0,
    shadowColor: "transparent",
    borderBottomWidth: 0,
  },
});
