import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const BalanceCard = () => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.balancecard}>
          <View style={styles.month}>
            <Text style={styles.monthlytext}>Monthly Expense</Text>
            <TouchableOpacity style={{ padding: 1 }}>
              <Entypo name="chevron-small-up" size={16} color={"white"} />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 1 }}>
              <Entypo name="chevron-small-down" size={16} color={"white"} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Feather name="more-horizontal" size={21} color={"white"} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 32,
          }}
        >
          {" "}
          <Text style={{ fontSize: 30, color: "white", fontWeight: 700 }}>
            $2580.00
          </Text>
        </View>
        <View style={{display:"flex",justifyContent:"space-between",flexDirection:"row"}}>
            <Text style={{fontWeight:500,fontSize:16,color:"white", opacity:0.75}}>June 2025</Text>
           <Text style={{fontWeight:500,fontSize:16,color:"white", opacity:0.75}}>5 transactions</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00796B",
    fontFamily: "Inter, sans-serif",
    marginTop: -130,
    minHeight: 190,
    marginLeft: 20,
    padding: 24,
    marginRight: 20,
    borderRadius: 20,
  },
  balancecard: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  month: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  monthlytext: {
    color: "white",
    fontSize: 16,
  },
});

export default BalanceCard;
