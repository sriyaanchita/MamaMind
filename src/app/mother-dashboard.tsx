import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";

// SVGs
import BabyIllustration from "../../assets/undraw_baby_uoep.svg";
import MeditationIllustration from "../../assets/undraw_meditation_k4oa.svg";
import JournalIllustration from "../../assets/Notebook-bro.svg";
import CommunityIllustration from "../../assets/Women talking-pana.svg";

const MotherDashboard = () => {
  // Default 10 daily goals
  const [completedGoals, setCompletedGoals] = useState(2);

  const getEncouragement = () => {
    if (completedGoals === 0) {
      return "No pressure. You can start with just one little thing. ♡";
    }

    if (completedGoals <= 2) {
      return "Small steps count. You showed up for yourself today. ♡";
    }

    if (completedGoals <= 4) {
      return "You're making space for yourself. Keep going gently. 🌿";
    }

    if (completedGoals <= 6) {
      return "Look at you taking care of yourself too. ✨";
    }

    if (completedGoals <= 8) {
      return "You're doing beautifully. Your little efforts matter. ♡";
    }

    if (completedGoals < 10) {
      return "Almost there! Every little moment counts. 🌸";
    }

    return "You cared for yourself in so many little ways today. ✨";
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}

      <View style={styles.header}>
        <Text style={styles.greeting}>GOOD MORNING, MAMA</Text>

        <Text style={styles.heading}>
          This little{"\n"}space is yours.
        </Text>

        <Text style={styles.subtitle}>
          Take a deep breath, slow down and care for yourself.
        </Text>
      </View>

      {/* HERO */}

      <View style={styles.heroCard}>
        <BabyIllustration width="100%" height={220} />

        <View style={styles.heroContent}>
          <Text style={styles.heroLabel}>YOUR SPACE</Text>

          <Text style={styles.heroTitle}>
            Take a little pause.
          </Text>

          <Text style={styles.heroDescription}>
            You spend so much time caring for everyone.
            This moment belongs to you.
          </Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push("/meditation")}
          >
            <Text style={styles.primaryButtonText}>
              Take a Moment
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* DAILY CARE */}

      <Text style={styles.sectionTitle}>
        Your Little Things
      </Text>

      <TouchableOpacity
        style={styles.dailyCard}
        onPress={() => router.push("/daily-care")}
      >
        <View style={styles.dailyTop}>
          <View>
            <Text style={styles.dailyLabel}>
              TODAY'S CARE
            </Text>

            <Text style={styles.dailyTitle}>
              {completedGoals} / 10
            </Text>

            <Text style={styles.dailySubtitle}>
              little things completed
            </Text>
          </View>

          <Text style={styles.heart}>
            ♡
          </Text>
        </View>

        {/* Progress bar */}

        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${completedGoals * 10}%`,
              },
            ]}
          />
        </View>

        <Text style={styles.encouragement}>
          {getEncouragement()}
        </Text>

        <View style={styles.viewGoalsButton}>
          <Text style={styles.viewGoalsText}>
            View Today's Care →
          </Text>
        </View>
      </TouchableOpacity>

      {/* SELF CARE */}

      <Text style={styles.sectionTitle}>
        For You
      </Text>

      <View style={styles.row}>

        {/* Meditation */}

        <TouchableOpacity
          style={styles.selfCareCard}
          onPress={() => router.push("/meditation")}
        >
          <MeditationIllustration
            width="100%"
            height={110}
          />

          <Text style={styles.cardTitle}>
            Meditation
          </Text>

          <Text style={styles.cardSubtitle}>
            Find calm in five minutes.
          </Text>
        </TouchableOpacity>

        {/* Journal */}

        <TouchableOpacity
          style={styles.selfCareCard}
          onPress={() => router.push("/journal")}
        >
          <JournalIllustration
            width="100%"
            height={110}
          />

          <Text style={styles.cardTitle}>
            Journal
          </Text>

          <Text style={styles.cardSubtitle}>
            Write your thoughts freely.
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>

        {/* Happy Jar */}

        <TouchableOpacity
          style={styles.selfCareCard}
          onPress={() => router.push("/happy-jar")}
        >
          <View style={styles.jarIllustration}>
            <Text style={styles.jarEmoji}>
              ♡
            </Text>
          </View>

          <Text style={styles.cardTitle}>
            Happy Jar
          </Text>

          <Text style={styles.cardSubtitle}>
            Save a little happy moment.
          </Text>
        </TouchableOpacity>

        {/* Support */}

        <TouchableOpacity
          style={styles.selfCareCard}
          onPress={() => router.push("/support")}
        >
          <View style={styles.supportIllustration}>
            <Text style={styles.supportSymbol}>
              ♡
            </Text>
          </View>

          <Text style={styles.cardTitle}>
            Support
          </Text>

          <Text style={styles.cardSubtitle}>
            You don't have to handle it alone.
          </Text>
        </TouchableOpacity>
      </View>

      {/* COMMUNITY */}

      <Text style={styles.sectionTitle}>
        Your Village
      </Text>

      <View style={styles.communityCard}>
        <CommunityIllustration
          width="100%"
          height={180}
        />

        <Text style={styles.communityTitle}>
          You don't have to do it alone.
        </Text>

        <Text style={styles.communitySubtitle}>
          Share stories, ask questions and connect
          with mothers walking the same journey.
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push("/community")}
        >
          <Text style={styles.primaryButtonText}>
            Visit Community
          </Text>
        </TouchableOpacity>
      </View>

      {/* BABY */}

      <Text style={styles.sectionTitle}>
        Baby Space
      </Text>

      <View style={styles.babyCard}>
        <BabyIllustration
          width="100%"
          height={170}
        />

        <Text style={styles.communityTitle}>
          Little moments, big memories.
        </Text>

        <Text style={styles.communitySubtitle}>
          Feeding • Sleep • Milestones • Memories
        </Text>

        <TouchableOpacity
          style={styles.outlineButton}
          onPress={() => router.push("/baby-dashboard")}
        >
          <Text style={styles.outlineButtonText}>
            Open Baby Space
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default MotherDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8F6",
    paddingHorizontal: 22,
  },

  header: {
    marginTop: 60,
    marginBottom: 24,
  },

  greeting: {
    fontSize: 12,
    letterSpacing: 2,
    color: "#8D7C81",
    fontWeight: "700",
    marginBottom: 12,
  },

  heading: {
    fontSize: 34,
    lineHeight: 40,
    color: "#2D2A2A",
    fontWeight: "700",
  },

  subtitle: {
    marginTop: 10,
    fontSize: 15,
    color: "#7A6E74",
    lineHeight: 22,
  },

  heroCard: {
    backgroundColor: "#FCE8E6",
    borderRadius: 30,
    overflow: "hidden",
    marginBottom: 28,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 6,
  },

  heroContent: {
    padding: 24,
  },

  heroLabel: {
    fontSize: 11,
    letterSpacing: 2,
    color: "#86696D",
    fontWeight: "700",
  },

  heroTitle: {
    fontSize: 28,
    marginTop: 8,
    color: "#2D2A2A",
    fontWeight: "700",
  },

  heroDescription: {
    marginTop: 10,
    fontSize: 15,
    color: "#6E6268",
    lineHeight: 22,
  },

  primaryButton: {
    backgroundColor: "#2D2A2A",
    alignSelf: "flex-start",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 20,
  },

  primaryButtonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 14,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2D2A2A",
    marginBottom: 14,
    marginTop: 10,
  },

  /* DAILY CARE */

  dailyCard: {
    backgroundColor: "#E9F0E4",
    borderRadius: 28,
    padding: 22,
    marginBottom: 28,
  },

  dailyTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dailyLabel: {
    fontSize: 11,
    letterSpacing: 2,
    color: "#69745F",
    fontWeight: "700",
  },

  dailyTitle: {
    fontSize: 36,
    fontWeight: "700",
    color: "#2D2A2A",
    marginTop: 5,
  },

  dailySubtitle: {
    fontSize: 14,
    color: "#687064",
  },

  heart: {
    fontSize: 48,
    color: "#7F9272",
  },

  progressBackground: {
    height: 9,
    backgroundColor: "#D5DFCD",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 20,
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#829571",
    borderRadius: 10,
  },

  encouragement: {
    fontSize: 15,
    lineHeight: 21,
    color: "#53604D",
    marginTop: 15,
  },

  viewGoalsButton: {
    marginTop: 17,
    alignSelf: "flex-start",
  },

  viewGoalsText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#46533F",
  },

  /* SELF CARE */

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  selfCareCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 16,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 3,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D2A2A",
    marginTop: 10,
  },

  cardSubtitle: {
    marginTop: 7,
    fontSize: 13,
    lineHeight: 18,
    color: "#777",
  },

  jarIllustration: {
    height: 110,
    borderRadius: 18,
    backgroundColor: "#FFF0D8",
    alignItems: "center",
    justifyContent: "center",
  },

  jarEmoji: {
    fontSize: 60,
    color: "#D69A6A",
  },

  supportIllustration: {
    height: 110,
    borderRadius: 18,
    backgroundColor: "#F8D2CD",
    alignItems: "center",
    justifyContent: "center",
  },

  supportSymbol: {
    fontSize: 60,
    color: "#C47D76",
  },

  /* COMMUNITY */

  communityCard: {
    backgroundColor: "#FFE9EF",
    borderRadius: 28,
    padding: 20,
    marginBottom: 28,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 3,
  },

  communityTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2D2A2A",
    marginTop: 14,
  },

  communitySubtitle: {
    fontSize: 15,
    color: "#6E6268",
    marginTop: 10,
    lineHeight: 22,
  },

  /* BABY */

  babyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 20,
    marginBottom: 50,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 3,
  },

  outlineButton: {
    borderWidth: 1.5,
    borderColor: "#2D2A2A",
    borderRadius: 28,
    alignSelf: "flex-start",
    paddingHorizontal: 22,
    paddingVertical: 12,
    marginTop: 18,
  },

  outlineButtonText: {
    color: "#2D2A2A",
    fontSize: 14,
    fontWeight: "600",
  },
});