import { GlassButton } from "@/components/ui/glass-button";
import { ThemedText } from "@/components/ui/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { Spacing } from "@/constants/theme";
import { StyleSheet, View } from "react-native";

type HeaderButton = {
  text: string;
  action: () => void;
};

type HeaderProps = {
  leftButton?: HeaderButton | null;
  rightButton?: HeaderButton | null;
  headerText: string;
  textAlignment?: "left" | "center" | "right";
};

export function Header({
  leftButton = null,
  rightButton = null,
  headerText,
  textAlignment = "left",
}: HeaderProps) {
  return (
    <ThemedView style={styles.container}>
      {leftButton ? (
        <GlassButton onPress={leftButton.action}>
          <ThemedText>{leftButton.text}</ThemedText>
        </GlassButton>
      ) : null}

      <View style={styles.center}>
        <ThemedText
          size="h1"
          style={[
            styles.headerText,
            {
              textAlign: textAlignment,
            },
          ]}
        >
          {headerText}
        </ThemedText>
      </View>

      {rightButton ? (
        <GlassButton onPress={rightButton.action}>
          <ThemedText>{rightButton.text}</ThemedText>
        </GlassButton>
      ) : null}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },

  center: {
    flex: 1,
  },

  headerText: {
    width: "100%",
  },

  button: {
    paddingVertical: 6,
  },
});
