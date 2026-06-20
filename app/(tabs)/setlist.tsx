import { NoSetlistPlaceholder } from "@/components/setlist/no-setlist-placeholder";
import { BackgroundGlow } from "@/components/ui/background-glow";
import { Header } from "@/components/ui/header";
import { ThemedSafeAreaView } from "@/components/ui/themed-safe-area-view";
import { Spacing } from "@/constants/theme";
import { useRouter } from "expo-router";
import { PlusIcon } from "lucide-react-native";
import { useOrientationLock } from "@/hooks/use-orientation-lock";
import { ActionSheetIOS, StyleSheet, useWindowDimensions } from "react-native";

export default function SetlistScreen() {
  useOrientationLock(true);

  const router = useRouter();
  const { width, height } = useWindowDimensions();

  const handlePlusPress = () => {
    const options = ["Cancel", "Add custom song", "Add from library"];
    const cancelButtonIndex = 0;

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        userInterfaceStyle: "dark",
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          router.push("/add-custom-song");
        } else if (buttonIndex === 2) {
          router.push("/library");
        }
      },
    );
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
        headerText="Setlist"
        rightButton={{
          icon: <PlusIcon size={18} strokeWidth={3} color="#fff" />,
          action: handlePlusPress,
        }}
      />

      <NoSetlistPlaceholder />
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: Spacing.xxl * 2.5,
  },
});
