import { ThemedText } from "@/components/ui/themed-text";
import { StyleSheet, View } from "react-native";

export function NoSetlistPlaceholder() {
  return (
    <View style={styles.header}>
      <ThemedText size="h2" style={{ marginBottom: 10 }}>
        No Songs
      </ThemedText>
      <ThemedText type="mono" size="p" style={{ opacity: 0.6 }}>
        Tap the + to add a new song
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
