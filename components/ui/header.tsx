import { GlassButton } from "@/components/ui/glass-button";
import { ThemedText } from "@/components/ui/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { Spacing } from "@/constants/theme";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

type HeaderButton = {
  icon?: ReactNode;
  text?: string;
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
  const renderButton = (button: HeaderButton | null | undefined) => {
    if (!button) {
      return null;
    }

    return (
      <GlassButton onPress={button.action} style={styles.button}>
        {button.icon}

        {button.text ? <ThemedText>{button.text}</ThemedText> : null}
      </GlassButton>
    );
  };
  return (
    <ThemedView style={styles.container}>
      {renderButton(leftButton)}

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

      {renderButton(rightButton)}
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
    minWidth: 32,
    minHeight: 32,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: Spacing.xs,
  },
});
