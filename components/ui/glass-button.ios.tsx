import { BlurView } from "expo-blur";
import React, { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

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
  const scale = useSharedValue(1);
  const [isPressed, setIsPressed] = useState(false);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(1.12, {
      damping: 10,
      mass: 1,
      overshootClamping: false,
    });
    setIsPressed(true);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 10,
      mass: 1,
      overshootClamping: false,
    });
    setIsPressed(false);
  };

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          borderRadius: r,
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
        },
        animatedStyle,
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
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

        <View style={styles.content}>{children}</View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",

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

  content: {
    justifyContent: "center",
    alignItems: "center",
  },
});
