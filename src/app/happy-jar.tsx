import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";

export default function HappyJar() {
  const [moment, setMoment] = useState("");
  const [moments, setMoments] = useState<string[]>([]);

  const addMoment = () => {
    if (!moment.trim()) return;

    setMoments((previous) => [
      moment.trim(),
      ...previous,
    ]);

    setMoment("");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.label}>A LITTLE HAPPINESS</Text>

      <Text style={styles.title}>
        Your Happy Jar
      </Text>

      <Text style={styles.subtitle}>
        Save the tiny moments that made you smile.
        Come back to them whenever you need a little light.
      </Text>

      {/* Jar */}

      <View style={styles.jarArea}>
        <View style={styles.jarLid} />

        <View style={styles.jar}>
          <View style={styles.jarGlass}>
            {moments.length > 0 && (
              <>
                <Text style={styles.heartOne}>♡</Text>
                <Text style={styles.heartTwo}>♡</Text>
                <Text style={styles.heartThree}>♡</Text>
                <Text style={styles.heartFour}>♡</Text>
              </>
            )}

            <Text style={styles.jarCount}>
              {moments.length}
            </Text>

            <Text style={styles.jarLabel}>
              little moments
            </Text>
          </View>
        </View>
      </View>

      {/* Add moment */}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          What made you smile today?
        </Text>

        <TextInput
          value={moment}
          onChangeText={setMoment}
          placeholder="My happy moment was..."
          placeholderTextColor="#B5A9AD"
          multiline
          style={styles.input}
        />

        <TouchableOpacity
          style={[
            styles.button,
            !moment.trim() && styles.disabled,
          ]}
          onPress={addMoment}
          disabled={!moment.trim()}
        >
          <Text style={styles.buttonText}>
            Add to My Jar ♡
          </Text>
        </TouchableOpacity>
      </View>

      {/* Saved moments */}

      {moments.length > 0 && (
        <View style={styles.momentsSection}>
          <Text style={styles.sectionTitle}>
            Your Little Happiness
          </Text>

          {moments.map((item, index) => (
            <View key={index} style={styles.momentCard}>
              <Text style={styles.momentHeart}>♡</Text>

              <Text style={styles.momentText}>
                {item}
              </Text>
            </View>
          ))}
        </View>
      )}

      {moments.length === 0 && (
        <Text style={styles.emptyText}>
          Your jar is waiting for its first little happy moment.
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8F6",
  },

  content: {
    padding: 22,
    paddingBottom: 60,
  },

  backButton: {
    marginTop: 45,
    marginBottom: 28,
  },

  backText: {
    fontSize: 15,
    color: "#6F6268",
    fontWeight: "600",
  },

  label: {
    fontSize: 11,
    letterSpacing: 2,
    color: "#B07B55",
    fontWeight: "700",
  },

  title: {
    fontSize: 38,
    fontWeight: "700",
    color: "#2D2A2A",
    marginTop: 10,
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 23,
    color: "#756B70",
    marginTop: 12,
  },

  jarArea: {
    height: 280,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },

  jarLid: {
    width: 125,
    height: 22,
    borderRadius: 8,
    backgroundColor: "#C99A70",
    marginBottom: -5,
    zIndex: 2,
  },

  jar: {
    width: 190,
    height: 215,
    borderRadius: 35,
    backgroundColor: "#F5D8B8",
    padding: 10,
  },

  jarGlass: {
    flex: 1,
    borderRadius: 27,
    backgroundColor: "#FFEEDC",
    borderWidth: 2,
    borderColor: "#E8C7A6",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  jarCount: {
    fontSize: 48,
    fontWeight: "700",
    color: "#A87550",
  },

  jarLabel: {
    fontSize: 13,
    color: "#A87550",
  },

  heartOne: {
    position: "absolute",
    top: 30,
    left: 35,
    fontSize: 30,
    color: "#D49A72",
  },

  heartTwo: {
    position: "absolute",
    top: 60,
    right: 30,
    fontSize: 24,
    color: "#D49A72",
  },

  heartThree: {
    position: "absolute",
    bottom: 30,
    left: 45,
    fontSize: 26,
    color: "#D49A72",
  },

  heartFour: {
    position: "absolute",
    bottom: 45,
    right: 40,
    fontSize: 22,
    color: "#D49A72",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    padding: 20,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2D2A2A",
  },

  input: {
    minHeight: 90,
    marginTop: 15,
    fontSize: 16,
    color: "#40383B",
    textAlignVertical: "top",
    backgroundColor: "#FFF8F6",
    borderRadius: 16,
    padding: 15,
  },

  button: {
    backgroundColor: "#2D2A2A",
    borderRadius: 28,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 15,
  },

  disabled: {
    opacity: 0.35,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 15,
  },

  momentsSection: {
    marginTop: 30,
  },

  sectionTitle: {
    fontSize: 23,
    fontWeight: "700",
    color: "#2D2A2A",
    marginBottom: 15,
  },

  momentCard: {
    backgroundColor: "#FFF0D8",
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  momentHeart: {
    fontSize: 28,
    color: "#C58C63",
    marginRight: 12,
  },

  momentText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: "#55463D",
  },

  emptyText: {
    textAlign: "center",
    color: "#9A8C8F",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 25,
    paddingHorizontal: 20,
  },
});