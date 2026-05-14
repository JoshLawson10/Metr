import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ui/themed-text";
import { GlassCard } from "@/components/ui/glass-card";
import { useIsIOS } from "@/hooks/use-is-ios";
import { Spacing } from "@/constants/theme";

/**
 * Example: Platform-Specific Glass Effects
 *
 * This screen demonstrates how the app automatically uses:
 * - GlassEffect API on iOS (native, hardware-accelerated)
 * - Custom BlurView implementation on Android/Web (cross-platform)
 */
export function GlassEffectExample() {
  const isIOS = useIsIOS();

  return (
    <View style={styles.container}>
      <GlassCard style={styles.card}>
        <ThemedText type="h3" style={styles.title}>
          Glass Effect Detection
        </ThemedText>
        <ThemedText style={styles.text}>
          Platform: {isIOS ? "iOS (using GlassEffect API)" : "Android/Web (using custom implementation)"}
        </ThemedText>
        <ThemedText type="mono" size="label" color="textSecondary" style={styles.note}>
          This text is inside a glass card. The effect is optimized for your platform.
        </ThemedText>
      </GlassCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.lg,
    justifyContent: "center",
  },
  card: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  title: {
    marginBottom: Spacing.sm,
  },
  text: {
    marginBottom: Spacing.sm,
  },
  note: {
    marginTop: Spacing.sm,
    fontStyle: "italic",
  },
});
