import { router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// SVGs
import JournalIllustration from "../../assets/Notebook-bro.svg";
import BabyIllustration from "../../assets/undraw_baby_uoep.svg";
import MeditationIllustration from "../../assets/undraw_meditation_k4oa.svg";
import CommunityIllustration from "../../assets/Women talking-pana.svg";

const MotherDashboard = () => {
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

      {/* ================= HEADER ================= */}

      <View style={styles.header}>
        <Text style={styles.greeting}>
          GOOD MORNING, MAMA
        </Text>

        <Text style={styles.heading}>
          This little{"\n"}space is yours.
        </Text>

        <Text style={styles.subtitle}>
          Take a deep breath, slow down and care for yourself.
        </Text>
      </View>


      {/* ================= HERO ================= */}

      <View style={styles.heroCard}>

        <BabyIllustration
          width="100%"
          height={220}
        />

        <View style={styles.heroContent}>

          <Text style={styles.heroLabel}>
            YOUR SPACE
          </Text>

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
              Take 5 Minutes →
            </Text>
          </TouchableOpacity>

        </View>
      </View>


      {/* ================= TODAY'S CARE ================= */}

      <Text style={styles.sectionTitle}>
        Today's Care
      </Text>

      <TouchableOpacity
        style={styles.dailyCard}
        onPress={() => router.push("/daily-care")}
      >

        <View style={styles.dailyTop}>

          <View>

            <Text style={styles.dailyLabel}>
              LITTLE THINGS
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


        {/* Progress */}

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


      {/* ================= FOR YOU ================= */}

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


      {/* ================= COMMUNITY ================= */}

      <Text style={styles.sectionTitle}>
        Mother Community
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
            Visit Community →
          </Text>

        </TouchableOpacity>

      </View>


      {/* ================= BABY ================= */}

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
            Open Baby Space →
          </Text>

        </TouchableOpacity>

      </View>

    </ScrollView>
  );
};

export default MotherDashboard;


/* =====================================================
   MAMAMIND THEME
   =====================================================

   Primary Purple  : #5140B5
   Dark Purple     : #2F2858
   Background      : #F2F0FA
   Lavender        : #E8E4FA
   Soft Purple     : #DDD9F8
   Peach           : #FCE8D0
   White           : #FFFFFF
   Dark Text       : #25213A
   Secondary Text  : #77728A

   ===================================================== */

