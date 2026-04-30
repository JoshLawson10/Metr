import React, { use, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Colors, Spacing } from "@/constants/theme";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from "react-native-reanimated";

// ─── Live pulse dot ──────────────────────────────────────────────────────────
function LiveDot() {
  const opacity = useSharedValue(1);
  const DOT_COLOR = useThemeColor({}, "tint");

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.3, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.3, { duration: 800, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
    );
  }, []);

  const style = useAnimatedStyle(() => ({ opacity: opacity.value }));
  const backgroundColor = StyleSheet.flatten([
    styles.liveDot,
    { backgroundColor: DOT_COLOR },
  ]);

  return <Animated.View style={[backgroundColor, style]} />;
}

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText color="textSecondary" type="mono" size="p">
          LISTENING
        </ThemedText>
        <View style={styles.liveIndicator}>
          <LiveDot />
          <ThemedText color="textSecondary" type="mono" size="p">
            LIVE
          </ThemedText>
        </View>
      </View>
      <ThemedText size="h1">Home Screen</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    paddingHorizontal: Spacing.xl,
    overflow: "hidden",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },

  liveDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },

  liveIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
});
