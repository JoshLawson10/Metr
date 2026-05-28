import { BackgroundGlow } from "@/components/ui/background-glow";
import { Header } from "@/components/ui/header";
import { ThemedSafeAreaView } from "@/components/ui/themed-safe-area-view";
import { ThemedText } from "@/components/ui/themed-text";
import { Spacing } from "@/constants/theme";

import { useRouter } from "expo-router";
import { CheckIcon, ChevronLeftIcon } from "lucide-react-native";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";

export default function AddCustomSongScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [notes, setNotes] = useState("");

  const handleAddSong = () => {
    if (title.trim()) {
      console.log("Adding custom song:", { title, artist, notes });
      router.back();
    }
  };

  return (
    <ThemedSafeAreaView style={styles.container}>
      <BackgroundGlow
        width={width}
        height={height}
        pos={{ x: width / 2, y: height / 2 }}
        color="#4F46E5"
      />

      <Header
        headerText="Add Custom Song"
        textAlignment="center"
        leftButton={{
          icon: <ChevronLeftIcon size={18} color="#fff" />,
          action: () => router.back(),
        }}
        rightButton={{
          icon: <CheckIcon size={18} color="#fff" />,
          action: handleAddSong,
        }}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.formGroup}>
          <ThemedText style={styles.label}>Song Title *</ThemedText>

          <TextInput
            style={styles.input}
            placeholder="Enter song title"
            placeholderTextColor="#888"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.formGroup}>
          <ThemedText style={styles.label}>Artist</ThemedText>

          <TextInput
            style={styles.input}
            placeholder="Enter artist name"
            placeholderTextColor="#888"
            value={artist}
            onChangeText={setArtist}
          />
        </View>

        <View style={styles.formGroup}>
          <ThemedText style={styles.label}>Notes</ThemedText>

          <TextInput
            style={[styles.input, styles.notesInput]}
            placeholder="Add any notes about this song"
            placeholderTextColor="#888"
            value={notes}
            onChangeText={setNotes}
            multiline
          />
        </View>
      </ScrollView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl * 2,
  },

  formGroup: {
    marginBottom: Spacing.lg,
  },

  label: {
    marginBottom: Spacing.sm,
    fontSize: 14,
    fontWeight: "500",
  },

  input: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 12,
    color: "#fff",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },

  notesInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },

  addButton: {
    marginTop: Spacing.lg,
  },

  buttonText: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
});
