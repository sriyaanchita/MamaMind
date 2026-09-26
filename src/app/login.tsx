import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing details", "Enter email and password.");
      return;
    }

    try {
      // 1. Login with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      console.log("LOGIN SUCCESS:", user.uid);

      // 2. Get user's profile from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (!userDoc.exists()) {
        Alert.alert(
          "Profile not found",
          "Your account profile could not be found."
        );
        return;
      }

      const userData = userDoc.data();

      console.log("USER ROLE:", userData.role);

      // 3. Send user based on saved role
      if (userData.role === "mother") {
        router.replace("/mother-dashboard");
      } else if (userData.role === "father") {
        router.replace("/father_dashboard");
      } else {
        // User has not selected a role yet
        router.replace("/role-selection");
      }
    } catch (error: any) {
      console.log("LOGIN ERROR:", error);

      Alert.alert(
        "Login failed",
        "Please check your email and password."
      );
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 25,
        backgroundColor: "#F2F0FA",
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 10,
          color: "#25213A",
        }}
      >
        Welcome Back ♡
      </Text>

      <Text
        style={{
          fontSize: 15,
          textAlign: "center",
          color: "#77728A",
          marginBottom: 30,
        }}
      >
        Your little space is waiting for you.
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#9B97AA"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{
          backgroundColor: "#FFFFFF",
          padding: 16,
          borderRadius: 14,
          marginBottom: 15,
          fontSize: 16,
          borderWidth: 1,
          borderColor: "#DDD9F8",
        }}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#9B97AA"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          backgroundColor: "#FFFFFF",
          padding: 16,
          borderRadius: 14,
          marginBottom: 20,
          fontSize: 16,
          borderWidth: 1,
          borderColor: "#DDD9F8",
        }}
      />

      <Pressable
        onPress={handleLogin}
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
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          Login
        </Text>
      </Pressable>
    </View>
  );
}