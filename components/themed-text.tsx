import { StyleSheet, Text, type TextProps } from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";
import { TypeScale } from "@/constants/theme";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "h1" | "h2" | "h3" | "body" | "label" | "hint";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "body",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      style={[
        { color },
        type === "h1" ? styles.h1 : undefined,
        type === "h2" ? styles.h2 : undefined,
        type === "h3" ? styles.h3 : undefined,
        type === "body" ? styles.body : undefined,
        type === "label" ? styles.label : undefined,
        type === "hint" ? styles.hint : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
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
  body: {
    fontSize: TypeScale.body,
    lineHeight: TypeScale.body * 1.2,
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
