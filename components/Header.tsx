import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Header = () => {
  const [greeting, setGreeting] = useState("");
  const updateGreeting = () => {
    const now = new Date();
    const hours = now.getHours();
    if (hours < 12) {
      setGreeting("Good Morning,");
    } else if (hours < 17) {
      setGreeting("Good Afternoon,");
    } else {
      setGreeting("Good Evening,");
    }
  };
  useEffect(() => {
    updateGreeting();
    const intervalId = setInterval(() => updateGreeting(), 1000);
    return () => clearInterval(intervalId);
  });

  return (
    <>
      <View style={styles.container}>
        <View style={styles.greeting}>
          <View style={styles.greeting1}>
            <View>
              <Text style={styles.greetingtext}>{greeting}</Text>
              <Text style={styles.greetingtext1}>Mohamed Suhail</Text>
            </View>
            <TouchableOpacity style={styles.notification}>
              <Image
                source={require("../assets/images/bell.png")}
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#008080",
    minHeight: 230,
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
  },
  greeting: {
    paddingInline: 14,
    paddingBottom: 24,
  },
  greeting1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  greetingtext: {
    fontSize: 14,
    color: "white",
  },
  greetingtext1: {
    fontSize: 20,
    color: "white",
    fontWeight: 600,
  },
  notification: {
    padding: 4,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius:10,
    backgroundColor:"rgba(255, 255, 255, 0.1)"

  },
});

export default Header;
