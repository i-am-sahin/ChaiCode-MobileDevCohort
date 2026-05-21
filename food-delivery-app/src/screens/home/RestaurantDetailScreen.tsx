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
import { RESTAURANTS, type MenuItem, type Restaurant } from "../../data/dummy";
import { Colors, Radius, Spacing, Typography } from "../../theme/tokens";
import { formatMoneyINR, formatRating } from "../../utils/format";

type CartLine = {
  id: string;
  name: string;
  price: number;
  qty: number;
  imageUrl: string;
};

const RestaurantDetailScreen = ({ navigation, route }: any) => {
  const restaurant = useMemo<Restaurant>(() => {
    const restaurantId = route.params?.restaurantId as string | undefined;
    const found = restaurantId
      ? RESTAURANTS.find((r) => r.id === restaurantId)
      : undefined;

    if (found) return found;

    const restaurantName = route.params?.restaurantName as string | undefined;
    const price = route.params?.price as number | undefined;

    return {
      id: "legacy",
      name: restaurantName ?? "Restaurant",
      cuisine: "Popular picks",
      rating: 4.4,
      etaMins: 30,
      priceForOne: typeof price === "number" ? price : 220,
      imageUrl:
        "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1200&q=80",
      tags: ["Loved by locals"],
      menu: [],
    };
  }, [route.params]);

  const [cart, setCart] = useState<Record<string, CartLine>>({});

  const cartItems = useMemo(() => Object.values(cart).filter((l) => l.qty > 0), [cart]);
  const cartCount = useMemo(
    () => cartItems.reduce((acc, cur) => acc + cur.qty, 0),
    [cartItems],
  );
  const cartTotal = useMemo(
    () => cartItems.reduce((acc, cur) => acc + cur.qty * cur.price, 0),
    [cartItems],
  );

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev[item.id];
      const nextQty = (existing?.qty ?? 0) + 1;
      return {
        ...prev,
        [item.id]: {
          id: item.id,
          name: item.name,
          price: item.price,
          qty: nextQty,
          imageUrl: item.imageUrl,
        },
      };
    });
  };

  const removeFromCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev[item.id];
      const nextQty = Math.max(0, (existing?.qty ?? 0) - 1);
      return {
        ...prev,
        [item.id]: {
          id: item.id,
          name: item.name,
          price: item.price,
          qty: nextQty,
          imageUrl: item.imageUrl,
        },
      };
    });
  };

  const renderMenuItem = ({ item }: { item: MenuItem }) => {
    const qty = cart[item.id]?.qty ?? 0;
    return (
      <Card padded={false} style={styles.menuCard}>
        <Image source={{ uri: item.imageUrl }} style={styles.menuImage} />
        <View style={styles.menuBody}>
          <View style={styles.menuHeader}>
            <Text style={styles.menuName}>{item.name}</Text>
            <Text style={styles.menuPrice}>{formatMoneyINR(item.price)}</Text>
          </View>
          <Text style={styles.menuDesc} numberOfLines={2}>
            {item.description}
          </Text>

          <View style={styles.menuActions}>
            <View style={styles.badgesRow}>
              {item.isVeg ? (
                <View style={[styles.badge, styles.vegBadge]}>
                  <Text style={[styles.badgeText, styles.vegText]}>Veg</Text>
                </View>
              ) : (
                <View style={[styles.badge, styles.nonVegBadge]}>
                  <Text style={[styles.badgeText, styles.nonVegText]}>Non‑veg</Text>
                </View>
              )}

              {typeof item.spicyLevel === "number" && item.spicyLevel > 0 ? (
                <View style={[styles.badge, styles.spicyBadge]}>
                  <Text style={[styles.badgeText, styles.spicyText]}>
                    Spicy {"🌶️".repeat(item.spicyLevel)}
                  </Text>
                </View>
              ) : null}
            </View>

            <View style={styles.qtyRow}>
              <Pressable
                onPress={() => removeFromCart(item)}
                style={({ pressed }) => [styles.qtyBtn, pressed && styles.qtyPressed]}
              >
                <Ionicons name="remove" size={18} color={Colors.text} />
              </Pressable>
              <Text style={styles.qtyText}>{qty}</Text>
              <Pressable
                onPress={() => addToCart(item)}
                style={({ pressed }) => [styles.qtyBtn, pressed && styles.qtyPressed]}
              >
                <Ionicons name="add" size={18} color={Colors.text} />
              </Pressable>
            </View>
          </View>
        </View>
      </Card>
    );
  };

  return (
    <Screen style={styles.screen}>
      <FlatList
        data={restaurant.menu}
        keyExtractor={(i) => i.id}
        renderItem={renderMenuItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.headerWrap}>
            <Card padded={false} style={styles.heroCard}>
              <Image source={{ uri: restaurant.imageUrl }} style={styles.heroImage} />
              <View style={styles.heroOverlay} />

              <View style={styles.heroContent}>
                <Text style={styles.heroTitle}>{restaurant.name}</Text>
                <Text style={styles.heroSubtitle}>{restaurant.cuisine}</Text>

                <View style={styles.heroMetaRow}>
                  <View style={styles.metaPill}>
                    <Ionicons name="star" size={14} color={Colors.warning} />
                    <Text style={styles.metaPillText}>{formatRating(restaurant.rating)}</Text>
                  </View>

                  <View style={styles.metaPill}>
                    <Ionicons name="time" size={14} color={Colors.text} />
                    <Text style={styles.metaPillText}>{restaurant.etaMins} mins</Text>
                  </View>

                  <View style={styles.metaPill}>
                    <Ionicons name="wallet" size={14} color={Colors.text} />
                    <Text style={styles.metaPillText}>For one {formatMoneyINR(restaurant.priceForOne)}</Text>
                  </View>
                </View>
              </View>
            </Card>

            <View style={styles.sectionRow}>
              <Text style={styles.sectionTitle}>Menu</Text>
              <Text style={styles.sectionHint}>{restaurant.menu.length} items</Text>
            </View>
          </View>
        }
      />

      {cartCount > 0 ? (
        <View style={styles.cartBar}>
          <View>
            <Text style={styles.cartBarTitle}>{cartCount} items</Text>
            <Text style={styles.cartBarSubtitle}>{formatMoneyINR(cartTotal)}</Text>
          </View>
          <AppButton
            title="View cart"
            onPress={() =>
              navigation.navigate("Cart", {
                restaurantId: restaurant.id,
                restaurantName: restaurant.name,
                items: cartItems,
              })
            }
          />
        </View>
      ) : null}
    </Screen>
  );
};

