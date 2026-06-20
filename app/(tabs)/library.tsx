import { BackgroundGlow } from "@/components/ui/background-glow";
import { GlassButton } from "@/components/ui/glass-button";
import { GlassCard } from "@/components/ui/glass-card";
import { Header } from "@/components/ui/header";
import { ThemedSafeAreaView } from "@/components/ui/themed-safe-area-view";
import { ThemedText } from "@/components/ui/themed-text";
import { Palette, Radius, Spacing, TypeScale } from "@/constants/theme";
import { useOrientationLock } from "@/hooks/use-orientation-lock";
import { useRouter } from "expo-router";
import { ChevronLeftIcon, PlusIcon } from "lucide-react-native";
import { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";

interface Song {
  id: string;
  title: string;
  artist: string;
  bpm: number;
  albumImage: string;
}

const MOCK_SONGS: Song[] = [
  {
    id: "1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    bpm: 103,
    albumImage: "https://via.placeholder.com/80",
  },
  {
    id: "2",
    title: "Good as Hell",
    artist: "Lizzo",
    bpm: 90,
    albumImage: "https://via.placeholder.com/80",
  },
  {
    id: "3",
    title: "Anti-Hero",
    artist: "Taylor Swift",
    bpm: 124,
    albumImage: "https://via.placeholder.com/80",
  },
  {
    id: "4",
    title: "As It Was",
    artist: "Harry Styles",
    bpm: 174,
    albumImage: "https://via.placeholder.com/80",
  },
  {
    id: "5",
    title: "Levitating",
    artist: "Dua Lipa",
    bpm: 103,
    albumImage: "https://via.placeholder.com/80",
  },
  {
    id: "6",
    title: "Blinding Lights",
    artist: "The Weeknd",
    bpm: 103,
    albumImage: "https://via.placeholder.com/80",
  },
  {
    id: "7",
    title: "Good as Hell",
    artist: "Lizzo",
    bpm: 90,
    albumImage: "https://via.placeholder.com/80",
  },
  {
    id: "8",
    title: "Anti-Hero",
    artist: "Taylor Swift",
    bpm: 124,
    albumImage: "https://via.placeholder.com/80",
  },
  {
    id: "9",
    title: "As It Was",
    artist: "Harry Styles",
    bpm: 174,
    albumImage: "https://via.placeholder.com/80",
  },
  {
    id: "10",
    title: "Levitating",
    artist: "Dua Lipa",
    bpm: 103,
    albumImage: "https://via.placeholder.com/80",
  },
];

export default function LibraryScreen() {
  useOrientationLock(true);

  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSongs, setFilteredSongs] = useState(MOCK_SONGS);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filtered = MOCK_SONGS.filter(
      (song) =>
        song.title.toLowerCase().includes(text.toLowerCase()) ||
        song.artist.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredSongs(filtered);
  };

  const renderSongItem = ({ item }: { item: Song }) => (
    <GlassCard style={styles.songCard}>
      <View style={styles.songContent}>
        <Image source={{ uri: item.albumImage }} style={styles.albumImage} />

        <View style={styles.songInfo}>
          <ThemedText size="p" style={styles.songTitle} numberOfLines={1}>
            {item.title}
          </ThemedText>
          <ThemedText size="label" style={styles.artistName} numberOfLines={1}>
            {item.artist}
          </ThemedText>
          <View style={styles.bpmContainer}>
            <ThemedText size="label" style={styles.bpmText}>
              {item.bpm} BPM
            </ThemedText>
          </View>
        </View>

        <GlassButton onPress={() => {}} size={40}>
          <PlusIcon size={18} strokeWidth={3} color={"#fff"} />
        </GlassButton>
      </View>
    </GlassCard>
  );

  return (
    <ThemedSafeAreaView style={styles.container}>
      <BackgroundGlow
        width={width}
        height={height}
        pos={{ x: width / 2, y: height / 2 }}
        color="#4F46E5"
      />

      <Header
        headerText="Library"
        leftButton={{
          icon: <ChevronLeftIcon size={18} color="#fff" />,
          action: () => router.push("/(tabs)/setlist"),
        }}
      />

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search songs or artists"
          placeholderTextColor={Palette.textMuted}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <FlatList
        data={filteredSongs}
        renderItem={renderSongItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        scrollEnabled={true}
        nestedScrollEnabled={true}
      />
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    zIndex: 10,
  },
  searchInput: {
    backgroundColor: Palette.glass,
    borderWidth: 1,
    borderColor: Palette.glassBorder,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    color: Palette.text,
    fontSize: TypeScale.p,
    fontFamily: "Roboto",
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    paddingBottom: Spacing.xxl * 2,
    gap: Spacing.md,
  },
  songCard: {
    marginBottom: Spacing.xs,
  },
  songContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  albumImage: {
    width: 64,
    height: 64,
    borderRadius: Radius.md,
    backgroundColor: Palette.surface,
  },
  songInfo: {
    flex: 1,
    justifyContent: "center",
  },
  songTitle: {
    color: Palette.text,
    fontWeight: "600",
    marginBottom: Spacing.xs,
  },
  artistName: {
    color: Palette.textMuted,
    marginBottom: Spacing.xs,
  },
  bpmContainer: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(96, 71, 255, 0.2)",
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.sm,
  },
  bpmText: {
    color: Palette.accent2,
    fontWeight: "500",
  },
  addButton: {
    marginLeft: Spacing.sm,
  },
});
