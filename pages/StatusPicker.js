import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as Notifications from "expo-notifications";

const StatusPicker = () => {
  const [status, setStatus] = useState("");
  const [partnerStatus, setPartnerStatus] = useState("studying");

  useEffect(() => {
    const interval = setInterval(() => {
      setPartnerStatus(Math.random() > 0.5 ? "studying" : "relaxing");
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    Notifications.requestPermissionsAsync().then((status) => {
      if (status.granted) {
        Notifications.getExpoPushTokenAsync().then((token) =>
          console.log("Expo Push Token:", token.data)
        );

        const notificationListener =
          Notifications.addNotificationReceivedListener(handleNotification);

        return () => {
          notificationListener.remove();
        };
      }
    });
  }, []);

  async function handleNotification() {
    setPartnerStatus(Math.random() > 0.5 ? "studying" : "relaxing");
  }

  async function sendNotification() {
    await Notifications.presentNotificationAsync({
      title: "Partner's status has changed",
      body: `Your partner is now ${partnerStatus}`,
    });
  }

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
      {status !== "" && (
        <Pressable style={styles.button} onPress={resetButton}>
          <Text style={{ fontSize: 16 }}>Set New Status</Text>
        </Pressable>
      )}
      <Pressable style={styles.button} onPress={sendNotification}>
        <Text style={{ fontSize: 16 }}>Send Notification</Text>
      </Pressable>
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
