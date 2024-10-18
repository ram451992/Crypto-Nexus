import LoginScreen from "@/screens/LoginScreen";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'white',
      }}
    >
      <LoginScreen />
    </View>
  );
}
