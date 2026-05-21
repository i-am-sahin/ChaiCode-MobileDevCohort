import React from "react";
import { StyleSheet, View, type ViewProps } from "react-native";

import { Colors, Radius, shadow } from "../../theme/tokens";

type Props = ViewProps & {
  padded?: boolean;
};

export default function Card({ style, padded = true, ...rest }: Props) {
  return <View style={[styles.card, padded && styles.padded, style]} {...rest} />;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    ...shadow("sm"),
  },
  padded: {
    padding: 14,
  },
});
