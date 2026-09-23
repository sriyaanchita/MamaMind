import { Text, View, Pressable, Alert } from "react-native";
import { router } from "expo-router";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";

export default function RoleSelectionScreen() {
  const selectRole = async (role: "mother" | "father") => {
    try {
      const user = auth.currentUser;

      if (!user) {
        Alert.alert("Error", "Please login again.");
        return;
      }

      await updateDoc(doc(db, "users", user.uid), {
        role: role,
      });

      console.log("ROLE SAVED:", role);

      router.replace("/onboarding");
    } catch (error: any) {
      console.log("ROLE ERROR:", error);

      Alert.alert(
        "Error",
        error?.message || "Could not save role."
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
        backgroundColor: "#FFF4E6",
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color: "#5C3B28",
          marginBottom: 15,
        }}
      >
        Who are you? ❤️
      </Text>

      <Text
        style={{
          fontSize: 16,
          color: "#8B5E3C",
          marginBottom: 35,
        }}
      >
        This helps us personalize MamaMind.
      </Text>

      <Pressable
        onPress={() => selectRole("mother")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>🤱 I’m a Mother</Text>
      </Pressable>

      <Pressable
        onPress={() => selectRole("father")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>👨‍🍼 I’m a Father</Text>
      </Pressable>
    </View>
  );
}

const styles = {
  button: {
    width: "100%" as const,
    backgroundColor: "#8B5E3C",
    padding: 18,
    borderRadius: 14,
    alignItems: "center" as const,
    marginBottom: 16,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold" as const,
  },
};