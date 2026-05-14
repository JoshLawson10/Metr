import { Platform } from "react-native";

/**
 * Hook to detect if the app is running on iOS
 *
 * On iOS: GlassEffect API is used for native glass morphism effects
 * On Android/Web: Custom BlurView + LinearGradient implementation is used
 */
export const useIsIOS = (): boolean => {
  return Platform.OS === "ios";
};
