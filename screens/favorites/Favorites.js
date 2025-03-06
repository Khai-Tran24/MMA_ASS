import { View, Text, FlatList } from "react-native";
import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import MyCard from "../../components/MyCard";
import useCustomStorage from "../../hooks/useCustomStorage";
import MySpinner from "../../components/MySpinner";
import styles from "./FavoriteStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [check, setCheck] = useState(false);

  const fetchFavorites = useCallback(async () => {
    try {
      setLoading(true);
      const keys = await AsyncStorage.getAllKeys();
      const favoriteKeys = keys.filter((key) => !isNaN(key));

      if (favoriteKeys.length > 0) {
        const results = await AsyncStorage.multiGet(favoriteKeys);
        const favoritesData = results.map(([key, value]) => {
          return JSON.parse(value);
        });
        setFavorites(favoritesData);
      } else {
        setFavorites([]);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  }, [check]);

  useFocusEffect(
    useCallback(() => {
      fetchFavorites();
      return () => {};
    }, [check])
  );

  const renderContent = () => {
    if (loading) {
      return <MySpinner size="large" onLoading={true} />;
    }

    if (favorites.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            You haven't added any favorites yet
          </Text>
        </View>
      );
    }

    return (
      <FlatList
        data={favorites}
        renderItem={({ item }) => <MyCard {...item} setCheck={setCheck} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    );
  };

  return <View style={styles.container}>{renderContent()}</View>;
}
