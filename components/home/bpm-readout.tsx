import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ui/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Colors, Palette, Spacing, TypeScale } from "@/constants/theme";
import { TrendingUp, TrendingDown, Minus } from "lucide-react-native";

// ─── Types & helpers ─────────────────────────────────────────────────────────

export type TempoDrift = "speeding-up" | "slowing-down" | "maintaining";

export function getDrift(bpm: number, targetBPM: number): TempoDrift {
  const delta = bpm - targetBPM;
  if (Math.abs(delta) <= 3) return "maintaining";
  return delta > 0 ? "speeding-up" : "slowing-down";
}

export function getDriftColorKey(
  drift: TempoDrift,
): keyof typeof Colors.light & keyof typeof Colors.dark {
  switch (drift) {
    case "speeding-up":
      return "warningTempo";
    case "slowing-down":
      return "dangerTempo";
    case "maintaining":
      return "safeTempo";
  }
}

const DRIFT_LABELS: Record<TempoDrift, string> = {
  "speeding-up": "Speeding Up",
  "slowing-down": "Slowing Down",
  maintaining: "Steady",
};

// ─── Component ───────────────────────────────────────────────────────────────

type BpmReadoutProps = {
  bpm: number;
  drift: TempoDrift;
};

export function BpmReadout({ bpm, drift }: BpmReadoutProps) {
  const driftColor = useThemeColor({}, getDriftColorKey(drift));
  const iconColor = useThemeColor({}, "textSecondary");
  const iconProps = { size: TypeScale.p, color: iconColor, strokeWidth: 1.5 };

  const DriftIcon =
    drift === "speeding-up" ? (
      <TrendingUp {...iconProps} />
    ) : drift === "slowing-down" ? (
      <TrendingDown {...iconProps} />
    ) : (
      <Minus {...iconProps} />
    );

  return (
    <View style={styles.container}>
      <ThemedText type="monoBold" size="bpmMain" style={{ color: driftColor }}>
        {bpm}
      </ThemedText>
      <View style={styles.driftRow}>
        {DriftIcon}
        <ThemedText type="mono" size="p" color="textSecondary">
          {DRIFT_LABELS[drift]}
        </ThemedText>
      </View>
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
  },
  driftRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
});
