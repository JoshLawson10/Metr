import { StyleSheet, Text, type TextProps } from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";
import { Fonts, TypeScale } from "@/constants/theme";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "body" | "mono" | "monoBold";
  size?: "h1" | "h2" | "h3" | "p" | "label" | "hint";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "body",
  size = "p",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text style={[{ color }, styles[type], styles[size], style]} {...rest} />
  );
}

const styles = StyleSheet.create({
  body: {
    fontFamily: Fonts.body,
  },
  mono: {
    fontFamily: Fonts.mono,
  },
  monoBold: {
    fontFamily: Fonts.monoBold,
  },
  h1: {
    fontSize: TypeScale.h1,
    fontWeight: "bold",
    lineHeight: TypeScale.h1 * 1.2,
  },
  h2: {
    fontSize: TypeScale.h2,
    fontWeight: "bold",
    lineHeight: TypeScale.h2 * 1.2,
  },
  h3: {
    fontSize: TypeScale.h3,
    fontWeight: "bold",
    lineHeight: TypeScale.h3 * 1.2,
  },
  p: {
    fontSize: TypeScale.p,
    lineHeight: TypeScale.p * 1.2,
  },
  label: {
    fontSize: TypeScale.label,
    fontWeight: "600",
    lineHeight: TypeScale.label * 1.2,
  },
  hint: {
    fontSize: TypeScale.hint,
    lineHeight: TypeScale.hint * 1.2,
  },
});
