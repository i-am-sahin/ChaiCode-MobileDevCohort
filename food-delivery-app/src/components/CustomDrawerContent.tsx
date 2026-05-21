import React from "react";

import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import {
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { ORDERS, USER } from "../data/dummy";
import { Colors, Radius, Spacing, Typography } from "../theme/tokens";

const CustomDrawerContent = (props: any) => {
  const delivered = ORDERS.filter((o) => o.status === "Delivered").length;

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image source={{ uri: USER.avatarUrl }} style={styles.image} />

          <View style={styles.profileMeta}>
            <Text style={styles.name}>{USER.name}</Text>
            <Text style={styles.sub}>{USER.email}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{delivered} orders delivered</Text>
            </View>
          </View>
        </View>
      </View>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.primarySoft,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  profileContainer: {
    flexDirection: "row",
    gap: Spacing.md,
    alignItems: "center",
  },
  profileMeta: {
    flex: 1,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: "#fff",
  },
  name: {
    ...Typography.h2,
    color: Colors.text,
  },
  sub: {
    ...Typography.small,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  badge: {
    marginTop: Spacing.sm,
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: Radius.xl,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  badgeText: {
    ...Typography.small,
    color: Colors.primary,
  },
});