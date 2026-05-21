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
import { RESTAURANTS, type Restaurant } from "../../data/dummy";
import { Colors, Radius, Spacing, Typography } from "../../theme/tokens";
import { formatRating } from "../../utils/format";

const SUGGESTIONS = ["Pizza", "Butter Chicken", "Healthy", "Desserts", "Burgers"];

const SearchScreen = ({ navigation }: any) => {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return RESTAURANTS;

    return RESTAURANTS.filter((r) => {
      const hitsRestaurant =
        r.name.toLowerCase().includes(q) ||
        r.cuisine.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q));
      const hitsMenu = r.menu.some(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q),
      );
      return hitsRestaurant || hitsMenu;
    });
  }, [query]);

  const openRestaurant = (restaurantId: string) => {
    navigation.navigate("HomeTab", {
      screen: "RestaurantDetail",
      params: { restaurantId },
    });
  };

  const renderRestaurant = ({ item }: { item: Restaurant }) => {
    return (
      <Pressable
        onPress={() => openRestaurant(item.id)}
        style={({ pressed }) => [styles.resultPressable, pressed && styles.pressed]}
      >
        <Card padded={false} style={styles.resultCard}>
          <Image source={{ uri: item.imageUrl }} style={styles.resultImage} />
          <View style={styles.resultBody}>
            <View style={styles.resultHeader}>
              <Text style={styles.resultTitle}>{item.name}</Text>
              <View style={styles.ratingPill}>
                <Ionicons name="star" size={14} color={Colors.warning} />
                <Text style={styles.ratingText}>{formatRating(item.rating)}</Text>
              </View>
            </View>
            <Text style={styles.resultSubtitle}>{item.cuisine}</Text>
            <Text style={styles.resultMeta}>{item.etaMins} mins · {item.tags[0] ?? "Popular"}</Text>
          </View>
        </Card>
      </Pressable>
    );
  };

  return (
    <Screen style={styles.screen}>
      <Text style={styles.title}>Search</Text>
      <Text style={styles.subtitle}>Find restaurants and dishes</Text>

      <View style={styles.searchWrap}>
        <Ionicons name="search" size={18} color={Colors.textSecondary} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Try “pizza”, “paneer”, “salad”…"
          placeholderTextColor={Colors.textSecondary}
          style={styles.searchInput}
        />
        {query.length ? (
          <Pressable onPress={() => setQuery("")} style={styles.clearBtn}>
            <Ionicons name="close" size={18} color={Colors.textSecondary} />
          </Pressable>
        ) : null}
      </View>

      <View style={styles.suggestionsRow}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={SUGGESTIONS}
          keyExtractor={(s) => s}
          contentContainerStyle={styles.suggestionsContent}
          renderItem={({ item }) => (
            <Chip label={item} active={query === item} onPress={() => setQuery(item)} />
          )}
        />
      </View>

      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Results</Text>
        <Text style={styles.sectionHint}>{results.length}</Text>
      </View>

      <FlatList
        data={results}
        keyExtractor={(r) => r.id}
        renderItem={renderRestaurant}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.resultsContent}
      />
    </Screen>
  );
};

export default SearchScreen;

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
  clearBtn: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  suggestionsRow: {
    marginTop: Spacing.md,
    marginBottom: Spacing.md,
  },
  suggestionsContent: {
    gap: Spacing.sm,
    paddingRight: Spacing.md,
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    paddingVertical: Spacing.sm,
  },
  sectionTitle: {
    ...Typography.h2,
    color: Colors.text,
  },
  sectionHint: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
  resultsContent: {
    paddingBottom: Spacing.xxl,
  },
  resultPressable: {
    marginBottom: Spacing.md,
  },
  pressed: {
    opacity: 0.95,
    transform: [{ scale: 0.99 }],
  },
  resultCard: {
    overflow: "hidden",
    borderRadius: Radius.xl,
    flexDirection: "row",
  },
  resultImage: {
    width: 96,
    height: 96,
  },
  resultBody: {
    flex: 1,
    padding: Spacing.md,
  },
  resultHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.sm,
  },
  resultTitle: {
    ...Typography.h3,
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
  resultSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: 6,
  },
  resultMeta: {
    ...Typography.small,
    color: Colors.textSecondary,
    marginTop: 6,
  },
});