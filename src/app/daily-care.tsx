import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function DailyCare() {

  const [tasks, setTasks] = useState([
    { id: 1, text: "Drink some water", done: true },
    { id: 2, text: "Take a few deep breaths", done: true },
    { id: 3, text: "Eat something nourishing", done: false },
    { id: 4, text: "Stretch your body", done: false },
    { id: 5, text: "Step outside for fresh air", done: false },
    { id: 6, text: "Listen to music", done: false },
    { id: 7, text: "Take a short rest", done: false },
    { id: 8, text: "Write one thought", done: false },
    { id: 9, text: "Spend a calm moment with baby", done: false },
    { id: 10, text: "Do one thing for yourself", done: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      )
    );
  };

  const completed = tasks.filter(t => t.done).length;

  const getMessage = () => {
    if (completed === 0)
      return "No pressure. Start with one little thing. ♡";

    if (completed <= 2)
      return "Small steps count. 🌿";

    if (completed <= 5)
      return "You're making space for yourself. ✨";

    if (completed <= 8)
      return "Beautiful progress today. 🌸";

    return "You cared for yourself in many little ways. ♡";
  };

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        Your Little Things
      </Text>

      <Text style={styles.subtitle}>
        Small things are still worth celebrating.
      </Text>

      {/* Progress */}

      <View style={styles.progressCard}>

        <Text style={styles.progressText}>
          {completed} / 10 completed
        </Text>

        <View style={styles.barBackground}>
          <View
            style={[
              styles.barFill,
              { width: `${completed * 10}%` }
            ]}
          />
        </View>

        <Text style={styles.message}>
          {getMessage()}
        </Text>

      </View>

      {/* Tasks */}

      {tasks.map((task) => (

        <TouchableOpacity
          key={task.id}
          style={styles.taskCard}
          onPress={() => toggleTask(task.id)}
        >

          <View style={[
            styles.checkbox,
            task.done && styles.checked
          ]}>
            {task.done && (
              <Text style={styles.tick}>✓</Text>
            )}
          </View>

          <Text style={[
            styles.taskText,
            task.done && styles.doneText
          ]}>
            {task.text}
          </Text>

        </TouchableOpacity>

      ))}

      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editText}>
          Edit Goals
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#FFF8F6",
    padding: 22,
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#2D2A2A",
    marginTop: 50,
  },

  subtitle: {
    color: "#7A6E74",
    marginTop: 10,
    marginBottom: 25,
    fontSize: 15,
  },

  progressCard: {
    backgroundColor: "#E9F0E4",
    padding: 22,
    borderRadius: 24,
    marginBottom: 25,
  },

  progressText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2D2A2A",
  },

  barBackground: {
    height: 10,
    backgroundColor: "#D5DFCD",
    borderRadius: 20,
    marginTop: 15,
    overflow: "hidden",
  },

  barFill: {
    height: "100%",
    backgroundColor: "#7F9272",
  },

  message: {
    marginTop: 15,
    color: "#55604D",
    lineHeight: 22,
  },

  taskCard: {
    backgroundColor: "white",
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#7F9272",
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  checked: {
    backgroundColor: "#7F9272",
  },

  tick: {
    color: "white",
    fontWeight: "700",
  },

  taskText: {
    fontSize: 16,
    color: "#2D2A2A",
    flex: 1,
  },

  doneText: {
    textDecorationLine: "line-through",
    color: "#999",
  },

  editButton: {
    marginTop: 20,
    backgroundColor: "#2D2A2A",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 50,
  },

  editText: {
    color: "white",
    fontWeight: "600",
  },
});