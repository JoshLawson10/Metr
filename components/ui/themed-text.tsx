import { StyleSheet, Text, type TextProps } from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";
import { Colors, Fonts, TypeScale } from "@/constants/theme";

export type ThemedTextProps = TextProps & {
  color?: keyof typeof Colors.light & keyof typeof Colors.dark;
  type?: keyof typeof Fonts;
  size?: keyof typeof TypeScale;
};

export function ThemedText({
  style,
  color = "text",
  type = "body",
  size = "p",
  ...rest
}: ThemedTextProps) {
  const themeColor = useThemeColor({}, color);

  return (
    <Text
      style={[{ color: themeColor }, styles[type], styles[size], style]}
      {...rest}
    />
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
  bpmMain: {
    fontSize: TypeScale.bpmMain,
    fontWeight: "bold",
    lineHeight: TypeScale.bpmMain * 1.2,
  },
  bpmFull: {
    fontSize: TypeScale.bpmFull,
    fontWeight: "bold",
    lineHeight: TypeScale.bpmFull * 1.2,
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
