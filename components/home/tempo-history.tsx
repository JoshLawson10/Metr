import React from "react";
import { View, StyleSheet } from "react-native";
import { CartesianChart, Line, Area } from "victory-native";
import {
  LinearGradient as SkiaLinearGradient,
  vec,
  useFont,
} from "@shopify/react-native-skia";
import { ThemedText } from "@/components/ui/themed-text";
import { GlassCard } from "../ui/glass-card";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Palette, Spacing } from "@/constants/theme";

// ─── Constants ────────────────────────────────────────────────────────────────

const CHART_HEIGHT = 160;
const BORDER_RADIUS = 16;

// ─── Types ────────────────────────────────────────────────────────────────────

type TempoDataPoint = {
  index: number;
  bpm: number;
};

type TempoHistoryProps = {
  data: TempoDataPoint[];
  targetBPM: number;
};

// ─── Component ────────────────────────────────────────────────────────────────

export function TempoHistory({ data, targetBPM }: TempoHistoryProps) {
  const borderFocusColor = useThemeColor({}, "borderFocus");
  const textSecondaryColor = useThemeColor({}, "textSecondary");

  const font = useFont(require("@/assets/fonts/FiraMono-Regular.ttf"), 11);

  const minBPM = targetBPM - 10;
  const maxBPM = targetBPM + 10;
  const tickValues = Array.from(
    { length: (maxBPM - minBPM) / 5 + 1 },
    (_, i) => minBPM + i * 5,
  );

  return (
    <View style={styles.wrapper}>
      <GlassCard style={{ padding: Spacing.lg }}>
        <ThemedText type="monoBold" size="p">
          HISTORY
        </ThemedText>
        <View style={styles.chartContainer}>
          <CartesianChart
            data={data}
            xKey="index"
            yKeys={["bpm"]}
            padding={12}
            domain={{ y: [minBPM - 0.1, maxBPM] }}
            yAxis={[
              {
                font,
                tickValues,
                labelOffset: 8,
                lineWidth: 1,
                lineColor: borderFocusColor,
                labelColor: textSecondaryColor,
                formatYLabel: (value) => {
                  const delta = value - targetBPM;
                  if (delta === 0) return `${targetBPM}`;
                  return delta > 0 ? `+${delta}` : `${delta}`;
                },
              },
            ]}
          >
            {({ points, chartBounds }) => (
              <>
                <Area
                  points={points.bpm}
                  y0={chartBounds.bottom}
                  animate={{ type: "timing", duration: 300 }}
                >
                  <SkiaLinearGradient
                    start={vec(0, chartBounds.top)}
                    end={vec(0, chartBounds.bottom)}
                    colors={[`${Palette.accent}72`, `${Palette.accent}0D`]}
                  />
                </Area>
                <Line
                  points={points.bpm}
                  animate={{ type: "timing" }}
                  color={Palette.accent}
                  strokeWidth={2}
                />
              </>
            )}
          </CartesianChart>
        </View>
      </GlassCard>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    borderRadius: BORDER_RADIUS,
    overflow: "hidden",
  },
  blur: {
    borderRadius: BORDER_RADIUS,
  },
  specular: {
    borderRadius: BORDER_RADIUS,
  },
  border: {
    borderRadius: BORDER_RADIUS,
    borderWidth: 0.75,
    borderColor: "rgba(255,255,255,0.18)",
  },
  content: {
    padding: Spacing.lg,
  },
  chartContainer: {
    marginTop: Spacing.sm,
    height: CHART_HEIGHT,
    width: "100%",
  },
});
