import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const FeedbackBox = ({ comment, rating, author, date }) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <AntDesign
          key={i}
          name={i <= rating ? "star" : "staro"}
          size={16}
          color={i <= rating ? "#FFC107" : "#BDBDBD"}
          style={{ marginRight: 2 }}
        />
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.ratingContainer}>{renderStars()}</View>
        <View style={styles.authorContainer}>
          <Text style={styles.author}>{author}</Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
      </View>
      <Text style={styles.comment}>{comment}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  authorContainer: {
    alignItems: "flex-end",
  },
  author: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#6750A4",
  },
  date: {
    fontSize: 12,
    color: "#757575",
  },
  comment: {
    fontSize: 14,
    lineHeight: 20,
    color: "#212121",
  },
});

export default FeedbackBox;
