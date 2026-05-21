import type { ViewStyle } from "react-native";

export const Colors = {
  background: "#FFFFFF",
  surface: "#F7F7FB",
  card: "#FFFFFF",
  text: "#121417",
  textSecondary: "#5B6472",
  border: "#E6E8EE",
  primary: "#FF6347",
  primarySoft: "#FFE8E3",
  success: "#16A34A",
  warning: "#F59E0B",
  danger: "#EF4444",
} as const;

export const Spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 22,
  xl: 28,
  xxl: 36,
} as const;

export const Radius = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
} as const;

export const Typography = {
  title: { fontSize: 28, lineHeight: 34, fontWeight: "800" as const },
  h2: { fontSize: 20, lineHeight: 26, fontWeight: "800" as const },
  h3: { fontSize: 16, lineHeight: 22, fontWeight: "800" as const },
  body: { fontSize: 15, lineHeight: 22, fontWeight: "600" as const },
  small: { fontSize: 13, lineHeight: 18, fontWeight: "600" as const },
} as const;

export function shadow(level: "sm" | "md" = "sm"): ViewStyle {
  if (level === "sm") {
    return {
      shadowColor: "#0B0F1A",
      shadowOpacity: 0.08,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 6 },
      elevation: 3,
    };
  }

  return {
    shadowColor: "#0B0F1A",
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 5,
  };
}
