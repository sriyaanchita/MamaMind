import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";

export default function Meditation() {
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  const startMeditation = () => {
    setStarted(true);
    setCompleted(false);
  };

  const finishMeditation = () => {
    setCompleted(true);
    setStarted(false);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.label}>A LITTLE PAUSE</Text>

      <Text style={styles.title}>
        Breathe.{'\n'}
        You are here.
      </Text>

      <Text style={styles.subtitle}>
        You don't need to fix everything right now.
        Just give yourself a few quiet minutes.
      </Text>

      {/* Meditation visual */}

      <View style={styles.visual}>
        <View style={styles.sun} />

        <View style={styles.person}>
          <View style={styles.head} />

          <View style={styles.body} />

          <View style={styles.armLeft} />
          <View style={styles.armRight} />
        </View>

        <View style={styles.ground} />
      </View>

      {/* Meditation card */}

      {!started && !completed && (
        <View style={styles.card}>
          <Text style={styles.cardLabel}>5 MINUTES</Text>

          <Text style={styles.cardTitle}>
            Gentle breathing
          </Text>

          <Text style={styles.cardText}>
            Sit somewhere comfortable. Relax your shoulders
            and follow your breath without trying to change it.
          </Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={startMeditation}
          >
            <Text style={styles.primaryText}>
              Begin
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Active meditation */}

      {started && (
        <View style={styles.card}>
          <Text style={styles.cardLabel}>RIGHT NOW</Text>

          <Text style={styles.breatheText}>
            Breathe in
          </Text>

          <View style={styles.breathCircle}>
            <Text style={styles.breathCircleText}>
              4
            </Text>
          </View>

          <Text style={styles.cardText}>
            Slowly breathe in through your nose.
            Let your shoulders soften.
          </Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={finishMeditation}
          >
            <Text style={styles.primaryText}>
              I’m Done
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Completion */}

      {completed && (
        <View style={styles.completedCard}>
          <Text style={styles.completedHeart}>♡</Text>

          <Text style={styles.completedTitle}>
            You made space for yourself.
          </Text>

          <Text style={styles.completedText}>
            Even a few quiet minutes count.
            Carry this little moment with you.
          </Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.back()}
          >
            <Text style={styles.primaryText}>
              Back to My Space
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Other options */}

      {!started && (
        <View style={styles.options}>
          <Text style={styles.optionsTitle}>
            When you need a little more
          </Text>

          <View style={styles.optionRow}>
            <View style={styles.option}>
              <Text style={styles.optionNumber}>01</Text>
              <Text style={styles.optionTitle}>
                Slow breathing
              </Text>
              <Text style={styles.optionText}>
                Find your rhythm.
              </Text>
            </View>

            <View style={styles.option}>
              <Text style={styles.optionNumber}>02</Text>
              <Text style={styles.optionTitle}>
                Body pause
              </Text>
              <Text style={styles.optionText}>
                Release some tension.
              </Text>
            </View>
          </View>
        </View>
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
    color: "#A47A7B",
    fontWeight: "700",
  },

  title: {
    fontSize: 38,
    lineHeight: 43,
    fontWeight: "700",
    color: "#2D2A2A",
    marginTop: 10,
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 23,
    color: "#756B70",
    marginTop: 14,
  },

  visual: {
    height: 280,
    backgroundColor: "#FCE8E6",
    borderRadius: 32,
    marginTop: 28,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  sun: {
    position: "absolute",
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "#F5C8A7",
    top: 35,
    right: 45,
  },

  person: {
    width: 150,
    height: 170,
    alignItems: "center",
    position: "relative",
  },

  head: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#D89578",
    marginTop: 15,
  },

  body: {
    width: 80,
    height: 90,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    backgroundColor: "#A8B49A",
    marginTop: 8,
  },

  armLeft: {
    position: "absolute",
    width: 55,
    height: 15,
    borderRadius: 10,
    backgroundColor: "#A8B49A",
    left: 0,
    top: 95,
    transform: [{ rotate: "25deg" }],
  },

  armRight: {
    position: "absolute",
    width: 55,
    height: 15,
    borderRadius: 10,
    backgroundColor: "#A8B49A",
    right: 0,
    top: 95,
    transform: [{ rotate: "-25deg" }],
  },

  ground: {
    width: "75%",
    height: 18,
    borderRadius: 20,
    backgroundColor: "#D9C8BE",
    marginBottom: 25,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 24,
    marginTop: 20,
  },

  cardLabel: {
    fontSize: 11,
    letterSpacing: 2,
    color: "#8B817F",
    fontWeight: "700",
  },

  cardTitle: {
    fontSize: 25,
    fontWeight: "700",
    color: "#2D2A2A",
    marginTop: 8,
  },

  cardText: {
    fontSize: 15,
    lineHeight: 23,
    color: "#746A6E",
    marginTop: 12,
  },

  primaryButton: {
    backgroundColor: "#2D2A2A",
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 25,
    alignItems: "center",
    marginTop: 22,
  },

  primaryText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },

  breatheText: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "600",
    color: "#2D2A2A",
    marginTop: 25,
  },

  breathCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#E9F0E4",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  breathCircleText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#65745B",
  },

  completedCard: {
    backgroundColor: "#E9F0E4",
    borderRadius: 28,
    padding: 25,
    marginTop: 20,
    alignItems: "center",
  },

  completedHeart: {
    fontSize: 55,
    color: "#718267",
  },

  completedTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2D2A2A",
    textAlign: "center",
    marginTop: 10,
  },

  completedText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#65705F",
    textAlign: "center",
    marginTop: 10,
  },

  options: {
    marginTop: 30,
  },

  optionsTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2D2A2A",
    marginBottom: 15,
  },

  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  option: {
    width: "48%",
    backgroundColor: "#FFF0ED",
    borderRadius: 20,
    padding: 17,
  },

  optionNumber: {
    fontSize: 12,
    color: "#A47A7B",
    fontWeight: "700",
  },

  optionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2D2A2A",
    marginTop: 8,
  },

  optionText: {
    fontSize: 13,
    color: "#7A7074",
    marginTop: 5,
  },
});