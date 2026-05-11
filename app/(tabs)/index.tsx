import React, { useMemo, useState } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { ThemedView } from "@/components/ui/themed-view";
import { Header } from "@/components/home/header";
import {
  BpmReadout,
  getDrift,
  TempoDrift,
} from "@/components/home/bpm-readout";
import {
  SongControls,
  SongControlsAction,
} from "@/components/home/song-controls";
import { TempoHistory } from "@/components/home/tempo-history";
import { Palette, Spacing } from "@/constants/theme";
import { BackgroundGlow } from "@/components/ui/background-glow";

// ─── Placeholder — replace with real detection hook ──────────────────────────
const MOCK_BPM = 122;
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
// ─── Screen ──────────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const [bpm] = useState(MOCK_BPM);
  const [targetBPM] = useState(MOCK_TARGET_BPM);
  const [isDetecting, setIsDetecting] = useState(false);

  const drift = useMemo(() => getDrift(bpm, targetBPM), [bpm, targetBPM]);

  const { width, height } = useWindowDimensions();

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

  return (
    <ThemedView style={styles.container}>
      <BackgroundGlow
        width={width}
        height={height}
        color={getGlowColor(drift)}
      />
      <Header />
      <View style={styles.content}>
        <BpmReadout bpm={bpm} drift={drift} />
        <SongControls
          songName={MOCK_SONG_NAME}
          isDetecting={isDetecting}
          onPress={handleSongControl}
        />
        <TempoHistory data={MOCK_HISTORY} targetBPM={targetBPM} />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl * 2.5,
  },

  content: {
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
    gap: Spacing.xxl,
  },
});
