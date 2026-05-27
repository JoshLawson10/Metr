import { StyleSheet, Text, View } from "react-native";

export default function AddCustomSongScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add Custom Song Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    color: "#333",
  },
});
