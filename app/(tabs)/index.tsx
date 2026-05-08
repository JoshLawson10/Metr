import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, useWindowDimensions } from "react-native";
import { Canvas, RadialGradient, Rect, vec } from "@shopify/react-native-skia";
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

// ─── Placeholder — replace with real detection hook ──────────────────────────
const MOCK_BPM = 122;
const MOCK_TARGET_BPM = 120;
const MOCK_SONG_NAME = "Song Name";
const MOCK_HISTORY = Array.from({ length: 20 }, (_, i) => ({
  index: i,
  bpm: MOCK_TARGET_BPM + (Math.random() * 6 - 3),
}));

// ─── Background glow ─────────────────────────────────────────────────────────

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

type BackgroundGlowProps = { drift: TempoDrift };

function BackgroundGlow({ drift }: BackgroundGlowProps) {
  const { width, height } = useWindowDimensions();
  const color = getGlowColor(drift);
  const cx = width / 2;
  const cy = height * 0.38; // sit roughly behind the BPM number

  return (
    <Canvas
      style={[StyleSheet.absoluteFill, { width, height }]}
      pointerEvents="none"
    >
      <Rect x={0} y={0} width={width} height={height}>
        <RadialGradient
          c={vec(cx, cy)}
          r={width * 0.72}
          colors={[`${color}30`, `${color}12`, `${color}00`]}
        />
      </Rect>
    </Canvas>
  );
}

// ─── Screen ──────────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const [bpm] = useState(MOCK_BPM);
  const [targetBPM] = useState(MOCK_TARGET_BPM);
  const [isDetecting, setIsDetecting] = useState(false);

  const drift = useMemo(() => getDrift(bpm, targetBPM), [bpm, targetBPM]);

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
      <BackgroundGlow drift={drift} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Header />
        <BpmReadout bpm={bpm} drift={drift} />
        <SongControls
          songName={MOCK_SONG_NAME}
          isDetecting={isDetecting}
          onPress={handleSongControl}
        />
        <TempoHistory data={MOCK_HISTORY} targetBPM={targetBPM} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
});
