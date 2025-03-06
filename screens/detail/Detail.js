import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useEffect, useState, useLayoutEffect } from "react";
import styles from "./DetailStyle";
import AntDesign from "@expo/vector-icons/AntDesign";
import useCustomStorage from "../../hooks/useCustomStorage";
import FeedbackBox from "../../components/FeedbackBox";
import { useNavigation } from "@react-navigation/native";

export default function Detail({ route }) {
  const { getAsyncStorage, setAsyncStorage, removeAsyncStorage } =
    useCustomStorage();
  const [isFavorite, setIsFavorite] = useState(false);
  const [starFilter, setStarFilter] = useState(0); // 0 means "All"
  const { item } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchFavorite = async () => {
      const favorite = await getAsyncStorage(item.id);
      if (favorite) {
        setIsFavorite(true);
      }
    };
    fetchFavorite();
  }, [isFavorite]);

  const handlePressFavorite = () => {
    if (isFavorite) {
      removeAsyncStorage(item.id);
    } else {
      setAsyncStorage(item.id, item);
    }
    setIsFavorite(!isFavorite);
  };

  // Get filtered feedback based on star rating
  const getFilteredFeedback = () => {
    if (starFilter === 0 || !item.feedbacks) {
      return item.feedbacks;
    }
    return item.feedbacks.filter((feedback) => feedback.rating === starFilter);
  };

  // Render star filter buttons
  const renderStarFilters = () => {
    return (
      <View style={filterStyles.filterContainer}>
        <TouchableOpacity
          style={[
            filterStyles.filterButton,
            starFilter === 0 ? filterStyles.activeFilterButton : null,
          ]}
          onPress={() => setStarFilter(0)}
        >
          <Text
            style={
              starFilter === 0
                ? filterStyles.activeFilterText
                : filterStyles.filterText
            }
          >
            All
          </Text>
        </TouchableOpacity>
        {[1, 2, 3, 4, 5].map((rating) => (
          <TouchableOpacity
            key={rating}
            style={[
              filterStyles.filterButton,
              starFilter === rating ? filterStyles.activeFilterButton : null,
            ]}
            onPress={() => setStarFilter(rating)}
          >
            <Text
              style={
                starFilter === rating
                  ? filterStyles.activeFilterText
                  : filterStyles.filterText
              }
            >
              {rating} ★
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const filteredFeedbacks = getFilteredFeedback();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.itemContainer}>
        <View>
          <Image source={{ uri: item.image }} style={styles.image} />
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handlePressFavorite}
          >
            <AntDesign
              name={isFavorite ? "heart" : "hearto"}
              size={32}
              color="red"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{item.artName}</Text>
          <Text style={styles.brand}>{item.brand}</Text>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              ${(item.price - item.price * item.limitedTimeDeal).toFixed(2)}
            </Text>
            {item.limitedTimeDeal > 0 && (
              <Text
                variant="bodyMedium"
                style={{
                  color: "grey",
                  fontWeight: "bold",
                  fontSize: 18,
                  textDecorationLine: "line-through",
                  marginLeft: 10,
                }}
              >
                ${item.price}
              </Text>
            )}
            {item.limitedTimeDeal > 0 && (
              <Text style={styles.discount}>
                {(item.limitedTimeDeal * 100).toFixed(0)}% OFF
              </Text>
            )}
          </View>

          {item.description && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          )}

          <Text style={styles.surfaceInfo}>
            Suitable for glass surfaces: {item.glassSurface ? "Yes" : "No"}
          </Text>
        </View>
      </View>

      <View style={styles.feedbackContainer}>
        <Text style={styles.sectionTitle}>Customer Feedback</Text>

        {renderStarFilters()}

        {filteredFeedbacks && filteredFeedbacks.length > 0 ? (
          filteredFeedbacks.map((feedback, index) => (
            <FeedbackBox
              key={index}
              comment={feedback.comment}
              rating={feedback.rating}
              author={feedback.author}
              date={feedback.date}
            />
          ))
        ) : (
          <Text style={styles.noFeedbackText}>
            {item.feedbacks && item.feedbacks.length > 0
              ? `No ${starFilter}-star feedback available`
              : "No feedback available"}
          </Text>
        )}
      </View>

      {/* Add View All Favorites button */}
      <TouchableOpacity
        style={styles.viewFavoritesButton}
        onPress={() => navigation.navigate("Tab", { screen: "Favorites" })}
      >
        <AntDesign
          name="hearto"
          size={20}
          color="#FFFFFF"
          style={styles.buttonIcon}
        />
        <Text style={styles.viewFavoritesText}>View All Favorites</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const filterStyles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
    flexWrap: "wrap",
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#6750A4",
    marginBottom: 8,
    marginHorizontal: 4,
  },
  activeFilterButton: {
    backgroundColor: "#6750A4",
  },
  filterText: {
    color: "#6750A4",
    fontWeight: "500",
  },
  activeFilterText: {
    color: "#FFFFFF",
    fontWeight: "500",
  },
});
