import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
    marginVertical: 10,
    resizeMode: "contain",
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  brand: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6750A4",
  },
  discount: {
    marginLeft: 10,
    backgroundColor: "#F3EDF7",
    color: "#6750A4",
    fontWeight: "bold",
    padding: 4,
    borderRadius: 4,
    right: 0,
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "#333",
  },
  surfaceInfo: {
    marginTop: 16,
    fontStyle: "italic",
    color: "#666",
  },
  favoriteButton: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: 10,
  },
  feedbackContainer: {
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  noFeedbackText: {
    textAlign: "center",
    fontStyle: "italic",
    color: "#757575",
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#212121",
  },
  headerButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  headerButtonText: {
    color: "#6750A4",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 4,
  },
  viewFavoritesButton: {
    backgroundColor: "#6750A4",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginVertical: 16,
    marginHorizontal: 24,
    elevation: 2,
  },
  viewFavoritesText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonIcon: {
    marginRight: 8,
  },
  headerBackButton: {
    padding: 8,
    marginLeft: 4,
  },
});

export default styles;
