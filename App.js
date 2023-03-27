import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, View } from "react-native";
import StatusPicker from "./pages/StatusPicker";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusPicker />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
