import { StyleSheet, View, useWindowDimensions } from "react-native";
import { ThemedView } from "@/components/ui/themed-view";
import { ThemedText } from "@/components/ui/themed-text";
import { GlassButton } from "@/components/ui/glass-button";
import { BackgroundGlow } from "@/components/ui/background-glow";
import { Plus } from "lucide-react-native";

export default function SetlistScreen() {
  const { width, height } = useWindowDimensions();

  return (
    <ThemedView style={styles.container}>
      <BackgroundGlow
        width={width}
        height={height}
        pos={{ x: width / 2, y: height / 2 }}
        color="#4F46E5"
      />
      <View style={styles.header}>
        <ThemedText size="h1">Setlist</ThemedText>
        <GlassButton
          onPress={() => {
            console.log("Setlist button pressed");
          }}
        >
          <Plus size={20} strokeWidth={3} color="#fff" />
        </GlassButton>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
