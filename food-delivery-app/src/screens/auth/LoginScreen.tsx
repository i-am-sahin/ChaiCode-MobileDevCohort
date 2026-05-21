import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import AppButton from "../../components/ui/AppButton";
import Card from "../../components/ui/Card";
import Screen from "../../components/ui/Screen";
import { Colors, Radius, Spacing, Typography } from "../../theme/tokens";

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("sahin@example.com");
  const [password, setPassword] = useState("password");

  return (
    <Screen style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.brandIcon}>
          <Ionicons name="fast-food" size={20} color={Colors.primary} />
        </View>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Login to continue ordering</Text>
      </View>

      <Card style={styles.card}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputWrap}>
          <Ionicons name="mail" size={18} color={Colors.textSecondary} />
          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="you@example.com"
            placeholderTextColor={Colors.textSecondary}
            style={styles.input}
          />
        </View>

        <Text style={[styles.label, { marginTop: Spacing.md }]}>Password</Text>
        <View style={styles.inputWrap}>
          <Ionicons name="lock-closed" size={18} color={Colors.textSecondary} />
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="••••••••"
            placeholderTextColor={Colors.textSecondary}
            style={styles.input}
          />
        </View>

        <View style={styles.ctaRow}>
          <AppButton title="Continue" onPress={() => navigation.navigate("Onboarding")} />
        </View>

        <Text style={styles.hint}>
          This is a UI-only demo. Any credentials work.
        </Text>
      </Card>
    </Screen>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    paddingTop: Spacing.xl,
  },
  header: {
    alignItems: "flex-start",
    marginBottom: Spacing.lg,
  },
  brandIcon: {
    width: 46,
    height: 46,
    borderRadius: Radius.lg,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primarySoft,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
  },
  title: {
    ...Typography.title,
    color: Colors.text,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: 6,
  },
  card: {
    marginTop: Spacing.md,
  },
  label: {
    ...Typography.small,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    paddingHorizontal: Spacing.md,
    height: 48,
    borderRadius: Radius.lg,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  input: {
    flex: 1,
    ...Typography.body,
    color: Colors.text,
  },
  ctaRow: {
    marginTop: Spacing.lg,
  },
  hint: {
    ...Typography.small,
    color: Colors.textSecondary,
    marginTop: Spacing.md,
  },
});