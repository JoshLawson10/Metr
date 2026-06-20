import {
  BpmReadout,
  getDrift,
  TempoDrift,
} from "@/components/home/bpm-readout";
import { Header } from "@/components/home/header";
import {
  SongControls,
  SongControlsAction,
} from "@/components/home/song-controls";
import { TempoHistory } from "@/components/home/tempo-history";
import { BackgroundGlow } from "@/components/ui/background-glow";
import { ThemedSafeAreaView } from "@/components/ui/themed-safe-area-view";
import { Palette, Spacing } from "@/constants/theme";
import { useOrientationLock } from "@/hooks/use-orientation-lock";
import React, { useMemo, useState } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

const MOCK_BPM = 125;
const MOCK_TARGET_BPM = 120;
const MOCK_SONG_NAME = "Song Name";
const MOCK_HISTORY = Array.from({ length: 20 }, (_, i) => ({
  index: i,
  bpm: MOCK_TARGET_BPM + (Math.random() * 6 - 3),
}));

function getGlowColor(drift: TempoDrift): string {
  switch (drift) {
    case "speeding-up":
      return Palette.warning;
    case "slowing-down":
      return Palette.danger;
    case "maintaining":
      return Palette.accent;
  }
}

export default function HomeScreen() {
  useOrientationLock(false);

  const [bpm] = useState(MOCK_BPM);
  const [targetBPM] = useState(MOCK_TARGET_BPM);
  const [isDetecting, setIsDetecting] = useState(false);

  const drift = useMemo(() => getDrift(bpm, targetBPM), [bpm, targetBPM]);

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const handleSongControl = (action: SongControlsAction) => {
    switch (action) {
      case "play-pause":
        setIsDetecting((prev) => !prev);
        break;
      case "prev":
        // TODO: navigate to previous song in setlist
        break;
      case "next":
        // TODO: navigate to next song in setlist
        break;
    }
  };

  const PortraitLayout = () => (
    <View style={styles.portraitContent}>
      <BpmReadout bpm={bpm} drift={drift} />
      <SongControls
        songName={MOCK_SONG_NAME}
        isDetecting={isDetecting}
        onPress={handleSongControl}
      />
      <TempoHistory data={MOCK_HISTORY} targetBPM={targetBPM} />
    </View>
  );

  const LandscapeLayout = () => (
    <View style={styles.landscapeContainer}>
      <View style={styles.mainSection}>
        <View style={styles.bpmSection}>
          <Text style={styles.driftLabel}>
            {drift === "speeding-up"
              ? "FAST"
              : drift === "slowing-down"
                ? "SLOW"
                : "ON TEMPO"}
          </Text>
          <Text style={styles.bpmValue}>{Math.round(bpm)}</Text>
        </View>

        <View style={styles.indicators}>
          <View style={styles.indicatorItem}>
            <Text style={styles.indicatorLabel}>HIGH</Text>
            <Text style={[styles.indicatorValue, styles.highValue]}>122</Text>
          </View>
          <View style={styles.indicatorItem}>
            <Text style={styles.indicatorLabel}>TARGET</Text>
            <Text style={[styles.indicatorValue, styles.targetValue]}>
              {targetBPM}
            </Text>
          </View>
          <View style={styles.indicatorItem}>
            <Text style={styles.indicatorLabel}>LOW</Text>
            <Text style={[styles.indicatorValue, styles.lowValue]}>108</Text>
          </View>
        </View>
      </View>

      <View style={styles.graphSection}>
        <TempoHistory data={MOCK_HISTORY} targetBPM={targetBPM} />
      </View>
    </View>
  );

  return (
    <ThemedSafeAreaView style={styles.container}>
      <BackgroundGlow
        width={width}
        height={height}
        pos={{ x: width / 2, y: height / 2 }}
        color={getGlowColor(drift)}
      />
      {!isLandscape && <Header />}
      {isLandscape ? <LandscapeLayout /> : <PortraitLayout />}
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl * 2.5,
  },

  portraitContent: {
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
    gap: Spacing.xxl,
  },

  // Landscape styles matching your screenshot
  landscapeContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.xl,
  },

  mainSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.xxl,
  },

  bpmSection: {
    alignItems: "center",
    gap: Spacing.md,
  },

  driftLabel: {
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: 2,
    color: Palette.accent,
    textTransform: "uppercase",
  },

  bpmValue: {
    fontSize: 120,
    fontWeight: "800",
    color: Palette.textMuted,
    fontFamily: "monospace",
  },

  indicators: {
    flexDirection: "row",
    gap: Spacing.xl * 2,
    marginTop: Spacing.lg,
  },

  indicatorItem: {
    alignItems: "center",
    gap: Spacing.xs,
  },

  indicatorLabel: {
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 1,
    color: Palette.textMuted,
    textTransform: "uppercase",
  },

  indicatorValue: {
    fontSize: 32,
    fontWeight: "700",
    fontFamily: "monospace",
  },

  highValue: {
    color: Palette.warning,
  },

  targetValue: {
    color: Palette.accent,
  },

  lowValue: {
    color: Palette.danger,
  },

  graphSection: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
  },
});
