import { FlatList, TouchableOpacity, Text, View } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import MyCard from "../../components/MyCard";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import MySpinner from "../../components/MySpinner";
import useFetch from "../../hooks/useFetch";
import styles from "./HomeStyle";

export default function Home() {
  const navigation = useNavigation();

  const { loading, allArts, filteredArts, brands, fetchArts } = useFetch();
  const [activeBrand, setActiveBrand] = useState(null);
  const [localFilteredArts, setLocalFilteredArts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useFocusEffect(
    useCallback(() => {
      fetchArts();
      return () => {};
    }, [fetchArts])
  );

  useEffect(() => {
    setLocalFilteredArts(filteredArts);
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: "Search",
        onChangeText: (event) => {
          const text = event.nativeEvent.text;
          setSearchQuery(text);
        },
        onCancelButtonPress: () => {
          setSearchQuery("");
        },
      },
    });
  }, [filteredArts, navigation]);

  useEffect(() => {
    let results = allArts;

    if (activeBrand) {
      results = results.filter((art) => art.brand === activeBrand);
    }

    if (searchQuery.trim()) {
      const searchWords = searchQuery.toLowerCase().split(/\s+/);
      results = results.filter((art) => {
        const artName = art.artName.toLowerCase();

        return searchWords.some((searchWord) => {
          const wordRegex = new RegExp(`\\b${searchWord}\\b`, "i");
          return wordRegex.test(artName);
        });
      });
    }

    setLocalFilteredArts(results);
  }, [searchQuery, activeBrand, allArts]);
  const handleBrandPress = useCallback(
    (brand) => {
      if (activeBrand === brand) {
        setActiveBrand(null);
        setLocalFilteredArts(allArts);
      } else {
        setActiveBrand(brand);
        const filtered = allArts.filter((art) => art.brand === brand);
        setLocalFilteredArts(filtered);
      }
    },
    [allArts, activeBrand]
  );

  const renderBrandItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={[
          styles.brandItem,
          activeBrand === item && styles.activeBrandItem,
        ]}
        onPress={() => handleBrandPress(item)}
      >
        <Text
          style={[
            styles.brandText,
            activeBrand === item && styles.activeBrandText,
          ]}
        >
          {item}
        </Text>
      </TouchableOpacity>
    ),
    [handleBrandPress, activeBrand]
  );

  const renderContent = useCallback(() => {
    if (loading) {
      return <MySpinner size="large" onLoading={true} />;
    }

    if (localFilteredArts.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No artwork found for {activeBrand}
          </Text>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => {
              setActiveBrand(null);
              setLocalFilteredArts(allArts);
            }}
          >
            <Text style={styles.resetText}>Show All Artwork</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <FlatList
        data={localFilteredArts}
        renderItem={({ item }) => <MyCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.artListContainer}
      />
    );
  }, [loading, localFilteredArts, activeBrand, allArts]);

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <FlatList
          data={brands}
          renderItem={renderBrandItem}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.brandList}
        />
      </View>

      {activeBrand && (
        <View style={styles.activeFilterContainer}>
          <Text style={styles.activeFilterText}>
            Currently showing:
            <Text style={styles.highlightedText}>{activeBrand}</Text>
          </Text>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => {
              setActiveBrand(null);
              setLocalFilteredArts(allArts);
            }}
          >
            <Text style={styles.resetText}>Clear Filter</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.artContainer}>{renderContent()}</View>
    </View>
  );
}
