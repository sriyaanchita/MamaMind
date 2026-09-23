import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        backgroundColor: "#FFF4E6",
      }}
    >
      <Text
        style={{
          fontSize: 36,
          fontWeight: "bold",
          color: "#5C3B28",
          marginBottom: 12,
        }}
      >
        MamaMind ❤️
      </Text>

      <Text
        style={{
          fontSize: 16,
          textAlign: "center",
          color: "#8B5E3C",
          marginBottom: 40,
        }}
      >
        Care for Mom. Share the Care. Capture the Moments.
      </Text>

      <Pressable
        onPress={() => router.push("/login")}
        style={{
          backgroundColor: "#8B5E3C",
          padding: 17,
          borderRadius: 12,
          width: "80%",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Text style={{ color: "white", fontSize: 17, fontWeight: "bold" }}>
          Login
        </Text>
      </Pressable>

      <Pressable
        onPress={() => router.push("/signup")}
        style={{
          backgroundColor: "#C5925E",
          padding: 17,
          borderRadius: 12,
          width: "80%",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 17, fontWeight: "bold" }}>
          Create Account
        </Text>
      </Pressable>
    </View>
  );
}