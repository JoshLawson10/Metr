import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ThemedView } from "@/components/themed-view";
import { Header } from "@/components/home/header";
import { BpmReadout, getDrift } from "@/components/home/bpm-readout";
import {
  SongControls,
  SongControlsAction,
} from "@/components/home/song-controls";
import { TempoHistory } from "@/components/home/tempo-history";
import { Spacing } from "@/constants/theme";

// TODO: replace with real data from the backend
const MOCK_BPM = 122;
const MOCK_TARGET_BPM = 120;
const MOCK_SONG_NAME = "Song Name";
const MOCK_HISTORY = Array.from({ length: 20 }, (_, i) => ({
  index: i,
  bpm: MOCK_TARGET_BPM + (Math.random() * 6 - 3),
}));

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
