import React, { useState, useEffect } from "react";
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

type TempoDrift = "speeding-up" | "slowing-down" | "maintaining";

function getDrift(bpm: number, targetBPM: number): TempoDrift {
  const variance = bpm - targetBPM;
  const threshold = 3;

  if (Math.abs(variance) <= threshold) {
    return "maintaining";
  } else if (variance > threshold) {
    return "speeding-up";
  } else {
    return "slowing-down";
  }
}

function getDriftColor(
  drift: TempoDrift,
): keyof typeof Colors.light & keyof typeof Colors.dark {
  switch (drift) {
    case "speeding-up":
      return "warningTempo";
    case "slowing-down":
      return "dangerTempo";
    case "maintaining":
      return "safeTempo";
  }
}

function getDriftLabel(drift: TempoDrift) {
  switch (drift) {
    case "speeding-up":
      return "↑ Speeding Up";
    case "slowing-down":
      return "↓ Slowing Down";
    case "maintaining":
      return "Steady";
  }
}

function getCurrentBPM() {
  // Placeholder for actual BPM fetching logic
  return 122;
}

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
  const [bpm, setBpm] = useState(getCurrentBPM());
  const [targetBPM, setTargetBPM] = useState(120);
  const [drift, setDrift] = useState(getDrift(bpm, targetBPM));
  const [driftColor, setDriftColor] = useState(getDriftColor(drift));
  const [driftLabel, setDriftLabel] = useState(getDriftLabel(drift));

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
      <ThemedText
        type="monoBold"
        size="bpmMain"
        style={[{ color: useThemeColor({}, driftColor) }, styles.bpmReadout]}
      >
        {bpm}
      </ThemedText>
      <ThemedText
        type="mono"
        size="p"
        style={{ color: useThemeColor({}, driftColor) }}
      >
        {driftLabel}
      </ThemedText>
      <View></View>
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

  bpmReadout: {
    marginTop: Spacing.xxl,
  },
});
