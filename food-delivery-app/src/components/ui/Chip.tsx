import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import { Colors, Radius, Spacing, Typography } from "../../theme/tokens";

type Props = {
  label: string;
  active?: boolean;
  onPress?: () => void;
};

export default function Chip({ label, active, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        active ? styles.active : styles.inactive,
        pressed && styles.pressed,
      ]}
    >
      <Text
        style={[
          styles.text,
          active ? styles.activeText : styles.inactiveText,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: Radius.xl,
    borderWidth: 1,
  },
  inactive: {
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
  },
  active: {
    backgroundColor: Colors.primarySoft,
    borderColor: Colors.primary,
  },
  pressed: {
    opacity: 0.8,
  },
  text: {
    ...Typography.small,
  },
  inactiveText: {
    color: Colors.textSecondary,
  },
  activeText: {
    color: Colors.primary,
  },
});
