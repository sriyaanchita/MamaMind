import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

export default function OnboardingScreen() {
  const [name, setName] = useState("");
  const [support, setSupport] = useState("");
  const [relax, setRelax] = useState("");
  const [personalTime, setPersonalTime] = useState("");

  const finishOnboarding = () => {
    router.replace("/mother-dashboard");
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        padding: 24,
        paddingTop: 60,
        backgroundColor: "#FFF4E6",
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color: "#5C3B28",
          marginBottom: 10,
        }}
      >
        Let's get to know you ❤️
      </Text>

      <Text
        style={{
          fontSize: 16,
          color: "#8B5E3C",
          marginBottom: 30,
        }}
      >
        A few questions to personalize your MamaMind experience.
      </Text>

      <Text style={styles.label}>What should we call you?</Text>

      <TextInput
        style={styles.input}
        placeholder="Your name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>
        What kind of support helps you most?
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Example: Help with the baby, encouragement..."
        value={support}
        onChangeText={setSupport}
      />

      <Text style={styles.label}>
        What helps you relax?
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Example: Music, meditation, walking..."
        value={relax}
        onChangeText={setRelax}
      />

      <Text style={styles.label}>
        When do you usually like some personal time?
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Example: Morning, afternoon, night..."
        value={personalTime}
        onChangeText={setPersonalTime}
      />

      <Pressable
        onPress={finishOnboarding}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Finish Setup
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = {
  label: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#5C3B28",
    marginBottom: 8,
    marginTop: 16,
  },

  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#D2A679",
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
  },

  button: {
    backgroundColor: "#8B5E3C",
    padding: 17,
    borderRadius: 12,
    alignItems: "center" as const,
    marginTop: 35,
    marginBottom: 30,
  },

  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold" as const,
  },
};