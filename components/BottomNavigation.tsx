import Feather from "@expo/vector-icons/Feather";
import Foundation from "@expo/vector-icons/Foundation";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import React, { useState } from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type FormData = {
  name: string;
  amount: string;
  date: string;
  category: string;
};

type Errors = Partial<FormData>;

const BottomNavigation = () => {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    amount: "",
    date: "",
    category: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  const handleTabClick = (tab: string) => {
    if (tab === "add") {
      setShowForm(!showForm);
    } else {
      setActiveTab(tab);
      setShowForm(false);
    }
  };

  const validate = () => {
    const newErrors: Errors = {};
    const today = new Date().toISOString().split("T")[0];

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.amount) newErrors.amount = "Amount is required";
    else if (Number(formData.amount) <= 0)
      newErrors.amount = "Amount must be greater than 0";
    if (!formData.date) newErrors.date = "Date is required";
    else if (formData.date > today)
      newErrors.date = "Date cannot be in the future";
    if (!formData.category.trim()) newErrors.category = "Category is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log("New Expense:", formData);
      setFormData({ name: "", amount: "", date: "", category: "" });
      setShowForm(false);
    }
  };

  const iconColor = (tab: string) => (tab === activeTab ? "#008080" : "gray");

  return (
    <>
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => handleTabClick("home")}>
          <Foundation name="home" color={iconColor("home")} size={30} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleTabClick("chart")}>
          <Feather name="bar-chart" size={30} color={iconColor("chart")} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleTabClick("add")}
          style={styles.addButton}
        >
          <Ionicons name="add-circle" size={80} color="#008080" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleTabClick("wallet")}>
          <Ionicons
            name="wallet-outline"
            size={36}
            color={iconColor("wallet")}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleTabClick("profile")}>
          <Octicons name="person" size={36} color={iconColor("profile")} />
        </TouchableOpacity>
      </View>

      <Modal visible={showForm} transparent>
        <View style={styles.overlay}>
          <View style={styles.form}>
            <Text style={styles.title}>Add Expense</Text>

            {["name", "amount", "date", "category"].map((field) => (
              <View key={field}>
                <TextInput
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field as keyof FormData]}
                  onChangeText={(value) =>
                    handleChange(field as keyof FormData, value)
                  }
                  style={styles.input}
                />
                {errors[field as keyof Errors] && (
                  <Text style={styles.errorText}>
                    {errors[field as keyof Errors]}
                  </Text>
                )}
              </View>
            ))}

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setShowForm(false);
                  setErrors({});
                  setActiveTab("home");
                }}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
              >
                <Text style={{ color: "white" }}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    alignItems: "center",
  },
  addButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    top: -15,
  },
  overlay: {
    flex: 1,
    backgroundColor: "#000000aa",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
  },
  form: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
    marginBottom: 4,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 6,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#e5e5e5",
    borderRadius: 6,
    marginRight: 8,
  },
  submitButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#14b8a6",
    borderRadius: 6,
  },
});

export default BottomNavigation;
