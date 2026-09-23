import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";

export default function Support() {
  const [requested, setRequested] = useState(false);

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

      <Text style={styles.label}>YOU DON'T HAVE TO DO IT ALONE</Text>

      <Text style={styles.title}>
        I'm Not Okay.
      </Text>

      <Text style={styles.subtitle}>
        You don't need to explain everything.
        Sometimes asking for a little help is enough.
      </Text>

      {/* Main support card */}

      <View style={styles.mainCard}>
        <View style={styles.heartCircle}>
          <Text style={styles.heart}>♡</Text>
        </View>

        <Text style={styles.mainTitle}>
          Let someone know.
        </Text>

        <Text style={styles.mainText}>
          Send a gentle signal to your support person.
          They can check in, take over a task, or simply
          sit beside you.
        </Text>

        {!requested ? (
          <TouchableOpacity
            style={styles.supportButton}
            onPress={() => setRequested(true)}
          >
            <Text style={styles.supportButtonText}>
              I Need Some Support
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.sentBox}>
            <Text style={styles.sentHeart}>♡</Text>

            <Text style={styles.sentTitle}>
              Support request sent.
            </Text>

            <Text style={styles.sentText}>
              Someone who cares about you has been
              notified to check in.
            </Text>
          </View>
        )}
      </View>

      {/* Quick support options */}

      <Text style={styles.sectionTitle}>
        What would help right now?
      </Text>

      <View style={styles.option}>
        <Text style={styles.optionNumber}>01</Text>

        <View style={styles.optionContent}>
          <Text style={styles.optionTitle}>
            I need some quiet
          </Text>

          <Text style={styles.optionText}>
            Create a little uninterrupted time for me.
          </Text>
        </View>
      </View>

      <View style={styles.option}>
        <Text style={styles.optionNumber}>02</Text>

        <View style={styles.optionContent}>
          <Text style={styles.optionTitle}>
            I need help with baby
          </Text>

          <Text style={styles.optionText}>
            Ask my partner to take the next baby-care turn.
          </Text>
        </View>
      </View>

      <View style={styles.option}>
        <Text style={styles.optionNumber}>03</Text>

        <View style={styles.optionContent}>
          <Text style={styles.optionTitle}>
            I just need company
          </Text>

          <Text style={styles.optionText}>
            Ask someone I trust to spend some time with me.
          </Text>
        </View>
      </View>

      <View style={styles.note}>
        <Text style={styles.noteText}>
          MamaMind is here to support everyday wellbeing.
          If you feel unsafe or need urgent help, contact
          a trusted person or local emergency service.
        </Text>
      </View>
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
    fontSize: 10,
    letterSpacing: 1.8,
    color: "#A47A7B",
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

  mainCard: {
    backgroundColor: "#FCE8E6",
    borderRadius: 28,
    padding: 25,
    marginTop: 25,
    alignItems: "center",
  },

  heartCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  heart: {
    fontSize: 42,
    color: "#C47D76",
  },

  mainTitle: {
    fontSize: 25,
    fontWeight: "700",
    color: "#2D2A2A",
    marginTop: 15,
  },

  mainText: {
    fontSize: 14,
    lineHeight: 21,
    color: "#6E6268",
    textAlign: "center",
    marginTop: 10,
  },

  supportButton: {
    backgroundColor: "#2D2A2A",
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 25,
    marginTop: 20,
  },

  supportButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  sentBox: {
    width: "100%",
    backgroundColor: "#E9F0E4",
    borderRadius: 20,
    padding: 18,
    alignItems: "center",
    marginTop: 20,
  },

  sentHeart: {
    fontSize: 30,
    color: "#718267",
  },

  sentTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#2D2A2A",
    marginTop: 5,
  },

  sentText: {
    fontSize: 13,
    lineHeight: 19,
    color: "#687064",
    textAlign: "center",
    marginTop: 5,
  },

  sectionTitle: {
    fontSize: 23,
    fontWeight: "700",
    color: "#2D2A2A",
    marginTop: 30,
    marginBottom: 15,
  },

  option: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 12,
    flexDirection: "row",
  },

  optionNumber: {
    fontSize: 12,
    fontWeight: "700",
    color: "#A47A7B",
    width: 32,
  },

  optionContent: {
    flex: 1,
  },

  optionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2D2A2A",
  },

  optionText: {
    fontSize: 13,
    lineHeight: 19,
    color: "#756B70",
    marginTop: 5,
  },

  note: {
    backgroundColor: "#F1ECEA",
    borderRadius: 18,
    padding: 16,
    marginTop: 15,
  },

  noteText: {
    fontSize: 11,
    lineHeight: 17,
    color: "#817578",
    textAlign: "center",
  },
});