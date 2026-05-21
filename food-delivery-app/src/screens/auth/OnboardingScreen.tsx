import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import AppButton from "../../components/ui/AppButton";
import Card from "../../components/ui/Card";
import Screen from "../../components/ui/Screen";
import { Colors, Radius, Spacing, Typography } from "../../theme/tokens";

const FEATURES = [
  {
    icon: "time" as const,
    title: "Fast delivery",
    desc: "Real-time tracking for your orders.",
  },
  {
    icon: "restaurant" as const,
    title: "Curated restaurants",
    desc: "Popular picks and best sellers.",
  },
  {
    icon: "pricetags" as const,
    title: "Great deals",
    desc: "Offers & discounts (dummy UI).",
  },
];

const OnboardingScreen = ({ navigation }: any) => {
  return (
    <Screen style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Card padded={false} style={styles.heroCard}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80",
            }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay} />
          <View style={styles.heroText}>
            <Text style={styles.heroTitle}>Food delivered,
              <Text style={styles.heroAccent}> fresh</Text>
            </Text>
            <Text style={styles.heroSubtitle}>Order from your favourites in minutes.</Text>
          </View>
        </Card>

        <View style={styles.features}>
          {FEATURES.map((f) => (
            <Card key={f.title} style={styles.featureCard}>
              <View style={styles.featureTop}>
                <View style={styles.featureIcon}>
                  <Ionicons name={f.icon} size={18} color={Colors.primary} />
                </View>
                <Text style={styles.featureTitle}>{f.title}</Text>
              </View>
              <Text style={styles.featureDesc}>{f.desc}</Text>
            </Card>
          ))}
        </View>

        <View style={styles.cta}>
          <AppButton title="Start ordering" onPress={() => navigation.navigate("MainTabs")} />
          <Text style={styles.hint}>Demo app with dummy content and UI.</Text>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  screen: {
    paddingTop: Spacing.sm,
  },
  content: {
    paddingBottom: Spacing.xxl,
  },
  heroCard: {
    borderRadius: Radius.xl,
    overflow: "hidden",
  },
  heroImage: {
    height: 280,
    width: "100%",
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  heroText: {
    position: "absolute",
    left: Spacing.md,
    right: Spacing.md,
    bottom: Spacing.md,
  },
  heroTitle: {
    ...Typography.title,
    color: "#fff",
  },
  heroAccent: {
    color: Colors.primary,
  },
  heroSubtitle: {
    ...Typography.body,
    color: "rgba(255,255,255,0.9)",
    marginTop: 8,
  },
  features: {
    marginTop: Spacing.lg,
    gap: Spacing.md,
  },
  featureCard: {
    gap: 8,
  },
  featureTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.lg,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primarySoft,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  featureTitle: {
    ...Typography.h2,
    color: Colors.text,
    flex: 1,
  },
  featureDesc: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  cta: {
    marginTop: Spacing.lg,
    gap: 10,
  },
  hint: {
    ...Typography.small,
    color: Colors.textSecondary,
    textAlign: "center",
  },
});