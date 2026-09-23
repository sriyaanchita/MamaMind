import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function LoginScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF4E6",
      }}
    >
      <Text style={{ fontSize: 30, marginBottom: 30 }}>
        LOGIN SCREEN
      </Text>

      <Pressable
        onPress={() => router.push("/role-selection")}
        style={{
          backgroundColor: "#8B5E3C",
          padding: 18,
          borderRadius: 12,
        }}
      >
        <Text style={{ color: "white", fontSize: 18 }}>
          Continue
        </Text>
      </Pressable>
    </View>
  );
}