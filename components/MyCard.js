import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import useCustomStorage from "../hooks/useCustomStorage";
import { useEffect, useState } from "react";

const MyCard = (props) => {
  const { getAsyncStorage, setAsyncStorage, removeAsyncStorage } =
    useCustomStorage();
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchFavorite = async () => {
      const favorite = await getAsyncStorage(props.id);
      if (favorite) {
        setIsFavorite(true);
      }
    };
    fetchFavorite();
  }, [isFavorite]);

  const handleFavoritePress = async () => {
    if (isFavorite) {
      removeAsyncStorage(props.id);
    } else {
      setAsyncStorage(props.id, props);
    }
    setIsFavorite(!isFavorite);
    props.setCheck((prev) => !prev);
  };

  return (
    <Card
      style={styles.container}
      onPress={() => navigation.navigate("Detail", { item: props })}
    >
      <Card.Cover
        source={{ uri: props.image }}
        style={{
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          objectFit: "cover",
        }}
      />
      <Card.Content>
        <Text variant="titleMedium">{props.artName}</Text>
        <Text variant="bodyMedium">{props.brand}</Text>
        <Text variant="bodySmall">
          Glass surface: {props.glassSurface ? "Yes" : "No"}
        </Text>

        <View
          style={{
            paddingBottom: 20,
            paddingTop: 20,
          }}
        >
          <Text
            variant="bodyLarge"
            style={{
              color: "#6750A4",
              fontWeight: "bold",
              fontSize: 24,
            }}
          >
            ${(props.price - props.price * props.limitedTimeDeal).toFixed(2)}
          </Text>
          {props.limitedTimeDeal > 0 && (
            <Text
              variant="bodyMedium"
              style={{
                color: "grey",
                fontWeight: "bold",
                fontSize: 18,
                textDecorationLine: "line-through",
              }}
            >
              {props.price}$
            </Text>
          )}
        </View>
      </Card.Content>
      {props.limitedTimeDeal > 0 && (
        <View style={styles.box}>
          <Text
            style={{ color: "#6750A4", textAlign: "center", fontWeight: "800" }}
          >
            -{props.limitedTimeDeal * 100}%
          </Text>
        </View>
      )}
      <View>
        <Button
          icon="heart"
          mode={isFavorite ? "contained" : "outlined"}
          style={{
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 10,
          }}
          onPress={handleFavoritePress}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    position: "relative",
    flex: 1,
  },
  box: {
    top: 0,
    right: 0,
    position: "absolute",
    backgroundColor: "#F3EDF7",
    width: "15%",
    padding: 5,
    borderBottomLeftRadius: 4,
  },
});

export default MyCard;
