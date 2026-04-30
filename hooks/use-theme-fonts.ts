import { useFonts } from "expo-font";

export const useThemeFonts = () => {
  const [fontsLoaded] = useFonts({
    Roboto: require("@/assets/fonts/Roboto-Regular.ttf"),
    "FiraMono-Regular": require("@/assets/fonts/FiraMono-Regular.ttf"),
    "FiraMono-Bold": require("@/assets/fonts/FiraMono-Bold.ttf"),
  });

  return { fontsLoaded };
};
