import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  brandList: {
    flexGrow: 0,
  },
  artContainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
  },
  resetButton: {
    alignSelf: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    marginVertical: 10,
  },
  filterContainer: {
    padding: 10,
  },
  brandItem: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: "#d9d9d9",
    borderRadius: 20,
  },
  activeBrandItem: {
    backgroundColor: "#6750A4",
  },
  brandText: {
    fontSize: 14,
    fontWeight: "500",
  },
  activeBrandText: {
    color: "#ffffff",
  },
  activeFilterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    marginHorizontal: 10,
  },
  activeFilterText: {
    fontSize: 14,
  },
  highlightedText: {
    fontWeight: "bold",
    color: "#6750A4",
  },
  artListContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  resetButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#6750A4",
  },
  resetText: {
    color: "#6750A4",
    fontWeight: "500",
    fontSize: 14,
  },
});

export default styles;
