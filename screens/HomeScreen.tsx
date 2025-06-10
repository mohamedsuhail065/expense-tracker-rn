import BalanceCard from "@/components/BalanceCard";
import BottomNavigation from "@/components/BottomNavigation";
import Header from "@/components/Header";
import TransactionHistory from "@/components/TransactionHistory";
import React from "react";

const HomeScreen = () => {
  return (
    <>
      <Header />
      <BalanceCard />
      <TransactionHistory />
      <BottomNavigation/>
    </>
  );
};

export default HomeScreen;
