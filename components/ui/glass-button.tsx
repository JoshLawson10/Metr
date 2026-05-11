import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

import { Glass, Radius } from "@/constants/theme";

type GlassButtonProps = {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  size?: number;
  borderRadius?: number;
  activeOpacity?: number;
};

export function GlassButton({
  children,
  onPress,
  style,
  size = 40,
  borderRadius = Radius.full,
  activeOpacity = 0.75,
}: GlassButtonProps) {
  const r = borderRadius;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={activeOpacity}
      style={[
        styles.wrapper,
        {
          width: size,
          height: size,
          borderRadius: r,
        },
        style,
      ]}
    >
      {/* Backdrop blur */}
      <BlurView
        intensity={24}
        tint="dark"
        style={[
          StyleSheet.absoluteFillObject,
          {
            borderRadius: r,
          },
        ]}
        pointerEvents="none"
      />

      {/* Specular highlight */}
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

      {/* Inner edge highlight */}
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

      {/* Soft glow */}
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
      <View style={styles.content}>{children}</View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "rgba(255,255,255,0.05)",

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

  content: {
    justifyContent: "center",
    alignItems: "center",
  },
});
