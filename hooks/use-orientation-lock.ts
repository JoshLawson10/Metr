import { useFocusEffect } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";
import { useCallback } from "react";

export function useOrientationLock(isLocked: boolean = true) {
  useFocusEffect(
    useCallback(() => {
      if (isLocked) {
        ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT_UP,
        );
      } else {
        ScreenOrientation.unlockAsync();
      }

      return () => {
        ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT_UP,
        );
      };
    }, [isLocked]),
  );
}
