import { NavigationContainer } from "@react-navigation/native";
import MainNav from "./navigation/MainNav";
import { PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <MainNav />
      </NavigationContainer>
    </PaperProvider>
  );
}
