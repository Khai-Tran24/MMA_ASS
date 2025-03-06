// SearchBar.js
import React from "react";
import { StyleSheet, View } from "react-native";
import { Searchbar, IconButton } from "react-native-paper";

const MySearchBar = ({ query, setQuery }) => {
  const handleSearch = (text) => {
    setQuery(text);
  };

  const clearSearch = () => {
    setQuery("");
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search..."
        onChangeText={handleSearch}
        value={query}
        style={styles.searchBar}
        inputStyle={styles.input}
        clearIcon={({ size, color }) =>
          query.length > 0 && (
            <IconButton
              icon="close"
              size={size}
              iconColor={color}
              onPress={clearSearch}
            />
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  searchBar: {
    backgroundColor: "#d9d9d9",
    borderRadius: 8,
    elevation: 2,
  },
  input: {
    fontSize: 16,
  },
});

export default MySearchBar;
