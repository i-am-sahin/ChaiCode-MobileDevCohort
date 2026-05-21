import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import Card from "../../components/ui/Card";
import Screen from "../../components/ui/Screen";
import { ORDERS, type Order } from "../../data/dummy";
import { Colors, Radius, Spacing, Typography } from "../../theme/tokens";
import { formatMoneyINR } from "../../utils/format";

const MyOrdersScreen = () => {
  const renderItem = ({ item }: { item: Order }) => {
    return (
      <Card style={styles.card}>
        <View style={styles.topRow}>
          <View style={styles.titleWrap}>
            <Text style={styles.restaurant}>{item.restaurantName}</Text>
            <Text style={styles.time}>{item.placedAt}</Text>
          </View>

          <View
            style={[
              styles.statusPill,
              item.status === "Delivered" && styles.statusDelivered,
              item.status === "On the way" && styles.statusOnWay,
              item.status === "Preparing" && styles.statusPreparing,
              item.status === "Cancelled" && styles.statusCancelled,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                item.status === "Delivered" && styles.statusDeliveredText,
                item.status === "On the way" && styles.statusOnWayText,
                item.status === "Preparing" && styles.statusPreparingText,
                item.status === "Cancelled" && styles.statusCancelledText,
              ]}
            >
              {item.status}
            </Text>
          </View>
        </View>

        <View style={styles.itemsBox}>
          {item.items.map((i) => (
            <View key={i.name} style={styles.itemRow}>
              <Text style={styles.itemText}>{i.qty}× {i.name}</Text>
              <Text style={styles.itemText}>{formatMoneyINR(i.qty * i.price)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{formatMoneyINR(item.total)}</Text>
        </View>
      </Card>
    );
  };

  return (
    <Screen style={styles.screen}>
      <Text style={styles.title}>My Orders</Text>
      <Text style={styles.subtitle}>All your past orders in one place</Text>

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

export default MyOrdersScreen;

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
  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: Spacing.sm,
  },
  titleWrap: {
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
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  statusText: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
  statusDelivered: { backgroundColor: "#E7F7ED", borderColor: "#BBF7D0" },
  statusDeliveredText: { color: Colors.success },
  statusOnWay: { backgroundColor: "#EEF2FF", borderColor: "#C7D2FE" },
  statusOnWayText: { color: "#4F46E5" },
  statusPreparing: { backgroundColor: "#FFF7ED", borderColor: "#FED7AA" },
  statusPreparingText: { color: Colors.warning },
  statusCancelled: { backgroundColor: "#FFECEC", borderColor: "#FECACA" },
  statusCancelledText: { color: Colors.danger },
  itemsBox: {
    marginTop: Spacing.md,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    gap: 10,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: Spacing.sm,
  },
  itemText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  bottomRow: {
    marginTop: Spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  totalLabel: {
    ...Typography.h3,
    color: Colors.text,
  },
  totalValue: {
    ...Typography.h3,
    color: Colors.text,
  },
});