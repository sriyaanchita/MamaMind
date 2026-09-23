import { useState } from "react";
import {
  Alert,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";
import { registerUser } from "../services/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../services/firebase";

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleSignup = async () => {
  if (!email || !password) {
    Alert.alert("Missing details", "Enter email and password.");
    return;
  }

  try {
    // 1. Create Firebase account
    const user = await registerUser(email, password);

    console.log("AUTH SUCCESS:", user.uid);

    // 2. Create Firestore document
    await setDoc(doc(db, "users", user.uid), {
      email: email,
      role: null,
      onboardingCompleted: false,
      createdAt: new Date().toISOString(),
    });

    console.log("FIRESTORE SUCCESS");

    Alert.alert("Success", "Welcome to MamaMind!");

    router.replace("/role-selection");
  } catch (error: any) {
    console.log("SIGNUP ERROR:", error);

    Alert.alert(
      "Signup failed",
      error?.message || "Something went wrong"
    );
  }
};

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 24,
        backgroundColor: "#FFF4E6",
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          color: "#5C3B28",
          marginBottom: 30,
        }}
      >
        Create Account ❤️
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable onPress={handleSignup} style={styles.button}>
        <Text style={styles.buttonText}>Create Account</Text>
      </Pressable>
    </View>
  );
}

const styles = {
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#D2A679",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#8B5E3C",
    padding: 17,
    borderRadius: 12,
    alignItems: "center" as const,
  },

  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold" as const,
  },
};