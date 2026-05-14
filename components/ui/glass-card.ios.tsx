import { BlurView } from "expo-blur";
import React, { useState } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { Glass, Radius } from "@/constants/theme";

type GlassCardProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  borderRadius?: number;
  blurRadius?: number;
  tintOpacity?: number;
  onPress?: () => void;
};

export function GlassCard({
  children,
  style,
  borderRadius = Radius.lg,
  onPress,
}: GlassCardProps) {
  const r = borderRadius;
  const scale = useSharedValue(1);
  const [isPressed, setIsPressed] = useState(false);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    if (onPress) {
      scale.value = withSpring(0.98, {
        damping: 12,
        mass: 1,
        overshootClamping: false,
      });
      setIsPressed(true);
    }
  };

  const handlePressOut = () => {
    if (onPress) {
      scale.value = withSpring(1, {
        damping: 12,
        mass: 1,
        overshootClamping: false,
      });
      setIsPressed(false);
    }
  };

  const content = (
    <View style={[styles.wrapper, { borderRadius: r }, style]}>
      <BlurView
        intensity={isPressed ? 95 : 85}
        tint="dark"
        style={[
          StyleSheet.absoluteFillObject,
          {
            borderRadius: r,
          },
        ]}
        pointerEvents="none"
      />

      <View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFillObject,
          {
            borderRadius: r,
            borderWidth: 0.75,
            borderColor: Glass.border,
          },
        ]}
      />

      <View style={{ borderRadius: r }}>{children}</View>
    </View>
  );

  if (!onPress) {
    return content;
  }

  return (
    <Animated.View
      style={animatedStyle}
      onTouchStart={handlePressIn}
      onTouchEnd={handlePressOut}
      onTouchCancel={handlePressOut}
    >
      {content}
    </Animated.View>
  );
}

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
});
