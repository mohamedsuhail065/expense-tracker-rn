import MonthContext from "@/context/MonthContext";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const BalanceCard = () => {
  const { month, setMonth } = useContext(MonthContext);
  const [expense, setExpense] = useState(0);
  const [transactions, setTransactions] = useState(0);
  const [data, setData] = useState([
    {
      name: "",
      date: "",
      amount: 0,
      type: "",
      category: "",
    },
  ]);

  const generateLast12Months = () => {
    const months = [];
    const now = new Date();
    for (let i = 0; i < 12; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push(
        d.toLocaleString("default", {
          month: "long",
          year: "numeric",
        })
      );
    }
    return months.reverse();
  };

  const months = generateLast12Months();

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/mohamedsuhail065/sample-api/main/expenses.json"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Response was not ok");
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const filtered = data.filter((tx) => {
      const txMonth = new Date(tx.date).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      return txMonth === month && tx.type === "expense";
    });
    const total = filtered.reduce((sum, tx) => sum + tx.amount, 0);
    setExpense(total);
    setTransactions(filtered.length);
  }, [month,data]);

  const currentIndex = months.indexOf(month);

  const handlePrevMonth = () => {
    if (currentIndex > 0) {
      const prevMonth = months[currentIndex - 1];
      setMonth(prevMonth);
    }
  };

  const handleNextMonth = () => {
    if (currentIndex < months.length - 1) {
      setMonth(months[currentIndex + 1]);
    }
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.balancecard}>
          <View style={styles.month}>
            <Text style={styles.monthlytext}>Monthly Expense</Text>
            <TouchableOpacity onPress={handlePrevMonth} style={{ padding: 1 }}>
              <Entypo name="chevron-small-up" size={16} color={"white"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNextMonth} style={{ padding: 1 }}>
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
          <Text style={{ fontSize: 30, color: "white", fontWeight: 700 }}>
            ${expense.toFixed(2)}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontWeight: 500,
              fontSize: 16,
              color: "white",
              opacity: 0.75,
            }}
          >
            {month}
          </Text>
          <Text
            style={{
              fontWeight: 500,
              fontSize: 16,
              color: "white",
              opacity: 0.75,
            }}
          >
            {transactions} transactions
          </Text>
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
    borderRadius: 10,
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
