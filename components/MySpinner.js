import * as React from "react";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

const MySpinner = ({ onLoading, ...prop }) => (
  <ActivityIndicator animating={onLoading} color={MD2Colors.red800} {...prop} />
);

export default MySpinner;
