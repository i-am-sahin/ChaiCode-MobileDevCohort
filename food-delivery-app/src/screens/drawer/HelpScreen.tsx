import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import Card from "../../components/ui/Card";
import Screen from "../../components/ui/Screen";
import { Colors, Radius, Spacing, Typography } from "../../theme/tokens";

const FAQ = [
  {
    q: "Where is my order?",
    a: "Open Orders tab to see live status (demo data).",
    icon: "bicycle" as const,
  },
  {
    q: "I want to change my address",
    a: "Go to Profile → Addresses (demo).",
    icon: "location" as const,
  },
  {
    q: "Refund & cancellations",
    a: "Refunds depend on restaurant and delivery status (demo text).",
    icon: "refresh-circle" as const,
  },
  {
    q: "Payment issues",
    a: "Try a different method or re-place the order (demo).",
    icon: "card" as const,
  },
];

const HelpScreen = () => {
  return (
    <Screen style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Help & Support</Text>
        <Text style={styles.subtitle}>We’re here to help</Text>

        <Card style={styles.contactCard}>
          <View style={styles.contactTop}>
            <View style={styles.contactIcon}>
              <Ionicons name="chatbubble-ellipses" size={18} color={Colors.primary} />
            </View>
            <View style={styles.contactText}>
              <Text style={styles.contactTitle}>Chat support (Demo)</Text>
              <Text style={styles.contactSubtitle}>Available 10 AM – 10 PM</Text>
            </View>
          </View>
          <Pressable style={({ pressed }) => [styles.contactBtn, pressed && styles.pressed]}>
            <Text style={styles.contactBtnText}>Start chat</Text>
            <Ionicons name="arrow-forward" size={16} color={Colors.primary} />
          </Pressable>
        </Card>

        <Text style={styles.sectionTitle}>FAQs</Text>
        <Card padded={false} style={styles.faqCard}>
          {FAQ.map((f, idx) => (
            <View key={f.q}>
              <View style={styles.faqRow}>
                <View style={styles.faqIcon}>
                  <Ionicons name={f.icon} size={18} color={Colors.primary} />
                </View>
                <View style={styles.faqText}>
                  <Text style={styles.faqQ}>{f.q}</Text>
                  <Text style={styles.faqA}>{f.a}</Text>
                </View>
              </View>
              {idx < FAQ.length - 1 ? <View style={styles.divider} /> : null}
            </View>
          ))}
        </Card>
      </ScrollView>
    </Screen>
  );
};

export default HelpScreen;

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
  contactCard: {
    marginBottom: Spacing.lg,
  },
  contactTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  contactIcon: {
    width: 44,
    height: 44,
    borderRadius: Radius.lg,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primarySoft,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  contactText: {
    flex: 1,
  },
  contactTitle: {
    ...Typography.h2,
    color: Colors.text,
  },
  contactSubtitle: {
    ...Typography.small,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  contactBtn: {
    marginTop: Spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    paddingVertical: 12,
    paddingHorizontal: Spacing.md,
  },
  contactBtnText: {
    ...Typography.body,
    color: Colors.primary,
  },
  sectionTitle: {
    ...Typography.h2,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  faqCard: {
    overflow: "hidden",
    borderRadius: Radius.xl,
  },
  faqRow: {
    padding: Spacing.md,
    flexDirection: "row",
    gap: Spacing.md,
    alignItems: "flex-start",
  },
  faqIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.lg,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primarySoft,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  faqText: {
    flex: 1,
  },
  faqQ: {
    ...Typography.h3,
    color: Colors.text,
  },
  faqA: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: 6,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
  },
  pressed: {
    opacity: 0.85,
  },
});