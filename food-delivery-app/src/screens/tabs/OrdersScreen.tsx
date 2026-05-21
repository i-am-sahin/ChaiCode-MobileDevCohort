import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import Card from "../../components/ui/Card";
import Screen from "../../components/ui/Screen";
import { ORDERS, type Order } from "../../data/dummy";
import { Colors, Radius, Spacing, Typography } from "../../theme/tokens";
import { formatMoneyINR } from "../../utils/format";

function statusStyles(status: Order["status"]) {
  if (status === "Delivered") {
    return { bg: "#E7F7ED", fg: Colors.success, icon: "checkmark-circle" as const };
  }
  if (status === "On the way") {
    return { bg: "#EEF2FF", fg: "#4F46E5", icon: "bicycle" as const };
  }
  if (status === "Preparing") {
    return { bg: "#FFF7ED", fg: Colors.warning, icon: "restaurant" as const };
  }
  return { bg: "#FFECEC", fg: Colors.danger, icon: "close-circle" as const };
}

const OrdersScreen = () => {
  const renderItem = ({ item }: { item: Order }) => {
    const st = statusStyles(item.status);
    const firstTwo = item.items.slice(0, 2).map((i) => `${i.qty}× ${i.name}`).join(" · ");
    const more = item.items.length > 2 ? ` +${item.items.length - 2} more` : "";

    return (
      <Card style={styles.card}>
        <View style={styles.cardTopRow}>
          <View style={styles.cardTitleWrap}>
            <Text style={styles.restaurant}>{item.restaurantName}</Text>
            <Text style={styles.time}>{item.placedAt}</Text>
          </View>
          <View style={[styles.statusPill, { backgroundColor: st.bg }]}
          >
            <Ionicons name={st.icon} size={14} color={st.fg} />
            <Text style={[styles.statusText, { color: st.fg }]}>{item.status}</Text>
          </View>
        </View>

        <Text style={styles.itemsPreview} numberOfLines={1}>
          {firstTwo}
          {more}
        </Text>

        <View style={styles.cardBottomRow}>
          <Text style={styles.total}>{formatMoneyINR(item.total)}</Text>
          <Pressable style={({ pressed }) => [styles.actionBtn, pressed && styles.pressed]}>
            <Text style={styles.actionText}>Reorder</Text>
            <Ionicons name="arrow-forward" size={16} color={Colors.primary} />
          </Pressable>
        </View>
      </Card>
    );
  };

  return (
    <Screen style={styles.screen}>
      <Text style={styles.title}>Orders</Text>
      <Text style={styles.subtitle}>Track and reorder your favourites</Text>

      <FlatList
        data={ORDERS}
        keyExtractor={(o) => o.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </Screen>
  );
};

export default OrdersScreen;

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
  listContent: {
    paddingBottom: Spacing.xxl,
  },
  card: {
    marginBottom: Spacing.md,
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: Spacing.sm,
  },
  cardTitleWrap: {
    flex: 1,
  },
  restaurant: {
    ...Typography.h2,
    color: Colors.text,
  },
  time: {
    ...Typography.small,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statusText: {
    ...Typography.small,
  },
  itemsPreview: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
  },
  cardBottomRow: {
    marginTop: Spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  total: {
    ...Typography.h3,
    color: Colors.text,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: Radius.md,
    backgroundColor: Colors.primarySoft,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  actionText: {
    ...Typography.body,
    color: Colors.primary,
  },
  pressed: {
    opacity: 0.85,
  },
});