import { useState, useCallback } from "react";
import { Alert } from "react-native";

export default function useFetch() {
  const [loading, setLoading] = useState(false);
  const [allArts, setAllArts] = useState([]);
  const [filteredArts, setFilteredArts] = useState([]);
  const [brands, setBrands] = useState([]);

  const fetchArts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(process.env.EXPO_PUBLIC_API_URL, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setAllArts(data);
      setFilteredArts(data);

      const uniqueBrands = [...new Set(data.map((item) => item.brand))];
      setBrands(uniqueBrands);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch artwork data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, allArts, filteredArts, brands, fetchArts };
}
