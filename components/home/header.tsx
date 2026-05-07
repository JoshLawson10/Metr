import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from "react-native-reanimated";
import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Spacing } from "@/constants/theme";

export function Header() {
  return (
    <View style={styles.header}>
      <ThemedText color="textSecondary" type="mono" size="p">
        LISTENING
      </ThemedText>
      <View style={styles.liveIndicator}>
        <LiveDot />
        <ThemedText color="textSecondary" type="mono" size="p">
          LIVE
        </ThemedText>
      </View>
    </View>
  );
}

function LiveDot() {
  const opacity = useSharedValue(1);
  const dotColor = useThemeColor({}, "tint");

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.3, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.3, { duration: 800, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      style={[styles.liveDot, { backgroundColor: dotColor }, animatedStyle]}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  liveIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  liveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
