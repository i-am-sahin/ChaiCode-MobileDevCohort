import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import AppButton from "../../components/ui/AppButton";
import Card from "../../components/ui/Card";
import Screen from "../../components/ui/Screen";
import { ORDERS, USER } from "../../data/dummy";
import { Colors, Radius, Spacing, Typography } from "../../theme/tokens";

type ActionRowProps = {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  title: string;
  subtitle?: string;
  onPress?: () => void;
};

function ActionRow({ icon, title, subtitle, onPress }: ActionRowProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <View style={styles.rowLeft}>
        <View style={styles.rowIcon}>
          <Ionicons name={icon} size={18} color={Colors.primary} />
        </View>
        <View style={styles.rowTextWrap}>
          <Text style={styles.rowTitle}>{title}</Text>
          {subtitle ? <Text style={styles.rowSubtitle}>{subtitle}</Text> : null}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
    </Pressable>
  );
}

const ProfileScreen = ({ navigation }: any) => {
  const deliveredCount = ORDERS.filter((o) => o.status === "Delivered").length;
  const activeCount = ORDERS.filter((o) => o.status === "On the way" || o.status === "Preparing").length;

  return (
    <Screen style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>Manage your account and preferences</Text>

        <Card style={styles.profileCard}>
          <View style={styles.profileTop}>
            <Image source={{ uri: USER.avatarUrl }} style={styles.avatar} />
            <View style={styles.profileMeta}>
              <Text style={styles.name}>{USER.name}</Text>
              <Text style={styles.metaText}>{USER.email}</Text>
              <Text style={styles.metaText}>{USER.phone}</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{deliveredCount}</Text>
              <Text style={styles.statLabel}>Delivered</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{activeCount}</Text>
              <Text style={styles.statLabel}>Active</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>4.8</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>
        </Card>

        <Text style={styles.sectionTitle}>Quick actions</Text>
        <Card padded={false} style={styles.blockCard}>
          <ActionRow
            icon="receipt"
            title="My Orders"
            subtitle="Past orders & invoices"
            onPress={() => navigation.navigate("My Orders")}
          />
          <View style={styles.divider} />
          <ActionRow
            icon="settings"
            title="Settings"
            subtitle="Notifications, privacy"
            onPress={() => navigation.navigate("Settings")}
          />
          <View style={styles.divider} />
          <ActionRow
            icon="help-circle"
            title="Help & Support"
            subtitle="FAQs and contact"
            onPress={() => navigation.navigate("Help")}
          />
        </Card>

        <Text style={styles.sectionTitle}>Addresses</Text>
        <Card style={styles.addressCard}>
          {USER.addresses.map((a, idx) => (
            <View key={a.id} style={[styles.addressRow, idx > 0 && styles.addressRowTop]}>
              <View style={styles.addressIcon}>
                <Ionicons name={a.label === "Work" ? "briefcase" : "home"} size={16} color={Colors.text} />
              </View>
              <View style={styles.addressText}>
                <Text style={styles.addressLabel}>{a.label}</Text>
                <Text style={styles.addressValue}>{a.address}</Text>
              </View>
            </View>
          ))}
        </Card>

        <View style={styles.logoutRow}>
          <AppButton title="Logout (Demo)" variant="secondary" onPress={() => navigation.navigate("Logout")} />
        </View>
      </ScrollView>
    </Screen>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  screen: {
    paddingTop: Spacing.sm,
  },
  content: {
    paddingBottom: Spacing.xxl,
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
  profileCard: {
    marginBottom: Spacing.lg,
  },
  profileTop: {
    flexDirection: "row",
    gap: Spacing.md,
    alignItems: "center",
  },
  avatar: {
    width: 74,
    height: 74,
    borderRadius: 37,
    borderWidth: 2,
    borderColor: Colors.primarySoft,
  },
  profileMeta: {
    flex: 1,
  },
  name: {
    ...Typography.h2,
    color: Colors.text,
  },
  metaText: {
    ...Typography.small,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: "row",
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.sm,
    alignItems: "center",
  },
  statNumber: {
    ...Typography.h2,
    color: Colors.text,
  },
  statLabel: {
    ...Typography.small,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  sectionTitle: {
    ...Typography.h2,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  blockCard: {
    overflow: "hidden",
    borderRadius: Radius.xl,
    marginBottom: Spacing.lg,
  },
  row: {
    padding: Spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    flex: 1,
  },
  rowIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.lg,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primarySoft,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  rowTextWrap: {
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
  addressCard: {
    marginBottom: Spacing.lg,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.md,
  },
  addressRowTop: {
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  addressIcon: {
    width: 36,
    height: 36,
    borderRadius: Radius.lg,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  addressText: {
    flex: 1,
  },
  addressLabel: {
    ...Typography.h3,
    color: Colors.text,
  },
  addressValue: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  logoutRow: {
    marginTop: Spacing.sm,
  },
});