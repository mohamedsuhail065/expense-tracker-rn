import MonthContext from "@/context/MonthContext";
import { Picker } from "@react-native-picker/picker";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const TransactionHistory = () => {
  type Transaction = {
    name: string;
    date: string;
    amount: number;
    type: string;
    category: string;
  };
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [sortOrder, setSortOrder] = useState("none");
  const [category, setCategory] = useState("All");
  const [filtered, setFiltered] = useState<Transaction[]>([]);
  const [data, setData] = useState<Transaction[]>([]);
  const { month, setMonth } = useContext(MonthContext);

  const categories = ["All", ...new Set(data.map((tx) => tx.category))];

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/mohamedsuhail065/sample-api/main/expenses.json"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching the JSON data:", error));
  }, []);

  useEffect(() => {
    const filtered = data.filter((tx) => {
      const txMonth = new Date(tx.date).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      return txMonth === month && tx.type === "expense";
    });
    setTransactions(filtered);
  }, [month, data]);

  useEffect(() => {
    //category filtration
    let temp = [...transactions];
    if (category !== "All") {
      temp = temp.filter((tx) => tx.category === category);
    }
    // sorting by amount
    if (sortOrder === "asc") {
      temp.sort((a, b) => a.amount - b.amount);
    } else if (sortOrder === "desc") {
      temp.sort((a, b) => b.amount - a.amount);
    }
    setFiltered(temp);
  }, [transactions, category, sortOrder]);

  return (
    <>
      <View style={styles.container}>
        <Text style={{ fontWeight: 600, fontSize: 18 }}>Expenses</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 12,
            marginBottom: 12,
            marginTop: 6,
          }}
        >
          <Picker
            selectedValue={category}
            onValueChange={(value) => setCategory(value)}
            style={{
              fontSize: 14,
              padding: 4,
              borderWidth: 1,
              borderColor: "rgba(0, 0, 0, 0.1)", // Black with 10% opacity
              borderStyle: "solid",
              borderRadius: 4,
            }}
          >
            {categories.map((cat, Index) => (
              <Picker.Item key={Index} label={cat} value={cat} />
            ))}
          </Picker>
          <Picker
            selectedValue={sortOrder}
            style={{
              fontSize: 14,
              padding: 4,
              borderWidth: 1,
              borderColor: "rgba(0, 0, 0, 0.1)",
              borderStyle: "solid",
              borderRadius: 4,
            }}
            onValueChange={(value) => setSortOrder(value)}
          >
            <Picker.Item value="none" label="Sort by Amount" />
            <Picker.Item value="asc" label="Low to high" />
            <Picker.Item value="desc" label="High  to low" />
          </Picker>
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 8,
            gap: 8,
          }}
        >
          <FlatList
            data={filtered}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ gap: 20 }}
            renderItem={({ item }) => (
              <View
                style={{
                  paddingBottom: 10,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text style={{ display: "flex", gap: 4, fontSize: 16 }}>
                    {item.name}
                  </Text>
                  <Text style={{ fontSize: 14, color: "#6B7280" }}>
                    {item.date}
                  </Text>
                </View>
                <Text
                  style={{ fontSize: 18, color: "#DC2626", fontWeight: 600 }}
                >
                  -${item.amount}
                </Text>
              </View>
            )}
          ></FlatList>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
    marginLeft: 20,
    marginRight: 20,
    fontFamily: "Inter, sans-serif",
  },
});

export default TransactionHistory;
