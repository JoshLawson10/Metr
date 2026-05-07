import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react-native";
import * as Haptics from "expo-haptics";
import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Spacing, Radius } from "@/constants/theme";

export type SongControlsAction = "prev" | "play-pause" | "next";

type SongControlsProps = {
  songName: string;
  isDetecting: boolean;
  onPress: (action: SongControlsAction) => void;
};

export function SongControls({
  songName,
  isDetecting,
  onPress,
}: SongControlsProps) {
  const glassColor = useThemeColor({}, "glass");
  const tint = useThemeColor({}, "tint");
  const tintSecondary = useThemeColor({}, "tintSecondary");

  const handlePress = (action: SongControlsAction) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress(action);
  };

  return (
    <View style={styles.container}>
      <ThemedText type="body" size="h2" style={styles.songName}>
        {songName}
      </ThemedText>
      <View style={styles.controlRow}>
        <TouchableOpacity
          style={[styles.controlBtn, { backgroundColor: glassColor }]}
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
            colors={[tint, tintSecondary]}
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
          style={[styles.controlBtn, { backgroundColor: glassColor }]}
          onPress={() => handlePress("next")}
          activeOpacity={0.7}
        >
          <ChevronRight size={16} color="white" strokeWidth={1} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: Spacing.xxl,
    width: "100%",
  },
  songName: {
    textAlign: "center",
    marginBottom: Spacing.lg,
  },
  controlRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.xl,
  },
  controlBtn: {
    width: 40,
    height: 40,
    borderRadius: Radius.full,
    justifyContent: "center",
    alignItems: "center",
  },
  playBtn: {
    width: 60,
    height: 60,
    borderRadius: Radius.full,
    justifyContent: "center",
    alignItems: "center",
  },
});