export default RestaurantDetailScreen;

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 0,
  },
  content: {
    paddingBottom: 120,
    paddingHorizontal: Spacing.md,
  },
  headerWrap: {
    paddingTop: Spacing.md,
  },
  heroCard: {
    overflow: "hidden",
    borderRadius: Radius.xl,
  },
  heroImage: {
    height: 220,
    width: "100%",
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.22)",
  },
  heroContent: {
    position: "absolute",
    left: Spacing.md,
    right: Spacing.md,
    bottom: Spacing.md,
  },
  heroTitle: {
    ...Typography.title,
    color: "#fff",
  },
  heroSubtitle: {
    ...Typography.body,
    color: "rgba(255,255,255,0.88)",
    marginTop: 2,
  },
  heroMetaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  metaPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: Radius.xl,
    backgroundColor: "rgba(255,255,255,0.92)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
  },
  metaPillText: {
    ...Typography.small,
    color: Colors.text,
  },
  sectionRow: {
    marginTop: Spacing.lg,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  sectionTitle: {
    ...Typography.h2,
    color: Colors.text,
  },
  sectionHint: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
  menuCard: {
    overflow: "hidden",
    borderRadius: Radius.xl,
    marginTop: Spacing.md,
  },
  menuImage: {
    height: 120,
    width: "100%",
  },
  menuBody: {
    padding: Spacing.md,
  },
  menuHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.sm,
  },
  menuName: {
    ...Typography.h3,
    color: Colors.text,
    flex: 1,
  },
  menuPrice: {
    ...Typography.h3,
    color: Colors.text,
  },
  menuDesc: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: 8,
  },
  menuActions: {
    marginTop: Spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.sm,
  },
  badgesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
    flex: 1,
  },
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  badgeText: {
    ...Typography.small,
  },
  vegBadge: {
    backgroundColor: "#E7F7ED",
    borderColor: "#BBF7D0",
  },
  vegText: {
    color: Colors.success,
  },
  nonVegBadge: {
    backgroundColor: "#FFECEC",
    borderColor: "#FECACA",
  },
  nonVegText: {
    color: Colors.danger,
  },
  spicyBadge: {
    backgroundColor: "#FFF7ED",
    borderColor: "#FED7AA",
  },
  spicyText: {
    color: Colors.warning,
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  qtyBtn: {
    width: 38,
    height: 38,
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
  cartBar: {
    position: "absolute",
    left: Spacing.md,
    right: Spacing.md,
    bottom: Spacing.md,
    backgroundColor: Colors.card,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.md,
  },
  cartBarTitle: {
    ...Typography.h3,
    color: Colors.text,
  },
  cartBarSubtitle: {
    ...Typography.small,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});