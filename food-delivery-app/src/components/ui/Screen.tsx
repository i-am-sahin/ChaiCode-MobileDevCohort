import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, type ViewProps } from "react-native";

import { Colors, Spacing } from "../../theme/tokens";

type Props = ViewProps & {
  children: React.ReactNode;
};

export default function Screen({ style, children, ...rest }: Props) {
  return (
    <SafeAreaView style={[styles.container, style]} {...rest}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.md,
  },
});
