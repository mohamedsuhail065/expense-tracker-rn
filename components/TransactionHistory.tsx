import MonthContext from "@/context/MonthContext";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

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
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
              <option key={Index} >{cat}</option>
            ))}
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{
              fontSize: 14,
              padding: 4,
              borderWidth: 1,
              borderColor: "rgba(0, 0, 0, 0.1)",
              borderStyle: "solid",
              borderRadius: 4,
            }}
          >
            <option value={"none"}>Sort by Amount</option>
            <option value={"asc"}>Low to high</option>
            <option value={"desc"}>High to low  </option>
          </select>
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 8,
            gap:8,
          }}
        >
          {filtered.map((t) => (
            <li
              key={t.name}
              style={{ fontSize: 16, paddingBottom: 10, fontWeight: 500 }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{display:"flex",gap:4}}>
                  <span>{t.name}</span>
                  <span style={{ fontSize: 14, color: "#6B7280" }}>
                    {t.date}
                  </span>
                </View>
                <View>
                  <span style={{ fontSize: 18, color: "#DC2626" ,fontWeight:600}}>
                    -${t.amount}
                  </span>
                </View>
              </View>
            </li>
          ))}
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
