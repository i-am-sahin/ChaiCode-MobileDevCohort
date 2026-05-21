import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { Pressable, StyleSheet, Switch, Text, View } from "react-native";

import Card from "../../components/ui/Card";
import Screen from "../../components/ui/Screen";
import { Colors, Radius, Spacing, Typography } from "../../theme/tokens";

type ToggleRowProps = {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  title: string;
  subtitle: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
};

function ToggleRow({ icon, title, subtitle, value, onValueChange }: ToggleRowProps) {
  return (
    <View style={styles.toggleRow}>
      <View style={styles.toggleLeft}>
        <View style={styles.iconBox}>
          <Ionicons name={icon} size={18} color={Colors.primary} />
        </View>
        <View style={styles.toggleText}>
          <Text style={styles.rowTitle}>{title}</Text>
          <Text style={styles.rowSubtitle}>{subtitle}</Text>
        </View>
      </View>

      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#D1D5DB", true: Colors.primary }}
        thumbColor={"#FFFFFF"}
      />
    </View>
  );
}

const SettingsScreen = () => {
  const [push, setPush] = useState(true);
  const [offers, setOffers] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Screen style={styles.screen}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Personalize your experience</Text>

      <Card padded={false} style={styles.block}>
        <ToggleRow
          icon="notifications"
          title="Push notifications"
          subtitle="Order updates and delivery status"
          value={push}
          onValueChange={setPush}
        />
        <View style={styles.divider} />
        <ToggleRow
          icon="pricetags"
          title="Offers & discounts"
          subtitle="Get deals tailored for you"
          value={offers}
          onValueChange={setOffers}
        />
        <View style={styles.divider} />
        <ToggleRow
          icon="moon"
          title="Dark mode (demo)"
          subtitle="UI switch is mock-only here"
          value={darkMode}
          onValueChange={setDarkMode}
        />
      </Card>

      <Text style={styles.sectionTitle}>Account</Text>
      <Card padded={false} style={styles.block}>
        <Pressable style={({ pressed }) => [styles.linkRow, pressed && styles.pressed]}>
          <View style={styles.toggleLeft}>
            <View style={styles.iconBox}>
              <Ionicons name="shield-checkmark" size={18} color={Colors.primary} />
            </View>
            <View style={styles.toggleText}>
              <Text style={styles.rowTitle}>Privacy</Text>
              <Text style={styles.rowSubtitle}>Permissions and data</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
        </Pressable>
        <View style={styles.divider} />
        <Pressable style={({ pressed }) => [styles.linkRow, pressed && styles.pressed]}>
          <View style={styles.toggleLeft}>
            <View style={styles.iconBox}>
              <Ionicons name="card" size={18} color={Colors.primary} />
            </View>
            <View style={styles.toggleText}>
              <Text style={styles.rowTitle}>Payments</Text>
              <Text style={styles.rowSubtitle}>UPI, cards, wallets</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
        </Pressable>
      </Card>
    </Screen>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  screen: {
    paddingTop: Spacing.sm,
  },
  title: {
    ...Typography.title,
    color: Colors.text,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: 4,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    ...Typography.h2,
    color: Colors.text,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  block: {
    overflow: "hidden",
    borderRadius: Radius.xl,
  },
  toggleRow: {
    padding: Spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.md,
  },
  linkRow: {
    padding: Spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.md,
  },
  toggleLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    flex: 1,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: Radius.lg,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primarySoft,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  toggleText: {
    flex: 1,
  },
  rowTitle: {
    ...Typography.h3,
    color: Colors.text,
  },
  rowSubtitle: {
    ...Typography.small,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
  },
  pressed: {
    opacity: 0.85,
  },
});