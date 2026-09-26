import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Image,
} from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAudioPlayer } from "expo-audio";

const HISTORY_KEY = "mamamind_meditation_history";

type MeditationSession = {
  id: string;
  date: string;
  duration: number;
};

const encouragements = [
  {
    title: "You made space for yourself. ♡",
    text: "Even a few quiet minutes count. Carry this little moment with you.",
  },
  {
    title: "You showed up for yourself. ✨",
    text: "Taking care of yourself is part of taking care of everyone you love.",
  },
  {
    title: "A little pause can go a long way. 🌸",
    text: "You don't need to do everything at once. One calm moment is enough.",
  },
  {
    title: "You gave yourself some breathing room. ♡",
    text: "Keep this feeling of calm with you as you continue your day.",
  },
  {
    title: "You chose yourself for a few minutes. 🌿",
    text: "That small choice matters more than you think.",
  },
];

const durationOptions = [1, 5, 10, 15];

export default function Meditation() {
  const [selectedDuration, setSelectedDuration] = useState(5);
  const [timeLeft, setTimeLeft] = useState(5 * 60);

  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  const [history, setHistory] = useState<MeditationSession[]>([]);

  const [completionMessage, setCompletionMessage] = useState(
    encouragements[0]
  );

  const breathingAnimation = useRef(new Animated.Value(0)).current;

  // Completion sound
  const beepPlayer = useAudioPlayer(
    require("../../assets/universfield-digital-alarm-clock-151927.mp3")
  );

  /* =====================================================
     LOAD MEDITATION HISTORY
     ===================================================== */

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const savedHistory = await AsyncStorage.getItem(HISTORY_KEY);

      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.log("Could not load meditation history:", error);
    }
  };

  /* =====================================================
     SAVE COMPLETED SESSION
     ===================================================== */

  const saveSession = async (duration: number) => {
    try {
      const newSession: MeditationSession = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        duration,
      };

      const updatedHistory = [newSession, ...history];

      setHistory(updatedHistory);

      await AsyncStorage.setItem(
        HISTORY_KEY,
        JSON.stringify(updatedHistory)
      );
    } catch (error) {
      console.log("Could not save meditation session:", error);
    }
  };

  /* =====================================================
     START BREATHING ANIMATION
     ===================================================== */

  const startBreathingAnimation = () => {
    breathingAnimation.setValue(0);

    Animated.loop(
      Animated.sequence([
        Animated.timing(breathingAnimation, {
          toValue: 1,
          duration: 4000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.timing(breathingAnimation, {
          toValue: 0,
          duration: 4000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  /* =====================================================
     START MEDITATION
     ===================================================== */

  const startMeditation = () => {
    const seconds = selectedDuration * 60;

    setTimeLeft(seconds);
    setCompleted(false);
    setStarted(true);

    startBreathingAnimation();
  };

  /* =====================================================
     FINISH MEDITATION
     ===================================================== */

  const finishMeditation = async () => {
    breathingAnimation.stopAnimation();

    setStarted(false);
    setCompleted(true);

    // Play completion sound
    try {
      beepPlayer.seekTo(0);
      beepPlayer.play();
    } catch (error) {
      console.log("Could not play completion sound:", error);
    }

    // Pick an encouragement
    const randomIndex = Math.floor(
      Math.random() * encouragements.length
    );

    setCompletionMessage(encouragements[randomIndex]);

    // Save session
    await saveSession(selectedDuration);
  };

  /* =====================================================
     TIMER
     ===================================================== */

  useEffect(() => {
    if (!started) return;

    const timer = setInterval(() => {
      setTimeLeft((previousTime) => {
        if (previousTime <= 1) {
          clearInterval(timer);

          // Finish after state update
          setTimeout(() => {
            finishMeditation();
          }, 100);

          return 0;
        }

        return previousTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started]);

  /* =====================================================
     CLEANUP
     ===================================================== */

  useEffect(() => {
    return () => {
      breathingAnimation.stopAnimation();
    };
  }, []);

  /* =====================================================
     FORMAT TIME
     ===================================================== */

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  /* =====================================================
     SELECT DURATION
     ===================================================== */

  const selectDuration = (minutes: number) => {
    if (started) return;

    setSelectedDuration(minutes);
    setTimeLeft(minutes * 60);
  };

  /* =====================================================
     HISTORY DATA
     ===================================================== */

  const totalSessions = history.length;

  const totalMinutes = history.reduce(
    (total, session) => total + session.duration,
    0
  );

  /* =====================================================
     ANIMATION
     ===================================================== */

  const breathingScale = breathingAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.85, 1.15],
  });

  const breathingOpacity = breathingAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.75, 1],
  });

  /* =====================================================
     UI
     ===================================================== */

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* BACK */}

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backText}>
          ← Back
        </Text>
      </TouchableOpacity>

      {/* HEADER */}

      <Text style={styles.label}>
        A LITTLE PAUSE
      </Text>

      <Text style={styles.title}>
        Breathe.{"\n"}
        You are here.
      </Text>

      <Text style={styles.subtitle}>
        You don't need to fix everything right now.
        Just give yourself a few quiet minutes.
      </Text>


      {/* =================================================
          UNIQUE MEDITATION VISUAL
          ================================================= */}

      <View style={styles.visual}>
  <Image
    source={require("../../assets/undraw_meditation_k4oa.png")}
    style={styles.meditationImage}
    resizeMode="contain"
  />
</View>


      {/* =================================================
          DURATION SELECTOR
          ================================================= */}

      {!started && !completed && (
        <View style={styles.durationCard}>

          <Text style={styles.durationLabel}>
            CHOOSE YOUR TIME
          </Text>

          <Text style={styles.durationTitle}>
            How long would you like to pause?
          </Text>

          <View style={styles.durationRow}>

            {durationOptions.map((minutes) => (
              <TouchableOpacity
                key={minutes}
                style={[
                  styles.durationButton,
                  selectedDuration === minutes &&
                    styles.durationButtonActive,
                ]}
                onPress={() => selectDuration(minutes)}
              >
                <Text
                  style={[
                    styles.durationNumber,
                    selectedDuration === minutes &&
                      styles.durationNumberActive,
                  ]}
                >
                  {minutes}
                </Text>

                <Text
                  style={[
                    styles.durationUnit,
                    selectedDuration === minutes &&
                      styles.durationUnitActive,
                  ]}
                >
                  min
                </Text>
              </TouchableOpacity>
            ))}

          </View>

        </View>
      )}


      {/* =================================================
          READY CARD
          ================================================= */}

      {!started && !completed && (
        <View style={styles.card}>

          <Text style={styles.cardLabel}>
            YOUR SESSION
          </Text>

          <Text style={styles.cardTitle}>
            Gentle breathing
          </Text>

          <Text style={styles.cardText}>
            Sit somewhere comfortable. Relax your shoulders
            and follow your breath without trying to change it.
          </Text>

          <View style={styles.selectedTimeBox}>

            <Text style={styles.selectedTime}>
              {selectedDuration}
            </Text>

            <Text style={styles.selectedTimeUnit}>
              minutes
            </Text>

          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={startMeditation}
          >
            <Text style={styles.primaryText}>
              Begin Meditation
            </Text>
          </TouchableOpacity>

        </View>
      )}


      {/* =================================================
          ACTIVE MEDITATION
          ================================================= */}

      {started && (
        <View style={styles.activeCard}>

          <Text style={styles.cardLabel}>
            RIGHT NOW
          </Text>

          <Text style={styles.breatheText}>
            Breathe slowly
          </Text>

          {/* Animated breathing circle */}

          <Animated.View
            style={[
              styles.breathCircleOuter,
              {
                transform: [
                  {
                    scale: breathingScale,
                  },
                ],
                opacity: breathingOpacity,
              },
            ]}
          >
            <View style={styles.breathCircleInner}>

              <Text style={styles.timerText}>
                {formatTime(timeLeft)}
              </Text>

              <Text style={styles.timerLabel}>
                remaining
              </Text>

            </View>
          </Animated.View>


          <Text style={styles.breathInstruction}>
            Breathe in as the circle grows.
            Breathe out as it gently returns.
          </Text>

          <TouchableOpacity
            style={styles.finishButton}
            onPress={finishMeditation}
          >
            <Text style={styles.finishButtonText}>
              Finish Early
            </Text>
          </TouchableOpacity>

        </View>
      )}


      {/* =================================================
          COMPLETION
          ================================================= */}

      {completed && (
        <View style={styles.completedCard}>

          <View style={styles.completedCircle}>
            <Text style={styles.completedHeart}>
              ✓
            </Text>
          </View>

          <Text style={styles.completedLabel}>
            MEDITATION COMPLETE
          </Text>

          <Text style={styles.completedTitle}>
            {completionMessage.title}
          </Text>

          <Text style={styles.completedText}>
            {completionMessage.text}
          </Text>

          <View style={styles.completedTimeBox}>

            <Text style={styles.completedTime}>
              {selectedDuration}
            </Text>

            <Text style={styles.completedTimeLabel}>
              peaceful minutes
            </Text>

          </View>

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


      {/* =================================================
          OTHER OPTIONS
          ================================================= */}

      {!started && !completed && (
        <View style={styles.options}>

          <Text style={styles.optionsTitle}>
            When you need a little more
          </Text>

          <View style={styles.optionRow}>

            <View style={styles.option}>

              <Text style={styles.optionNumber}>
                01
              </Text>

              <Text style={styles.optionTitle}>
                Slow breathing
              </Text>

              <Text style={styles.optionText}>
                Find your rhythm.
              </Text>

            </View>


            <View style={styles.option}>

              <Text style={styles.optionNumber}>
                02
              </Text>

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


      {/* =================================================
          MEDITATION HISTORY
          ================================================= */}

      {!started && (
        <View style={styles.historySection}>

          <Text style={styles.optionsTitle}>
            Your Meditation Journey
          </Text>


          {/* Stats */}

          <View style={styles.statsRow}>

            <View style={styles.statCard}>

              <Text style={styles.statNumber}>
                {totalSessions}
              </Text>

              <Text style={styles.statLabel}>
                Sessions
              </Text>

            </View>


            <View style={styles.statCard}>

              <Text style={styles.statNumber}>
                {totalMinutes}
              </Text>

              <Text style={styles.statLabel}>
                Minutes
              </Text>

            </View>

          </View>


          {/* History */}

          {history.length === 0 ? (

            <View style={styles.emptyHistory}>

              <Text style={styles.emptyHistoryIcon}>
                ♡
              </Text>

              <Text style={styles.emptyHistoryTitle}>
                Your journey starts here.
              </Text>

              <Text style={styles.emptyHistoryText}>
                Complete your first meditation and
                it will appear here.
              </Text>

            </View>

          ) : (

            <View style={styles.historyList}>

              {history.slice(0, 5).map((session) => {

                const sessionDate = new Date(session.date);

                return (
                  <View
                    key={session.id}
                    style={styles.historyItem}
                  >

                    <View style={styles.historyIcon}>
                      <Text style={styles.historyIconText}>
                        ♡
                      </Text>
                    </View>

                    <View style={styles.historyInfo}>

                      <Text style={styles.historyTitle}>
                        {session.duration} minute meditation
                      </Text>

                      <Text style={styles.historyDate}>
                        {sessionDate.toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                          }
                        )}
                      </Text>

                    </View>

                    <Text style={styles.historyCheck}>
                      ✓
                    </Text>

                  </View>
                );

              })}

            </View>

          )}

        </View>
      )}

    </ScrollView>
  );
}


/* =====================================================
   MAMAMIND MEDITATION THEME
   ===================================================== */

const styles = StyleSheet.create({

  /* =========================
     SCREEN
     ========================= */

  container: {
    flex: 1,
    backgroundColor: "#F2F0FA",
  },

  content: {
    padding: 22,
    paddingBottom: 60,
  },


  /* =========================
     BACK
     ========================= */

  backButton: {
    marginTop: 45,
    marginBottom: 28,
  },

  backText: {
    fontSize: 15,
    color: "#5140B5",
    fontWeight: "700",
  },


  /* =========================
     HEADER
     ========================= */

  label: {
    fontSize: 11,
    letterSpacing: 2,
    color: "#5140B5",
    fontWeight: "700",
  },

  title: {
    fontSize: 38,
    lineHeight: 43,
    fontWeight: "700",
    color: "#25213A",
    marginTop: 10,
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 23,
    color: "#77728A",
    marginTop: 14,
  },


  /* =========================
     UNIQUE VISUAL
     ========================= */

  visual: {
    height: 280,
    backgroundColor: "#DDD9F8",
    borderRadius: 32,
    marginTop: 28,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  meditationImage: {
  width: "100%",
  height: "100%",
},

  moonGlow: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#E8E4FA",
    top: 20,
    right: 20,
  },

  moon: {
    position: "absolute",
    width: 95,
    height: 95,
    borderRadius: 48,
    backgroundColor: "#5140B5",
    top: 55,
    right: 65,
  },

  starOne: {
    position: "absolute",
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
    top: 55,
    left: 55,
  },

  starTwo: {
    position: "absolute",
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#FFFFFF",
    top: 105,
    left: 90,
  },

  starThree: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FFFFFF",
    top: 75,
    right: 40,
  },

  meditationPerson: {
    width: 160,
    height: 170,
    alignItems: "center",
    position: "relative",
    zIndex: 2,
  },

  head: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#D89578",
    marginTop: 12,
  },

  body: {
    width: 78,
    height: 88,
    borderTopLeftRadius: 42,
    borderTopRightRadius: 42,
    backgroundColor: "#5140B5",
    marginTop: 8,
  },

  leftLeg: {
    position: "absolute",
    width: 75,
    height: 18,
    borderRadius: 15,
    backgroundColor: "#5140B5",
    bottom: 5,
    left: 5,
    transform: [{ rotate: "12deg" }],
  },

  rightLeg: {
    position: "absolute",
    width: 75,
    height: 18,
    borderRadius: 15,
    backgroundColor: "#5140B5",
    bottom: 5,
    right: 5,
    transform: [{ rotate: "-12deg" }],
  },

  leftArm: {
    position: "absolute",
    width: 55,
    height: 14,
    borderRadius: 10,
    backgroundColor: "#5140B5",
    left: 5,
    top: 92,
    transform: [{ rotate: "25deg" }],
  },

  rightArm: {
    position: "absolute",
    width: 55,
    height: 14,
    borderRadius: 10,
    backgroundColor: "#5140B5",
    right: 5,
    top: 92,
    transform: [{ rotate: "-25deg" }],
  },

  ground: {
    position: "absolute",
    width: "75%",
    height: 16,
    borderRadius: 20,
    backgroundColor: "#C7C0E1",
    bottom: 25,
  },


  /* =========================
     DURATION
     ========================= */

  durationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    padding: 20,
    marginTop: 20,

    borderWidth: 1,
    borderColor: "#E5E1F0",
  },

  durationLabel: {
    fontSize: 11,
    letterSpacing: 2,
    color: "#5140B5",
    fontWeight: "700",
  },

  durationTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#25213A",
    marginTop: 7,
  },

  durationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 17,
  },

  durationButton: {
    width: "23%",
    backgroundColor: "#F2F0FA",
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E1F0",
  },

  durationButtonActive: {
    backgroundColor: "#5140B5",
    borderColor: "#5140B5",
  },

  durationNumber: {
    fontSize: 19,
    fontWeight: "700",
    color: "#5140B5",
  },

  durationNumberActive: {
    color: "#FFFFFF",
  },

  durationUnit: {
    fontSize: 11,
    color: "#77728A",
    marginTop: 2,
  },

  durationUnitActive: {
    color: "#E8E4FA",
  },


  /* =========================
     READY CARD
     ========================= */

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 24,
    marginTop: 20,

    borderWidth: 1,
    borderColor: "#E5E1F0",

    shadowColor: "#5140B5",
    shadowOpacity: 0.05,
    shadowRadius: 10,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 2,
  },

  cardLabel: {
    fontSize: 11,
    letterSpacing: 2,
    color: "#5140B5",
    fontWeight: "700",
  },

  cardTitle: {
    fontSize: 25,
    fontWeight: "700",
    color: "#25213A",
    marginTop: 8,
  },

  cardText: {
    fontSize: 15,
    lineHeight: 23,
    color: "#77728A",
    marginTop: 12,
  },

  selectedTimeBox: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    marginTop: 18,
  },

  selectedTime: {
    fontSize: 38,
    fontWeight: "700",
    color: "#5140B5",
  },

  selectedTimeUnit: {
    fontSize: 15,
    color: "#77728A",
    marginLeft: 7,
  },


  /* =========================
     BUTTON
     ========================= */

  primaryButton: {
    backgroundColor: "#5140B5",
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 25,
    alignItems: "center",
    marginTop: 22,

    shadowColor: "#5140B5",
    shadowOpacity: 0.18,
    shadowRadius: 7,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 3,
  },

  primaryText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },


  /* =========================
     ACTIVE MEDITATION
     ========================= */

  activeCard: {
    backgroundColor: "#E8E4FA",
    borderRadius: 28,
    padding: 25,
    marginTop: 20,
    alignItems: "center",
  },

  breatheText: {
    textAlign: "center",
    fontSize: 23,
    fontWeight: "700",
    color: "#25213A",
    marginTop: 20,
  },

  breathCircleOuter: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "#D1CBEF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
  },

  breathCircleInner: {
    width: 175,
    height: 175,
    borderRadius: 88,
    backgroundColor: "#5140B5",
    alignItems: "center",
    justifyContent: "center",
  },

  timerText: {
    fontSize: 40,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  timerLabel: {
    fontSize: 12,
    color: "#E8E4FA",
    marginTop: 3,
  },

  breathInstruction: {
    fontSize: 14,
    lineHeight: 21,
    color: "#625D78",
    textAlign: "center",
    marginTop: 22,
  },

  finishButton: {
    borderWidth: 1.5,
    borderColor: "#5140B5",
    borderRadius: 26,
    paddingHorizontal: 25,
    paddingVertical: 12,
    marginTop: 20,
  },

  finishButtonText: {
    color: "#5140B5",
    fontSize: 14,
    fontWeight: "700",
  },


  /* =========================
     COMPLETED
     ========================= */

  completedCard: {
    backgroundColor: "#DDD9F8",
    borderRadius: 28,
    padding: 25,
    marginTop: 20,
    alignItems: "center",
  },

  completedCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#5140B5",
    alignItems: "center",
    justifyContent: "center",
  },

  completedHeart: {
    fontSize: 35,
    color: "#FFFFFF",
    fontWeight: "700",
  },

  completedLabel: {
    fontSize: 10,
    letterSpacing: 2,
    color: "#5140B5",
    fontWeight: "700",
    marginTop: 18,
  },

  completedTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#25213A",
    textAlign: "center",
    marginTop: 10,
  },

  completedText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#625D78",
    textAlign: "center",
    marginTop: 10,
  },

  completedTimeBox: {
    backgroundColor: "#F2F0FA",
    borderRadius: 18,
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 18,
  },

  completedTime: {
    fontSize: 25,
    fontWeight: "700",
    color: "#5140B5",
  },

  completedTimeLabel: {
    fontSize: 12,
    color: "#77728A",
    marginTop: 2,
  },


  /* =========================
     OPTIONS
     ========================= */

  options: {
    marginTop: 30,
  },

  optionsTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#25213A",
    marginBottom: 15,
  },

  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  option: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 17,

    borderWidth: 1,
    borderColor: "#E5E1F0",
  },

  optionNumber: {
    fontSize: 12,
    color: "#5140B5",
    fontWeight: "700",
  },

  optionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#25213A",
    marginTop: 8,
  },

  optionText: {
    fontSize: 13,
    color: "#77728A",
    marginTop: 5,
  },


  /* =========================
     HISTORY
     ========================= */

  historySection: {
    marginTop: 32,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  statCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,

    borderWidth: 1,
    borderColor: "#E5E1F0",
  },

  statNumber: {
    fontSize: 28,
    fontWeight: "700",
    color: "#5140B5",
  },

  statLabel: {
    fontSize: 13,
    color: "#77728A",
    marginTop: 3,
  },

  emptyHistory: {
    backgroundColor: "#E8E4FA",
    borderRadius: 22,
    padding: 24,
    alignItems: "center",
    marginTop: 15,
  },

  emptyHistoryIcon: {
    fontSize: 35,
    color: "#5140B5",
  },

  emptyHistoryTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#25213A",
    marginTop: 8,
  },

  emptyHistoryText: {
    fontSize: 13,
    lineHeight: 19,
    color: "#625D78",
    textAlign: "center",
    marginTop: 6,
  },

  historyList: {
    marginTop: 15,
  },

  historyItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 15,
    marginBottom: 10,

    flexDirection: "row",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#E5E1F0",
  },

  historyIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#E8E4FA",
    alignItems: "center",
    justifyContent: "center",
  },

  historyIconText: {
    fontSize: 22,
    color: "#5140B5",
  },

  historyInfo: {
    flex: 1,
    marginLeft: 12,
  },

  historyTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#25213A",
  },

  historyDate: {
    fontSize: 12,
    color: "#77728A",
    marginTop: 4,
  },

  historyCheck: {
    fontSize: 18,
    fontWeight: "700",
    color: "#5140B5",
  },
});