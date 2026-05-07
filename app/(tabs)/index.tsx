import React, { useState, useEffect, JSX } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Colors, Spacing, TypeScale } from "@/constants/theme";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  TrendingDown,
  TrendingUp,
  Minus,
} from "lucide-react-native";

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

function DriftLabel({ drift }: { drift: TempoDrift }): JSX.Element {
  const color = useThemeColor({}, "textSecondary");
  const iconProps = { size: TypeScale.p, color, strokeWidth: 1.5 };

  const icon =
    drift === "speeding-up" ? (
      <TrendingUp {...iconProps} />
    ) : drift === "slowing-down" ? (
      <TrendingDown {...iconProps} />
    ) : (
      <Minus {...iconProps} />
    );

  const label =
    drift === "speeding-up"
      ? "Speeding Up"
      : drift === "slowing-down"
        ? "Slowing Down"
        : "Steady";

  return (
    <View style={styles.driftRow}>
      {icon}
      <ThemedText type="mono" size="p" color="textSecondary">
        {label}
      </ThemedText>
    </View>
  );
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
  const [isDetecting, setIsDetecting] = useState(false);

  const handlePress = (action: "prev" | "play-pause" | "next") => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    switch (action) {
      case "prev":
        console.log("Previous song");
        break;
      case "play-pause":
        setIsDetecting((prev) => !prev);
        console.log(isDetecting ? "Pausing detection" : "Starting detection");
        break;
      case "next":
        console.log("Next song");
        break;
    }
  };

  return (
    <ThemedView style={styles.container}>
      {/* ===== Header ===== */}
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

      {/* ===== BPM Readout ===== */}
      <ThemedText
        type="monoBold"
        size="bpmMain"
        style={[{ color: useThemeColor({}, driftColor) }, styles.bpmReadout]}
      >
        {bpm}
      </ThemedText>

      {/* ===== Tempo Drift ===== */}
      <DriftLabel drift={drift} />

      {/* ===== Song Name ===== */}
      <ThemedText type="body" size="h2" style={styles.songName}>
        Song Name
      </ThemedText>

      {/* ===== Song Controls ===== */}
      <View style={styles.controlRow}>
        <TouchableOpacity
          style={[
            styles.controlBtn,
            { backgroundColor: useThemeColor({}, "glass") },
          ]}
          onPress={() => handlePress("prev")}
          activeOpacity={0.7}
        >
          <ChevronLeft size={16} color="white" strokeWidth={1} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handlePress("play-pause")}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={[
              useThemeColor({}, "tint"),
              useThemeColor({}, "tintSecondary"),
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.playBtn}
          >
            {isDetecting ? (
              <Pause size={24} color="white" fill="white" />
            ) : (
              <Play size={24} color="white" fill="white" />
            )}
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.controlBtn,
            { backgroundColor: useThemeColor({}, "glass") },
          ]}
          onPress={() => handlePress("next")}
          activeOpacity={0.7}
        >
          <ChevronRight size={16} color="white" strokeWidth={1} />
        </TouchableOpacity>
      </View>
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

  driftRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    marginTop: Spacing.sm,
  },

  driftLabel: {
    display: "flex",
    alignItems: "center",
  },

  songName: {
    marginTop: Spacing.xxl,
    textAlign: "center",
  },

  controlRow: {
    marginTop: Spacing.xxl,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.xl,
    width: "100%",
  },

  controlBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  playBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  controlIcon: {
    fontSize: 16,
    fontWeight: "bold",
  },

  playIcon: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
