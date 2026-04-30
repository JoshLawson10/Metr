import { Platform } from "react-native";

// ─── Raw palette ────────────────────────────────────────────────────────────
export const Palette = {
  bg: "#0A0A18",
  surface: "#13132A",
  surface2: "#1A1A38",

  accent: "#6047FF",
  accent2: "#3ACFF8",

  text: "#FBF9FF",
  textMuted: "#9A94CC",
  textSubtle: "#4E4A80",

  border: "rgba(251, 249, 255, 0.08)",
  borderHover: "rgba(251, 249, 255, 0.16)",

  onTempo: "#3ACFF8",
  warning: "#FFD166",
  danger: "#FF6B6B",
  safe: "#3ECF8E",

  glass: "rgba(19, 19, 42, 0.72)",
  glassBorder: "rgba(251, 249, 255, 0.10)",
} as const;

// ─── Semantic colours ────────────────────────────────────────────────────────
export const Colors = {
  // Currently a single shared palette for light and dark themes, but structured
  // this way for future flexibility
  // (e.g. if we want to tweak values for light vs dark modes).
  light: {
    background: Palette.bg,
    surface: Palette.surface,
    surfaceRaised: Palette.surface2,
    glass: Palette.glass,

    text: Palette.text,
    textSecondary: Palette.textMuted,
    textDisabled: Palette.textSubtle,

    tint: Palette.accent,
    tintSecondary: Palette.accent2,

    border: Palette.border,
    borderFocus: Palette.borderHover,

    icon: Palette.textMuted,
    tabIconDefault: Palette.textSubtle,
    tabIconSelected: Palette.accent,

    tempo: {
      onTempo: Palette.onTempo,
      warning: Palette.warning,
      danger: Palette.danger,
      safe: Palette.safe,
    },
  },
  dark: {
    background: Palette.bg,
    surface: Palette.surface,
    surfaceRaised: Palette.surface2,
    glass: Palette.glass,

    text: Palette.text,
    textSecondary: Palette.textMuted,
    textDisabled: Palette.textSubtle,

    tint: Palette.accent,
    tintSecondary: Palette.accent2,

    border: Palette.border,
    borderFocus: Palette.borderHover,

    icon: Palette.textMuted,
    tabIconDefault: Palette.textSubtle,
    tabIconSelected: Palette.accent,

    tempo: {
      onTempo: Palette.onTempo,
      warning: Palette.warning,
      danger: Palette.danger,
      safe: Palette.safe,
    },
  },
} as const;

// ─── Typography ──────────────────────────────────────────────────────────────
// Both fonts must be loaded via expo-font before use (see app/_layout.tsx).
// Use the Fonts.body / Fonts.mono references below in StyleSheet definitions.
export const Fonts = {
  body: Platform.select({
    ios: "Roboto",
    android: "Roboto",
    default: "Roboto",
  }) as string,

  mono: Platform.select({
    ios: "FiraMono-Regular",
    android: "FiraMono-Regular",
    default: "FiraMono-Regular",
  }) as string,

  monoBold: Platform.select({
    ios: "FiraMono-Bold",
    android: "FiraMono-Bold",
    default: "FiraMono-Bold",
  }) as string,
} as const;

// ─── Type scale ──────────────────────────────────────────────────────────────
export const TypeScale = {
  h1: 28,
  h2: 22,
  h3: 18,
  p: 14,
  label: 12,
  hint: 11,
} as const;

// ─── Spacing ─────────────────────────────────────────────────────────────────
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

// ─── Border radius ───────────────────────────────────────────────────────────
export const Radius = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;
