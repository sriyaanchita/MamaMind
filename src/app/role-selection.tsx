import { Text, View, Pressable, Alert } from "react-native";
import { router } from "expo-router";

import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";

export default function RoleSelectionScreen() {
  const selectRole = async (
    role: "mother" | "father"
  ) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        Alert.alert(
          "Error",
          "Please login again."
        );
        return;
      }

      // Save role in Firestore
      await updateDoc(
        doc(db, "users", user.uid),
        {
          role: role,
        }
      );

      console.log("ROLE SAVED:", role);

      // Continue to onboarding
      router.replace("/onboarding");
    } catch (error: any) {
      console.log("ROLE ERROR:", error);

      Alert.alert(
        "Error",
        error?.message ||
          "Could not save your role."
      );
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        backgroundColor: "#F2F0FA",
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color: "#25213A",
          marginBottom: 12,
          textAlign: "center",
        }}
      >
        Who are you? ♡
      </Text>

      <Text
        style={{
          fontSize: 16,
          color: "#77728A",
          marginBottom: 35,
          textAlign: "center",
        }}
      >
        This helps us personalize MamaMind.
      </Text>

      <Pressable
        onPress={() => selectRole("mother")}
        style={{
          width: "100%",
          backgroundColor: "#5140B5",
          padding: 18,
          borderRadius: 14,
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          🤱 I'm a Mother
        </Text>
      </Pressable>

      <Pressable
        onPress={() => selectRole("father")}
        style={{
          width: "100%",
          backgroundColor: "#5140B5",
          padding: 18,
          borderRadius: 14,
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          👨‍🍼 I'm a Father
        </Text>
      </Pressable>
    </View>
  );
}