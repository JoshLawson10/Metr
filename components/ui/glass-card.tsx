import React from "react";
import { View, StyleSheet, ViewStyle, StyleProp } from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

import { Glass, Radius } from "@/constants/theme";

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
}: GlassCardProps) {
  const r = borderRadius;

  return (
    <View style={[styles.wrapper, { borderRadius: r }, style]}>
      {/* Backdrop blur */}
      <BlurView
        intensity={28}
        tint="dark"
        style={[
          StyleSheet.absoluteFillObject,
          {
            borderRadius: r,
          },
        ]}
        pointerEvents="none"
      />

      {/* Specular / inner highlight */}
      <LinearGradient
        colors={[
          "rgba(255,255,255,0.22)",
          "rgba(255,255,255,0.08)",
          "rgba(255,255,255,0.02)",
          "transparent",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.7, y: 0.7 }}
        style={[
          StyleSheet.absoluteFillObject,
          styles.specular,
          {
            borderRadius: r,
          },
        ]}
        pointerEvents="none"
      />

      {/* Sharp inner edge highlight */}
      <View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFillObject,
          {
            borderRadius: r,
            borderTopWidth: 1,
            borderLeftWidth: 1,
            borderColor: "rgba(255,255,255,0.28)",
            opacity: 0.9,
          },
        ]}
      />

      {/* Soft inset glow */}
      <View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFillObject,
          {
            borderRadius: r,

            shadowColor: "#FFFFFF",
            shadowOpacity: 0.18,
            shadowRadius: 8,
            shadowOffset: {
              width: 0,
              height: 0,
            },
          },
        ]}
      />

      {/* Border */}
      <View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFillObject,
          {
            borderRadius: r,
            borderWidth: 0.75,
            borderColor: "rgba(255,255,255,0.14)",
          },
        ]}
      />

      {/* Content */}
      <View style={{ borderRadius: r }}>{children}</View>
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
    overflow: "hidden",
  },
});
