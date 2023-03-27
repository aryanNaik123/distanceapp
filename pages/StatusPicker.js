import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";

const StatusPicker = () => {
  const [status, setStatus] = useState("");
  const [partnerStatus, setPartnerStatus] = useState("studying");
  function resetButton() {
    setStatus("");
  }
  return (
    <View style={styles.container}>
      <Text>Your Partner's Status: {partnerStatus}</Text>
      <Text style={styles.title}>Set your status 💞</Text>
      <Text style={styles.title2}>{status}</Text>
      {status === "" && (
        <Picker
          style={styles.picker}
          selectedValue={status}
          onValueChange={(itemValue) => setStatus(itemValue)}
        >
          <Picker.Item label="Studying ✍️" value="Studying ✍️" />
          <Picker.Item label="In Class" value="In Class" />
          <Picker.Item label="Relaxing" value="Relaxing" />
        </Picker>
      )}
      {status != "" && (
        <Pressable style={styles.button} onPress={resetButton}>
          <Text style={{ "fontSize": 16 }}>Set New Status</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7dd3fc",
    marginTop: 10,
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  title2: {
    fontSize: 24,
    marginTop: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  picker: {
    height: 50,
    width: "100%",
  },
});

export default StatusPicker;
