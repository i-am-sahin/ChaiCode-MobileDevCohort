import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import AppButton from "../../components/ui/AppButton";
import Card from "../../components/ui/Card";
import Screen from "../../components/ui/Screen";
import { Colors, Radius, Spacing, Typography } from "../../theme/tokens";
import { formatMoneyINR } from "../../utils/format";

type CartLine = {
  id: string;
  name: string;
  price: number;
  qty: number;
  imageUrl: string;
};

const CartScreen = ({ navigation, route }: any) => {
  const initialItems: CartLine[] = route.params?.items ?? [];
  const restaurantName: string = route.params?.restaurantName ?? "Your Cart";

  const [items, setItems] = useState<CartLine[]>(
    initialItems.length
      ? initialItems
      : [
          {
            id: "fallback",
            name: "Classic Meal",
            price: 249,
            qty: 1,
            imageUrl:
              "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80",
          },
        ],
  );

  const subtotal = useMemo(
    () => items.reduce((acc, cur) => acc + cur.price * cur.qty, 0),
    [items],
  );
  const deliveryFee = subtotal > 0 ? 39 : 0;
  const taxes = subtotal > 0 ? Math.round(subtotal * 0.05) : 0;
  const total = subtotal + deliveryFee + taxes;

  const updateQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((l) => (l.id === id ? { ...l, qty: Math.max(0, l.qty + delta) } : l))
        .filter((l) => l.qty > 0),
    );
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.topRow}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={18} color={Colors.text} />
        </Pressable>
        <View style={styles.topText}>
          <Text style={styles.title}>Cart</Text>
          <Text style={styles.subtitle}>{restaurantName}</Text>
        </View>
      </View>

      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Card padded={false} style={styles.lineCard}>
            <Image source={{ uri: item.imageUrl }} style={styles.lineImage} />
            <View style={styles.lineBody}>
              <Text style={styles.lineName}>{item.name}</Text>
              <Text style={styles.linePrice}>{formatMoneyINR(item.price)}</Text>
              <View style={styles.qtyRow}>
                <Pressable
                  onPress={() => updateQty(item.id, -1)}
                  style={({ pressed }) => [styles.qtyBtn, pressed && styles.qtyPressed]}
                >
                  <Ionicons name="remove" size={18} color={Colors.text} />
                </Pressable>
                <Text style={styles.qtyText}>{item.qty}</Text>
                <Pressable
                  onPress={() => updateQty(item.id, 1)}
                  style={({ pressed }) => [styles.qtyBtn, pressed && styles.qtyPressed]}
                >
                  <Ionicons name="add" size={18} color={Colors.text} />
                </Pressable>
              </View>
            </View>
          </Card>
        )}
        ListFooterComponent={
          <View style={styles.footer}>
            <Card>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>{formatMoneyINR(subtotal)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery</Text>
                <Text style={styles.summaryValue}>{formatMoneyINR(deliveryFee)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Taxes</Text>
                <Text style={styles.summaryValue}>{formatMoneyINR(taxes)}</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>{formatMoneyINR(total)}</Text>
              </View>
            </Card>

            <View style={styles.ctaRow}>
              <AppButton
                title={items.length ? "Checkout (Demo)" : "Cart is empty"}
                disabled={!items.length}
                onPress={() => navigation.goBack()}
              />
            </View>
          </View>
        }
      />
    </Screen>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  screen: {
    paddingTop: Spacing.sm,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    paddingBottom: Spacing.md,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: Radius.lg,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  topText: {
    flex: 1,
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
  },
  subtitle: {
    ...Typography.small,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  listContent: {
    paddingBottom: Spacing.xxl,
  },
  lineCard: {
    flexDirection: "row",
    overflow: "hidden",
    borderRadius: Radius.xl,
    marginBottom: Spacing.md,
  },
  lineImage: {
    width: 92,
    height: 92,
  },
  lineBody: {
    flex: 1,
    padding: Spacing.md,
  },
  lineName: {
    ...Typography.h3,
    color: Colors.text,
  },
  linePrice: {
    ...Typography.small,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  qtyBtn: {
    width: 36,
    height: 36,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  qtyPressed: {
    opacity: 0.8,
  },
  qtyText: {
    ...Typography.h3,
    color: Colors.text,
    minWidth: 18,
    textAlign: "center",
  },
  footer: {
    marginTop: Spacing.md,
    gap: Spacing.md,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  summaryLabel: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  summaryValue: {
    ...Typography.body,
    color: Colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.sm,
  },
  totalLabel: {
    ...Typography.h3,
    color: Colors.text,
  },
  totalValue: {
    ...Typography.h3,
    color: Colors.text,
  },
  ctaRow: {
    paddingBottom: Spacing.md,
  },
});