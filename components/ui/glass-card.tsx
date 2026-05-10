import React from "react";
import { View, StyleSheet, ViewStyle, StyleProp, Platform } from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Glass, Radius, Spacing } from "@/constants/theme";

// ─── Types ────────────────────────────────────────────────────────────────────

type GlassCardProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  borderRadius?: number;
  blurRadius?: number;
  tintOpacity?: number;
};

export function GlassCard({
  children,
  style,
  borderRadius = Radius.lg,
  blurRadius = 20,
  tintOpacity = 0.22,
  ...props
}: GlassCardProps) {
  const r = borderRadius;

  return (
    <View style={[styles.wrapper, { borderRadius: r }, style]}>
      {/* ── Glass layer 1: backdrop blur ── */}
      <BlurView
        intensity={28}
        tint="dark"
        style={[StyleSheet.absoluteFill, { borderRadius: r }]}
        pointerEvents="none"
      />

      {/* ── Glass layer 2: specular gradient (top-left edge highlight) ── */}
      <LinearGradient
        colors={[
          "rgba(255,255,255,0.14)",
          "rgba(255,255,255,0.04)",
          "rgba(255,255,255,0.00)",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.7, y: 0.7 }}
        style={[StyleSheet.absoluteFill, styles.specular, { borderRadius: r }]}
        pointerEvents="none"
      />

      {/* ── Glass layer 3: inset border highlight ── */}
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            borderRadius: r,
            borderWidth: 0.75,
            borderColor: "rgba(255,255,255,0.18)",
          },
        ]}
        pointerEvents="none"
      />

      {/* ── Layer 5: Content ── */}
      <View style={[{ borderRadius: r }]}>{children}</View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    overflow: "hidden",

    borderWidth: 1,
    borderColor: Glass.border,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 24,

    elevation: 20,
  },
  specular: {
    position: "absolute",
    inset: 0,

    borderWidth: 1,

    borderTopColor: Glass.specularStrong,
    borderLeftColor: Glass.specularSoft,

    borderRightColor: "rgba(255,255,255,0.06)",
    borderBottomColor: "rgba(255,255,255,0.03)",
  },
});
