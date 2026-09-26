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
      Alert.alert(
        "Missing details",
        "Enter email and password."
      );
      return;
    }

    try {
      // 1. Create Firebase account
      const user = await registerUser(email, password);

      console.log("AUTH SUCCESS:", user.uid);

      // 2. Create Firestore user profile
      await setDoc(doc(db, "users", user.uid), {
        email: email,
        role: null,
        onboardingCompleted: false,
        createdAt: new Date().toISOString(),
      });

      console.log("FIRESTORE SUCCESS");

      Alert.alert(
        "Success",
        "Welcome to MamaMind!"
      );

      // 3. New user must select their role
      router.replace("/role-selection");
    } catch (error: any) {
      console.log("SIGNUP ERROR:", error);

      Alert.alert(
        "Signup failed",
        error?.message || "Something went wrong."
      );
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 24,
        backgroundColor: "#F2F0FA",
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          color: "#25213A",
          marginBottom: 10,
        }}
      >
        Create Account ♡
      </Text>

      <Text
        style={{
          fontSize: 15,
          color: "#77728A",
          marginBottom: 30,
        }}
      >
        Let's create your little MamaMind space.
      </Text>

      <TextInput
        style={{
          backgroundColor: "#FFFFFF",
          borderWidth: 1,
          borderColor: "#DDD9F8",
          borderRadius: 14,
          padding: 15,
          marginBottom: 15,
          fontSize: 16,
        }}
        placeholder="Email"
        placeholderTextColor="#9B97AA"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={{
          backgroundColor: "#FFFFFF",
          borderWidth: 1,
          borderColor: "#DDD9F8",
          borderRadius: 14,
          padding: 15,
          marginBottom: 20,
          fontSize: 16,
        }}
        placeholder="Password"
        placeholderTextColor="#9B97AA"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable
        onPress={handleSignup}
        style={{
          backgroundColor: "#5140B5",
          padding: 17,
          borderRadius: 14,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 17,
            fontWeight: "600",
          }}
        >
          Create Account
        </Text>
      </Pressable>
    </View>
  );
}