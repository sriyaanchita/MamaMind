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

export default function Community() {
  const [post, setPost] = useState("");

  const [posts, setPosts] = useState([
    {
      name: "Ananya",
      text: "Today I finally got a little time for myself. It felt really good. ♡",
    },
    {
      name: "Meera",
      text: "Does anyone have a simple bedtime routine that works for their little one?",
    },
    {
      name: "Priya",
      text: "A reminder for every mama: you are doing enough. 🌿",
    },
  ]);

  const addPost = () => {
    if (!post.trim()) return;

    setPosts([
      {
        name: "You",
        text: post.trim(),
      },
      ...posts,
    ]);

    setPost("");
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

      <Text style={styles.label}>MOTHER TO MOTHER</Text>

      <Text style={styles.title}>
        Your Village
      </Text>

      <Text style={styles.subtitle}>
        A gentle space to share, listen and remind each
        other that none of us has to do this alone.
      </Text>

      {/* Create post */}

      <View style={styles.createCard}>
        <Text style={styles.createTitle}>
          Share something with the village
        </Text>

        <TextInput
          value={post}
          onChangeText={setPost}
          placeholder="Write a thought, question or little win..."
          placeholderTextColor="#A99DA1"
          multiline
          style={styles.input}
        />

        <TouchableOpacity
          style={[
            styles.postButton,
            !post.trim() && styles.disabled,
          ]}
          onPress={addPost}
          disabled={!post.trim()}
        >
          <Text style={styles.postButtonText}>
            Share
          </Text>
        </TouchableOpacity>
      </View>

      {/* Community posts */}

      <Text style={styles.sectionTitle}>
        From the community
      </Text>

      {posts.map((item, index) => (
        <View key={index} style={styles.postCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {item.name.charAt(0)}
            </Text>
          </View>

          <View style={styles.postContent}>
            <Text style={styles.name}>
              {item.name}
            </Text>

            <Text style={styles.postText}>
              {item.text}
            </Text>

            <View style={styles.reactionRow}>
              <Text style={styles.reaction}>
                ♡ Support
              </Text>

              <Text style={styles.reaction}>
                Reply
              </Text>
            </View>
          </View>
        </View>
      ))}

      <View style={styles.bottomMessage}>
        <Text style={styles.bottomHeart}>♡</Text>

        <Text style={styles.bottomTitle}>
          There is room for every story here.
        </Text>

        <Text style={styles.bottomText}>
          Share only what feels comfortable.
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
    fontSize: 11,
    letterSpacing: 2,
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
    marginBottom: 24,
  },

  createCard: {
    backgroundColor: "#FCE8E6",
    borderRadius: 25,
    padding: 20,
  },

  createTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#2D2A2A",
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    minHeight: 100,
    padding: 15,
    marginTop: 14,
    fontSize: 15,
    color: "#40383B",
    textAlignVertical: "top",
  },

  postButton: {
    backgroundColor: "#2D2A2A",
    borderRadius: 28,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 14,
  },

  disabled: {
    opacity: 0.35,
  },

  postButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  sectionTitle: {
    fontSize: 23,
    fontWeight: "700",
    color: "#2D2A2A",
    marginTop: 30,
    marginBottom: 15,
  },

  postCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 18,
    marginBottom: 13,
    flexDirection: "row",
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#E9F0E4",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#65745B",
  },

  postContent: {
    flex: 1,
    marginLeft: 13,
  },

  name: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2D2A2A",
  },

  postText: {
    fontSize: 14,
    lineHeight: 21,
    color: "#665D61",
    marginTop: 7,
  },

  reactionRow: {
    flexDirection: "row",
    gap: 20,
    marginTop: 13,
  },

  reaction: {
    fontSize: 12,
    color: "#8D7C81",
    fontWeight: "600",
  },

  bottomMessage: {
    backgroundColor: "#E9F0E4",
    borderRadius: 24,
    padding: 25,
    alignItems: "center",
    marginTop: 20,
  },

  bottomHeart: {
    fontSize: 38,
    color: "#7F9272",
  },

  bottomTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#2D2A2A",
    textAlign: "center",
    marginTop: 7,
  },

  bottomText: {
    fontSize: 13,
    color: "#687064",
    marginTop: 6,
  },
});