const styles = StyleSheet.create({

  /* =========================
     SCREEN
     ========================= */

  container: {
    flex: 1,
    backgroundColor: "#F2F0FA",
    paddingHorizontal: 20,
  },


  /* =========================
     HEADER
     ========================= */

  header: {
    marginTop: 60,
    marginBottom: 26,
  },

  greeting: {
    fontSize: 11,
    letterSpacing: 2,
    color: "#5140B5",
    fontWeight: "700",
    marginBottom: 12,
  },

  heading: {
    fontSize: 34,
    lineHeight: 40,
    color: "#25213A",
    fontWeight: "700",
  },

  subtitle: {
    marginTop: 10,
    fontSize: 15,
    color: "#77728A",
    lineHeight: 22,
  },


  /* =========================
     HERO
     ========================= */

  heroCard: {
    backgroundColor: "#DDD9F8",
    borderRadius: 28,
    overflow: "hidden",
    marginBottom: 30,

    shadowColor: "#5140B5",
    shadowOpacity: 0.10,
    shadowRadius: 14,

    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 4,
  },

  heroContent: {
    padding: 22,
    paddingTop: 18,
  },

  heroLabel: {
    fontSize: 11,
    letterSpacing: 2,
    color: "#5140B5",
    fontWeight: "700",
  },

  heroTitle: {
    fontSize: 27,
    marginTop: 8,
    color: "#25213A",
    fontWeight: "700",
  },

  heroDescription: {
    marginTop: 9,
    fontSize: 15,
    color: "#625D78",
    lineHeight: 22,
  },


  /* =========================
     PRIMARY BUTTON
     ========================= */

  primaryButton: {
    backgroundColor: "#5140B5",
    alignSelf: "flex-start",

    paddingHorizontal: 22,
    paddingVertical: 13,

    borderRadius: 25,
    marginTop: 20,

    shadowColor: "#5140B5",
    shadowOpacity: 0.18,
    shadowRadius: 7,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 3,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },


  /* =========================
     SECTION TITLES
     ========================= */

  sectionTitle: {
    fontSize: 23,
    fontWeight: "700",
    color: "#25213A",

    marginBottom: 14,
    marginTop: 8,
  },


  /* =========================
     TODAY'S CARE
     ========================= */

  dailyCard: {
    backgroundColor: "#E8E4FA",

    borderRadius: 26,
    padding: 21,
    marginBottom: 28,

    borderWidth: 1,
    borderColor: "#D8D2F0",

    shadowColor: "#5140B5",
    shadowOpacity: 0.07,
    shadowRadius: 10,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 2,
  },

  dailyTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dailyLabel: {
    fontSize: 11,
    letterSpacing: 2,
    color: "#5140B5",
    fontWeight: "700",
  },

  dailyTitle: {
    fontSize: 36,
    fontWeight: "700",
    color: "#25213A",
    marginTop: 5,
  },

  dailySubtitle: {
    fontSize: 14,
    color: "#77728A",
  },

  heart: {
    fontSize: 48,
    color: "#5140B5",
  },


  /* =========================
     PROGRESS
     ========================= */

  progressBackground: {
    height: 9,

    backgroundColor: "#D1CCE9",

    borderRadius: 10,
    overflow: "hidden",

    marginTop: 20,
  },

  progressFill: {
    height: "100%",

    backgroundColor: "#5140B5",

    borderRadius: 10,
  },

  encouragement: {
    fontSize: 15,
    lineHeight: 21,

    color: "#625D78",

    marginTop: 15,
  },

  viewGoalsButton: {
    marginTop: 17,
    alignSelf: "flex-start",
  },

  viewGoalsText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#5140B5",
  },


  /* =========================
     SELF CARE
     ========================= */

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  selfCareCard: {
    width: "48%",

    backgroundColor: "#FFFFFF",

    borderRadius: 23,
    padding: 15,

    borderWidth: 1,
    borderColor: "#E5E1F0",

    shadowColor: "#5140B5",
    shadowOpacity: 0.05,
    shadowRadius: 9,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 2,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#25213A",
    marginTop: 10,
  },

  cardSubtitle: {
    marginTop: 7,
    fontSize: 13,
    lineHeight: 18,
    color: "#77728A",
  },


  /* =========================
     HAPPY JAR
     ========================= */

  jarIllustration: {
    height: 110,

    borderRadius: 17,

    backgroundColor: "#FCE8D0",

    alignItems: "center",
    justifyContent: "center",
  },

  jarEmoji: {
    fontSize: 60,
    color: "#D58E55",
  },


  /* =========================
     SUPPORT
     ========================= */

  supportIllustration: {
    height: 110,

    borderRadius: 17,

    backgroundColor: "#E8E4FA",

    alignItems: "center",
    justifyContent: "center",
  },

  supportSymbol: {
    fontSize: 60,
    color: "#5140B5",
  },


  /* =========================
     COMMUNITY
     ========================= */

  communityCard: {
    backgroundColor: "#E8E4FA",

    borderRadius: 27,

    padding: 20,

    marginBottom: 28,

    shadowColor: "#5140B5",
    shadowOpacity: 0.07,
    shadowRadius: 11,

    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 3,
  },

  communityTitle: {
    fontSize: 23,
    fontWeight: "700",
    color: "#25213A",
    marginTop: 14,
  },

  communitySubtitle: {
    fontSize: 15,
    color: "#625D78",
    marginTop: 10,
    lineHeight: 22,
  },


  /* =========================
     BABY SPACE
     ========================= */

  babyCard: {
    backgroundColor: "#FFFFFF",

    borderRadius: 27,

    padding: 20,

    marginBottom: 50,

    borderWidth: 1,
    borderColor: "#E5E1F0",

    shadowColor: "#5140B5",
    shadowOpacity: 0.06,
    shadowRadius: 11,

    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 3,
  },


  /* =========================
     OUTLINE BUTTON
     ========================= */

  outlineButton: {
    borderWidth: 1.5,
    borderColor: "#5140B5",

    borderRadius: 26,

    alignSelf: "flex-start",

    paddingHorizontal: 22,
    paddingVertical: 12,

    marginTop: 18,
  },

  outlineButtonText: {
    color: "#5140B5",
    fontSize: 14,
    fontWeight: "700",
  },
});