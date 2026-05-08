import React from "react";
import { View, StyleSheet } from "react-native";
import { Canvas, RadialGradient, Rect, vec } from "@shopify/react-native-skia";
import { ThemedText } from "@/components/themed-text";
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

function getDriftGlowColor(drift: TempoDrift): string {
  switch (drift) {
    case "speeding-up":
      return Palette.warning;
    case "slowing-down":
      return Palette.danger;
    case "maintaining":
      return Palette.accent;
  }
}

const DRIFT_LABELS: Record<TempoDrift, string> = {
  "speeding-up": "Speeding Up",
  "slowing-down": "Slowing Down",
  maintaining: "Steady",
};

// ─── Radial glow ─────────────────────────────────────────────────────────────

const GLOW_SIZE = 320;
const GLOW_CENTER = GLOW_SIZE / 2;

type GlowProps = { color: string };

function BpmGlow({ color }: GlowProps) {
  return (
    <Canvas style={styles.glowCanvas} pointerEvents="none">
      <Rect x={0} y={0} width={GLOW_SIZE} height={GLOW_SIZE}>
        <RadialGradient
          c={vec(GLOW_CENTER, GLOW_CENTER)}
          r={GLOW_CENTER}
          colors={[`${color}40`, `${color}1A`, `${color}00`]}
        />
      </Rect>
    </Canvas>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

type BpmReadoutProps = {
  bpm: number;
  drift: TempoDrift;
};

export function BpmReadout({ bpm, drift }: BpmReadoutProps) {
  const driftColor = useThemeColor({}, getDriftColorKey(drift));
  const glowColor = getDriftGlowColor(drift);
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
      <BpmGlow color={glowColor} />
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
    marginTop: Spacing.xxl,
  },
  glowCanvas: {
    position: "absolute",
    width: GLOW_SIZE,
    height: GLOW_SIZE,
    top: -GLOW_SIZE / 4,
    alignSelf: "center",
    // sits behind the BPM text via z-index default (render order)
  },
  driftRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    marginTop: Spacing.sm,
  },
});
