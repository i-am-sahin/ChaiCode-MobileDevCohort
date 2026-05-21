import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import Card from "../../components/ui/Card";
import Chip from "../../components/ui/Chip";
import Screen from "../../components/ui/Screen";
import { CATEGORIES, RESTAURANTS, type Restaurant } from "../../data/dummy";
import { Colors, Radius, Spacing, Typography } from "../../theme/tokens";
import { formatMoneyINR, formatRating } from "../../utils/format";

const HomeScreen = ({ navigation }: any) => {
  const [query, setQuery] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return RESTAURANTS.filter((r) => {
      const matchesQuery =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.cuisine.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q));

      const activeCategory = CATEGORIES.find((c) => c.id === activeCategoryId);
      const matchesCategory =
        !activeCategory ||
        r.cuisine.toLowerCase().includes(activeCategory.title.toLowerCase()) ||
        r.tags.some((t) => t.toLowerCase().includes(activeCategory.title.toLowerCase()));

      return matchesQuery && matchesCategory;
    });
  }, [query, activeCategoryId]);

  const renderRestaurant = ({ item }: { item: Restaurant }) => {
    return (
      <Pressable
        onPress={() => navigation.navigate("RestaurantDetail", { restaurantId: item.id })}
        style={({ pressed }) => [styles.cardPressable, pressed && styles.pressed]}
      >
        <Card padded={false} style={styles.restaurantCard}>
          <Image source={{ uri: item.imageUrl }} style={styles.restaurantImage} />

          <View style={styles.restaurantBody}>
            <View style={styles.restaurantHeader}>
              <Text style={styles.restaurantName}>{item.name}</Text>
              <View style={styles.ratingPill}>
                <Ionicons name="star" size={14} color={Colors.warning} />
                <Text style={styles.ratingText}>{formatRating(item.rating)}</Text>
              </View>
            </View>

            <Text style={styles.restaurantCuisine}>{item.cuisine}</Text>

            <View style={styles.metaRow}>
              <Text style={styles.metaText}>{item.etaMins} mins</Text>
              <Text style={styles.metaDot}>•</Text>
              <Text style={styles.metaText}>For one {formatMoneyINR(item.priceForOne)}</Text>
            </View>

            <View style={styles.tagsRow}>
              {item.tags.slice(0, 2).map((t) => (
                <View key={t} style={styles.tag}>
                  <Text style={styles.tagText}>{t}</Text>
                </View>
              ))}
            </View>
          </View>
        </Card>
      </Pressable>
    );
  };

  return (
    <Screen>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderRestaurant}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>What’s for lunch?</Text>
            <Text style={styles.subtitle}>Fresh picks near you</Text>

            <View style={styles.searchWrap}>
              <Ionicons name="search" size={18} color={Colors.textSecondary} />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search restaurants, cuisines…"
                placeholderTextColor={Colors.textSecondary}
                style={styles.searchInput}
              />
            </View>

            <View style={styles.categoriesRow}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={CATEGORIES}
                keyExtractor={(c) => c.id}
                contentContainerStyle={styles.categoriesContent}
                renderItem={({ item }) => (
                  <Chip
                    label={`${item.emoji} ${item.title}`}
                    active={activeCategoryId === item.id}
                    onPress={() =>
                      setActiveCategoryId((prev) => (prev === item.id ? null : item.id))
                    }
                  />
                )}
              />
            </View>

            <View style={styles.sectionRow}>
              <Text style={styles.sectionTitle}>Popular</Text>
              <Text style={styles.sectionHint}>{filtered.length} places</Text>
            </View>
          </View>
        }
      />
    </Screen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: Spacing.xl,
  },
  header: {
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  title: {
    ...Typography.title,
    color: Colors.text,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  searchWrap: {
    marginTop: Spacing.md,
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
  searchInput: {
    flex: 1,
    ...Typography.body,
    color: Colors.text,
  },
  categoriesRow: {
    marginTop: Spacing.md,
  },
  categoriesContent: {
    gap: Spacing.sm,
    paddingRight: Spacing.md,
  },
  sectionRow: {
    marginTop: Spacing.lg,
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  sectionTitle: {
    ...Typography.h2,
    color: Colors.text,
  },
  sectionHint: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
  cardPressable: {
    marginBottom: Spacing.md,
  },
  pressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.95,
  },
  restaurantCard: {
    overflow: "hidden",
  },
  restaurantImage: {
    height: 160,
    width: "100%",
  },
  restaurantBody: {
    padding: Spacing.md,
  },
  restaurantHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.sm,
  },
  restaurantName: {
    ...Typography.h2,
    color: Colors.text,
    flex: 1,
  },
  ratingPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: Radius.xl,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  ratingText: {
    ...Typography.small,
    color: Colors.text,
  },
  restaurantCuisine: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: 6,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  metaText: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
  metaDot: {
    marginHorizontal: 8,
    color: Colors.textSecondary,
  },
  tagsRow: {
    flexDirection: "row",
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  tag: {
    backgroundColor: Colors.primarySoft,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tagText: {
    ...Typography.small,
    color: Colors.primary,
  },
});