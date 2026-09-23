import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router } from "expo-router";

export default function Journal() {
  const [entry, setEntry] = useState("");
  const [entries, setEntries] = useState<string[]>([]);

  const saveEntry = () => {
    if (!entry.trim()) return;

    setEntries((previous) => [entry.trim(), ...previous]);
    setEntry("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
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

        <Text style={styles.label}>YOUR THOUGHTS</Text>

        <Text style={styles.title}>
          A little space{"\n"}to write.
        </Text>

        <Text style={styles.subtitle}>
          There is no right way to journal. Write whatever
          is on your mind, even if it is just one sentence.
        </Text>

        {/* Writing area */}

        <View style={styles.editor}>
          <TextInput
            value={entry}
            onChangeText={setEntry}
            placeholder="Today, I..."
            placeholderTextColor="#B5A9AD"
            multiline
            textAlignVertical="top"
            style={styles.input}
          />

          <Text style={styles.helper}>
            This moment is just for you.
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.saveButton,
            !entry.trim() && styles.disabledButton,
          ]}
          onPress={saveEntry}
          disabled={!entry.trim()}
        >
          <Text style={styles.saveText}>
            Save This Moment
          </Text>
        </TouchableOpacity>

        {/* Saved entries */}

        {entries.length > 0 && (
          <View style={styles.savedSection}>
            <Text style={styles.sectionTitle}>
              Your Moments
            </Text>

            {entries.map((item, index) => (
              <View key={index} style={styles.entryCard}>
                <Text style={styles.entryLabel}>
                  MOMENT {entries.length - index}
                </Text>

                <Text style={styles.entryText}>
                  {item}
                </Text>
              </View>
            ))}
          </View>
        )}

        {entries.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptySymbol}>♡</Text>

            <Text style={styles.emptyTitle}>
              Your moments will live here.
            </Text>

            <Text style={styles.emptyText}>
              Start with something small.
              How was your day? What made you smile?
            </Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
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

  editor: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 20,
    marginTop: 25,
    minHeight: 250,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 2,
  },

  input: {
    minHeight: 190,
    fontSize: 17,
    lineHeight: 27,
    color: "#332E30",
  },

  helper: {
    fontSize: 12,
    color: "#A59A9E",
    marginTop: 10,
  },

  saveButton: {
    backgroundColor: "#2D2A2A",
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 16,
  },

  disabledButton: {
    opacity: 0.35,
  },

  saveText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },

  savedSection: {
    marginTop: 35,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2D2A2A",
    marginBottom: 15,
  },

  entryCard: {
    backgroundColor: "#FCE8E6",
    borderRadius: 22,
    padding: 20,
    marginBottom: 13,
  },

  entryLabel: {
    fontSize: 10,
    letterSpacing: 1.5,
    color: "#9A7779",
    fontWeight: "700",
  },

  entryText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#40383B",
    marginTop: 10,
  },

  emptyState: {
    marginTop: 35,
    backgroundColor: "#E9F0E4",
    borderRadius: 25,
    padding: 25,
    alignItems: "center",
  },

  emptySymbol: {
    fontSize: 45,
    color: "#7F9272",
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2D2A2A",
    textAlign: "center",
    marginTop: 8,
  },

  emptyText: {
    fontSize: 14,
    lineHeight: 21,
    color: "#687064",
    textAlign: "center",
    marginTop: 8,
  },
});